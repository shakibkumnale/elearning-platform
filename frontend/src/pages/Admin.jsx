import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import StreamMetadataManager from '../components/StreamMetadataManager';

const Admin = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [showStreamManager, setShowStreamManager] = useState(false);
  const [selectedVideoForStream, setSelectedVideoForStream] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    videoType: 'hls',
    duration: '',
    category: '',
    isPublished: true
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }
    fetchVideos();
  }, [isAdmin, navigate]);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/videos?limit=100');
      setVideos(response.data.data.videos);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingVideo) {
        await api.put(`/videos/${editingVideo._id}`, formData);
        alert('Video updated successfully!');
      } else {
        await api.post('/videos', formData);
        alert('Video created successfully!');
      }
      
      resetForm();
      fetchVideos();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  const handleEdit = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnailUrl: video.thumbnailUrl || '',
      videoType: video.videoType,
      duration: video.duration,
      category: video.category,
      isPublished: video.isPublished
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this video?')) return;
    
    try {
      await api.delete(`/videos/${id}`);
      alert('Video deleted successfully!');
      fetchVideos();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      videoUrl: '',
      thumbnailUrl: '',
      videoType: 'hls',
      duration: '',
      category: '',
      isPublished: true
    });
    setEditingVideo(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className="container">
        <div style={styles.header}>
          <h1 style={styles.title}>ADMIN DASHBOARD</h1>
          <button
            className="btn btn-secondary"
            onClick={() => setShowForm(!showForm)}
            style={styles.addBtn}
          >
            {showForm ? 'CANCEL' : '+ ADD VIDEO'}
          </button>
        </div>

        {showForm && (
          <div className="card" style={styles.formCard}>
            <h2 style={styles.formTitle}>
              {editingVideo ? 'EDIT VIDEO' : 'ADD NEW VIDEO'}
            </h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>TITLE *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>CATEGORY *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="e.g., Programming"
                    required
                  />
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>DESCRIPTION *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field"
                  rows="4"
                  required
                  style={styles.textarea}
                />
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>VIDEO URL *</label>
                  <input
                    type="text"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="/uploads/videos/..."
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>THUMBNAIL URL</label>
                  <input
                    type="text"
                    name="thumbnailUrl"
                    value={formData.thumbnailUrl}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>VIDEO TYPE *</label>
                  <select
                    name="videoType"
                    value={formData.videoType}
                    onChange={handleChange}
                    className="input-field"
                    style={styles.select}
                  >
                    <option value="hls">HLS</option>
                    <option value="mp4">MP4</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>DURATION (SECONDS)</label>
                  <input
                    type="number"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div style={styles.checkboxGroup}>
                <label style={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    style={styles.checkbox}
                  />
                  PUBLISHED
                </label>
              </div>

              <div style={styles.formActions}>
                <button type="submit" className="btn" style={styles.submitBtn}>
                  {editingVideo ? 'UPDATE VIDEO' : 'CREATE VIDEO'}
                </button>
                <button
                  type="button"
                  className="btn btn-accent"
                  onClick={resetForm}
                  style={styles.cancelBtn}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        )}

        <div style={styles.videosList}>
          <h2 style={styles.videosTitle}>ALL VIDEOS ({videos.length})</h2>
          
          {videos.length === 0 ? (
            <div className="card" style={styles.emptyState}>
              <p style={styles.emptyText}>No videos yet. Add your first video!</p>
            </div>
          ) : (
            <div className="grid grid-2">
              {videos.map((video) => (
                <div key={video._id} className="card" style={styles.videoCard}>
                  <h3 style={styles.videoTitle}>{video.title}</h3>
                  <p style={styles.videoDescription}>
                    {video.description.substring(0, 100)}...
                  </p>
                  <div style={styles.videoMeta}>
                    <span style={styles.badge}>{video.category}</span>
                    <span style={styles.badge}>
                      {video.videoType.toUpperCase()}
                    </span>
                    <span style={styles.badge}>
                      {video.isPublished ? '✓ PUBLISHED' : '✗ DRAFT'}
                    </span>
                  </div>
                  <div style={styles.videoStats}>
                    <span>👁 {video.views} views</span>
                    <span>⏱ {video.duration}s</span>
                  </div>
                  <div style={styles.videoActions}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleEdit(video)}
                      style={styles.actionBtn}
                    >
                      EDIT
                    </button>
                    <button
                      className="btn btn-accent"
                      onClick={() => {
                        setSelectedVideoForStream(video);
                        setShowStreamManager(true);
                      }}
                      style={styles.actionBtn}
                      title="Configure adaptive streaming"
                    >
                      STREAM
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDelete(video._id)}
                      style={styles.actionBtn}
                    >
                      DELETE
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showStreamManager && selectedVideoForStream && (
        <StreamMetadataManager
          videoId={selectedVideoForStream._id}
          onClose={() => {
            setShowStreamManager(false);
            setSelectedVideoForStream(null);
          }}
          onSuccess={(updatedVideo) => {
            setVideos(videos.map(v => v._id === updatedVideo._id ? updatedVideo : v));
          }}
        />
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    padding: '40px 0'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '16px'
  },
  title: {
    fontSize: '40px',
    fontWeight: 700,
    color: 'var(--color-text)',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  addBtn: {
    margin: 0
  },
  formCard: {
    padding: '32px',
    marginBottom: '32px',
    backgroundColor: 'var(--color-accent)'
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '24px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-text)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  textarea: {
    resize: 'vertical',
    fontFamily: 'Space Grotesk, sans-serif'
  },
  select: {
    cursor: 'pointer'
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text)',
    cursor: 'pointer'
  },
  checkbox: {
    width: '24px',
    height: '24px',
    cursor: 'pointer'
  },
  formActions: {
    display: 'flex',
    gap: '16px',
    marginTop: '12px'
  },
  submitBtn: {
    flex: 1,
    margin: 0
  },
  cancelBtn: {
    flex: 1,
    margin: 0
  },
  videosList: {
    marginTop: '48px'
  },
  videosTitle: {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '24px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  emptyState: {
    padding: '60px 20px',
    textAlign: 'center'
  },
  emptyText: {
    fontSize: '18px',
    color: 'var(--color-text)'
  },
  videoCard: {
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  videoTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--color-text)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  videoDescription: {
    fontSize: '14px',
    color: 'var(--color-text)',
    lineHeight: '1.5'
  },
  videoMeta: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap'
  },
  badge: {
    padding: '4px 8px',
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-white)',
    fontSize: '11px',
    fontWeight: 600,
    border: '2px solid var(--color-black)',
    textTransform: 'uppercase'
  },
  videoStats: {
    display: 'flex',
    gap: '16px',
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-text)'
  },
  videoActions: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px'
  },
  actionBtn: {
    flex: 1,
    margin: 0,
    fontSize: '14px',
    padding: '10px 16px'
  }
};

export default Admin;
