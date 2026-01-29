import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card" style={styles.card}>
      <div style={styles.thumbnail}>
        <div style={styles.thumbnailPlaceholder}>
          <span style={styles.playIcon}>▶</span>
        </div>
        {video.duration > 0 && (
          <span style={styles.duration}>{formatDuration(video.duration)}</span>
        )}
      </div>
      
      <div style={styles.content}>
        <h3 style={styles.title}>{video.title}</h3>
        <p style={styles.description}>
          {video.description.length > 100 
            ? `${video.description.substring(0, 100)}...` 
            : video.description}
        </p>
        
        <div style={styles.meta}>
          <span style={styles.badge}>{video.category}</span>
          <span style={styles.views}>👁 {video.views} views</span>
        </div>
        
        <Link to={`/video/${video._id}`} className="btn" style={styles.watchBtn}>
          WATCH NOW
        </Link>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: 0,
    overflow: 'hidden',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  thumbnail: {
    position: 'relative',
    width: '100%',
    height: '200px',
    backgroundColor: 'var(--color-accent)',
    borderBottom: 'var(--border)'
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playIcon: {
    fontSize: '48px',
    color: 'var(--color-text)'
  },
  duration: {
    position: 'absolute',
    bottom: '8px',
    right: '8px',
    padding: '4px 8px',
    backgroundColor: 'var(--color-black)',
    color: 'var(--color-white)',
    fontSize: '12px',
    fontWeight: 600,
    border: '2px solid var(--color-black)'
  },
  content: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1
  },
  title: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--color-text)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  description: {
    fontSize: '14px',
    color: 'var(--color-text)',
    lineHeight: '1.5',
    flex: 1
  },
  meta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap'
  },
  badge: {
    padding: '4px 12px',
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
  watchBtn: {
    width: '100%',
    textAlign: 'center',
    margin: 0
  }
};

export default VideoCard;
