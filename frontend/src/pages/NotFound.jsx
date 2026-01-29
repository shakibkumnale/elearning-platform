import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={styles.container}>
      <div className="container">
        <div style={styles.content}>
          <h1 style={styles.errorCode}>404</h1>
          <h2 style={styles.title}>PAGE NOT FOUND</h2>
          <p style={styles.description}>
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn" style={styles.homeBtn}>
            ← BACK TO HOME
          </Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0'
  },
  content: {
    textAlign: 'center',
    backgroundColor: 'var(--color-white)',
    border: 'var(--border)',
    boxShadow: 'var(--shadow)',
    padding: '80px 40px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  errorCode: {
    fontSize: '120px',
    fontWeight: 700,
    color: 'var(--color-primary)',
    margin: '0 0 20px 0',
    textTransform: 'uppercase',
    letterSpacing: '4px'
  },
  title: {
    fontSize: '42px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  description: {
    fontSize: '18px',
    color: 'var(--color-text)',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  homeBtn: {
    margin: 0
  }
};

export default NotFound;
