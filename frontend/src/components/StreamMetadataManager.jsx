import { useState } from 'react';
import api from '../utils/api';

const StreamMetadataManager = ({ videoId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    videoId: '',
    adaptiveStreamQualities: []
  });

  const qualityOptions = ['480p', '720p', '1080p'];

  const handleQualityToggle = (quality) => {
    setFormData(prev => {
      const qualities = prev.adaptiveStreamQualities.includes(quality)
        ? prev.adaptiveStreamQualities.filter(q => q !== quality)
        : [...prev.adaptiveStreamQualities, quality];
      return {
        ...prev,
        adaptiveStreamQualities: qualities.sort((a, b) => {
          const aRes = parseInt(a);
          const bRes = parseInt(b);
          return aRes - bRes;
        })
      };
    });
  };

  const handleVideoIdChange = (e) => {
    setFormData(prev => ({
      ...prev,
      videoId: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.videoId.trim()) {
      setError('Video ID is required');
      return;
    }

    if (formData.adaptiveStreamQualities.length === 0) {
      setError('Select at least one quality');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await api.put(`/videos/${videoId}/stream-metadata`, {
        videoId: formData.videoId,
        adaptiveStreamQualities: formData.adaptiveStreamQualities
      });

      if (response.data.success) {
        onSuccess && onSuccess(response.data.data.video);
        onClose && onClose();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update stream metadata');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>Manage Adaptive Streaming</h2>
          <button 
            onClick={onClose}
            style={styles.closeBtn}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>
              Video ID (folder name in uploads/)
            </label>
            <input
              type="text"
              value={formData.videoId}
              onChange={handleVideoIdChange}
              placeholder="e.g., video-1769669832942-362983524"
              style={styles.input}
            />
            <p style={styles.hint}>
              This should match the folder name in your uploads directory
            </p>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Available Quality Versions</label>
            <div style={styles.checkboxGroup}>
              {qualityOptions.map(quality => (
                <label key={quality} style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.adaptiveStreamQualities.includes(quality)}
                    onChange={() => handleQualityToggle(quality)}
                    style={styles.checkbox}
                  />
                  <span style={styles.qualityBadge}>
                    {quality}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div style={styles.urlPreview}>
            <h3>Stream URLs</h3>
            {formData.videoId && (
              <div style={styles.urlList}>
                <div style={styles.urlItem}>
                  <strong>Master Playlist:</strong>
                  <code>/uploads/{formData.videoId}/master.m3u8</code>
                </div>
                {formData.adaptiveStreamQualities.length > 0 && (
                  <>
                    <div style={styles.urlItem}>
                      <strong>Quality Playlists:</strong>
                      {formData.adaptiveStreamQualities.map(quality => (
                        <div key={quality} style={styles.qualityUrl}>
                          <code>/uploads/{formData.videoId}/{quality}/playlist.m3u8</code>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}

          <div style={styles.actions}>
            <button
              type="button"
              onClick={onClose}
              style={styles.cancelBtn}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={styles.submitBtn}
            >
              {loading ? 'Saving...' : 'Save Stream Configuration'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    padding: '24px',
    maxWidth: '500px',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid #333'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: '#999',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: '14px'
  },
  input: {
    padding: '10px 12px',
    backgroundColor: '#222',
    border: '1px solid #333',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '14px',
    fontFamily: 'monospace'
  },
  hint: {
    color: '#888',
    fontSize: '12px',
    margin: '0'
  },
  checkboxGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  checkbox: {
    cursor: 'pointer',
    width: '16px',
    height: '16px'
  },
  qualityBadge: {
    backgroundColor: '#333',
    padding: '4px 12px',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '14px'
  },
  urlPreview: {
    backgroundColor: '#222',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #333'
  },
  urlList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  urlItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  qualityUrl: {
    paddingLeft: '20px',
    marginTop: '4px'
  },
  error: {
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    border: '1px solid #ff4444',
    color: '#ff6666',
    padding: '12px',
    borderRadius: '4px',
    fontSize: '14px'
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end'
  },
  cancelBtn: {
    padding: '8px 16px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  },
  submitBtn: {
    padding: '8px 16px',
    backgroundColor: '#ff6b6b',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  }
};

export default StreamMetadataManager;
