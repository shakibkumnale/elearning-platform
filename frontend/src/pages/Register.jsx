import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    const result = await register(formData.name, formData.email, formData.password);
    
    if (result.success) {
      navigate('/videos');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div className="container">
        <div style={styles.formWrapper}>
          <div className="card" style={styles.card}>
            <h1 style={styles.title}>REGISTER</h1>
            <p style={styles.subtitle}>Create your account and start learning today!</p>

            {error && (
              <div className="error-message">{error}</div>
            )}

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>FULL NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>EMAIL ADDRESS</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>PASSWORD</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>CONFIRM PASSWORD</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Confirm your password"
                  required
                  minLength={6}
                />
              </div>

              <button 
                type="submit" 
                className="btn" 
                style={styles.submitBtn}
                disabled={loading}
              >
                {loading ? 'CREATING ACCOUNT...' : 'REGISTER'}
              </button>
            </form>

            <div style={styles.footer}>
              <p style={styles.footerText}>
                Already have an account?{' '}
                <Link to="/login" style={styles.link}>
                  LOGIN HERE
                </Link>
              </p>
            </div>
          </div>
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
  formWrapper: {
    maxWidth: '500px',
    margin: '0 auto'
  },
  card: {
    padding: '40px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '12px',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  subtitle: {
    fontSize: '16px',
    color: 'var(--color-text)',
    marginBottom: '32px',
    textAlign: 'center'
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
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-text)',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  submitBtn: {
    width: '100%',
    marginTop: '12px'
  },
  footer: {
    marginTop: '24px',
    textAlign: 'center'
  },
  footerText: {
    fontSize: '14px',
    color: 'var(--color-text)'
  },
  link: {
    color: 'var(--color-primary)',
    fontWeight: 600,
    textDecoration: 'none',
    textTransform: 'uppercase'
  }
};

export default Register;
