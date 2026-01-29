import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div className="container" style={styles.navContainer}>
        <Link to="/" style={styles.logo}>
          <h1 style={styles.logoText}>EDUSTREAM</h1>
        </Link>
        
        <div style={styles.navLinks}>
          <Link to="/videos" style={styles.link}>VIDEOS</Link>
          <Link to="/tools" style={styles.link}>TOOLS</Link>
          <Link to="/documentation" style={styles.link}>DOCS</Link>
          <Link to="/about" style={styles.link}>ABOUT</Link>
          
          {isAuthenticated ? (
            <>
              <span style={styles.userName}>Hi, {user.name}!</span>
              {user.role === 'admin' && (
                <Link to="/admin" style={styles.link}>ADMIN</Link>
              )}
              <button onClick={handleLogout} className="btn btn-accent" style={styles.logoutBtn}>
                LOGOUT
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" style={styles.authBtn}>
                LOGIN
              </Link>
              <Link to="/register" className="btn" style={styles.authBtn}>
                REGISTER
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'var(--color-white)',
    borderBottom: 'var(--border)',
    padding: '16px 0',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    boxShadow: '0 4px 0 var(--color-black)'
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px'
  },
  logo: {
    textDecoration: 'none'
  },
  logoText: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--color-primary)',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  link: {
    textDecoration: 'none',
    color: 'var(--color-text)',
    fontWeight: 600,
    fontSize: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'color 0.2s ease'
  },
  userName: {
    fontWeight: 600,
    color: 'var(--color-text)',
    padding: '8px 16px',
    backgroundColor: 'var(--color-accent)',
    border: 'var(--border)',
    boxShadow: 'var(--shadow)'
  },
  authBtn: {
    margin: 0
  },
  logoutBtn: {
    margin: 0
  }
};

export default Navbar;
