import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import VideoPlayer from '../components/VideoPlayer';
import { AuthContext } from '../context/AuthContext';

const VideoDetail = () => {
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/videos/${id}`);
      setVideo(response.data.data.video);
      setError('');
    } catch (err) {
      setError('Failed to load video');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleProgress = async (progress) => {
    if (!isAuthenticated || !video) return;

    try {
      await api.post('/videos/progress', {
        videoId: video._id,
        watchedDuration: Math.floor(progress.currentTime),
        totalDuration: Math.floor(progress.duration)
      });
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div style={styles.container}>
        <div className="container">
          <div className="error-message">{error || 'Video not found'}</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div className="container">
        <div style={styles.videoWrapper}>
          <VideoPlayer
            videoUrl={video.videoUrl}
            videoType={video.videoType}
            onProgress={handleProgress}
          />
        </div>

        <div className="card" style={styles.infoCard}>
          <div style={styles.header}>
            <h1 style={styles.title}>{video.title}</h1>
            <div style={styles.meta}>
              <span style={styles.badge}>{video.category}</span>
              <span style={styles.views}>👁 {video.views} views</span>
              <span style={styles.date}>📅 {formatDate(video.createdAt)}</span>
            </div>
          </div>

          <div style={styles.description}>
            <h2 style={styles.descriptionTitle}>ABOUT THIS VIDEO</h2>
            <p style={styles.descriptionText}>{video.description}</p>
          </div>

          {video.createdBy && (
            <div style={styles.creator}>
              <h3 style={styles.creatorTitle}>UPLOADED BY</h3>
              <p style={styles.creatorName}>{video.createdBy.name}</p>
            </div>
          )}

          <div style={styles.details}>
            <div style={styles.detailItem}>
              <span style={styles.detailLabel}>VIDEO TYPE:</span>
              <span style={styles.detailValue}>{video.videoType.toUpperCase()}</span>
            </div>
            {video.duration > 0 && (
              <div style={styles.detailItem}>
                <span style={styles.detailLabel}>DURATION:</span>
                <span style={styles.detailValue}>
                  {Math.floor(video.duration / 60)}m {video.duration % 60}s
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    padding: '40px 0'
  },
  videoWrapper: {
    marginBottom: '24px',
    maxWidth: '100%'
  },
  infoCard: {
    padding: '32px'
  },
  header: {
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: 'var(--border)'
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  meta: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  badge: {
    padding: '6px 12px',
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-white)',
    fontSize: '12px',
    fontWeight: 600,
    border: '2px solid var(--color-black)',
    textTransform: 'uppercase'
  },
  views: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-text)'
  },
  date: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-text)'
  },
  description: {
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: 'var(--border)'
  },
  descriptionTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  descriptionText: {
    fontSize: '16px',
    color: 'var(--color-text)',
    lineHeight: '1.6'
  },
  creator: {
    marginBottom: '24px',
    paddingBottom: '24px',
    borderBottom: 'var(--border)'
  },
  creatorTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  creatorName: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-primary)'
  },
  details: {
    display: 'flex',
    gap: '32px',
    flexWrap: 'wrap'
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  detailLabel: {
    fontSize: '12px',
    fontWeight: 700,
    color: 'var(--color-text)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  detailValue: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-text)'
  }
};

export default VideoDetail;