import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <section style={styles.hero}>
        <div className="container">
          <div style={styles.heroContent}>
            <h1 style={styles.title}>
              LEARN ANYTHING,
              <br />
              <span style={styles.titleAccent}>ANYTIME</span>
            </h1>
            <p style={styles.subtitle}>
              Stream high-quality educational content with our advanced HLS video platform. 
              Built for learners, optimized for performance.
            </p>
            <div style={styles.ctaButtons}>
              <Link to="/videos" className="btn" style={styles.ctaBtn}>
                EXPLORE VIDEOS
              </Link>
              <Link to="/tools" className="btn btn-accent" style={styles.ctaBtn}>
                BITRATE CALCULATOR
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.features}>
        <div className="container">
          <h2 style={styles.sectionTitle}>PLATFORM FEATURES</h2>
          <div className="grid grid-3">
            <div className="card" style={styles.featureCard}>
              <div style={styles.featureIcon}>📺</div>
              <h3 style={styles.featureTitle}>HLS STREAMING</h3>
              <p style={styles.featureText}>
                Adaptive bitrate streaming for smooth playback on any device and connection speed.
              </p>
            </div>
            
            <div className="card" style={styles.featureCard}>
              <div style={styles.featureIcon}>🎯</div>
              <h3 style={styles.featureTitle}>TRACK PROGRESS</h3>
              <p style={styles.featureText}>
                Keep track of your learning journey with automatic video progress tracking.
              </p>
            </div>
            
            <div className="card" style={styles.featureCard}>
              <div style={styles.featureIcon}>🔧</div>
              <h3 style={styles.featureTitle}>UTILITY TOOLS</h3>
              <p style={styles.featureText}>
                Professional video bitrate calculators and streaming optimization tools.
              </p>
            </div>
            
            <div className="card" style={styles.featureCard}>
              <div style={styles.featureIcon}>🔒</div>
              <h3 style={styles.featureTitle}>SECURE AUTH</h3>
              <p style={styles.featureText}>
                JWT-based authentication with secure password hashing and session management.
              </p>
            </div>
            
            <div className="card" style={styles.featureCard}>
              <div style={styles.featureIcon}>🚀</div>
              <h3 style={styles.featureTitle}>FAST & RELIABLE</h3>
              <p style={styles.featureText}>
                Optimized backend with MongoDB and efficient API design for lightning-fast performance.
              </p>
            </div>
            
            <div className="card" style={styles.featureCard}>
              <div style={styles.featureIcon}>📱</div>
              <h3 style={styles.featureTitle}>RESPONSIVE</h3>
              <p style={styles.featureText}>
                Beautiful neo-brutalism design that works perfectly on desktop, tablet, and mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={styles.cta}>
        <div className="container">
          <div style={styles.ctaBox}>
            <h2 style={styles.ctaTitle}>READY TO START LEARNING?</h2>
            <p style={styles.ctaText}>
              Join our platform today and access a world of educational content.
            </p>
            <Link to="/register" className="btn btn-secondary" style={styles.ctaButton}>
              GET STARTED NOW
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)'
  },
  hero: {
    padding: '80px 0',
    backgroundColor: 'var(--color-primary)',
    borderBottom: 'var(--border)',
    boxShadow: '0 8px 0 var(--color-black)'
  },
  heroContent: {
    textAlign: 'center',
    maxWidth: '800px',
    margin: '0 auto'
  },
  title: {
    fontSize: '64px',
    fontWeight: 700,
    color: 'var(--color-white)',
    marginBottom: '24px',
    lineHeight: '1.1',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  titleAccent: {
    color: 'var(--color-accent)'
  },
  subtitle: {
    fontSize: '20px',
    color: 'var(--color-white)',
    marginBottom: '40px',
    lineHeight: '1.6'
  },
  ctaButtons: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  ctaBtn: {
    fontSize: '18px'
  },
  features: {
    padding: '80px 0'
  },
  sectionTitle: {
    fontSize: '48px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '48px',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  featureCard: {
    textAlign: 'center',
    height: '100%'
  },
  featureIcon: {
    fontSize: '64px',
    marginBottom: '20px'
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  featureText: {
    fontSize: '16px',
    color: 'var(--color-text)',
    lineHeight: '1.6'
  },
  cta: {
    padding: '80px 0',
    backgroundColor: 'var(--color-secondary)',
    borderTop: 'var(--border)',
    borderBottom: 'var(--border)',
    boxShadow: '0 -8px 0 var(--color-black)'
  },
  ctaBox: {
    textAlign: 'center',
    maxWidth: '600px',
    margin: '0 auto'
  },
  ctaTitle: {
    fontSize: '40px',
    fontWeight: 700,
    color: 'var(--color-white)',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  ctaText: {
    fontSize: '18px',
    color: 'var(--color-white)',
    marginBottom: '32px',
    lineHeight: '1.6'
  },
  ctaButton: {
    fontSize: '18px'
  }
};

export default Home;
