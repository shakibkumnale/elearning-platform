import { useState } from 'react';
import api from '../utils/api';

const Tools = () => {
  const [activeTab, setActiveTab] = useState('bitrate');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Bitrate Calculator
  const [bitrateForm, setBitrateForm] = useState({
    fileSize: '',
    duration: ''
  });

  // File Size Calculator
  const [fileSizeForm, setFileSizeForm] = useState({
    bitrate: '',
    duration: ''
  });

  // Resolution Estimator
  const [resolutionForm, setResolutionForm] = useState({
    width: '1920',
    height: '1080',
    frameRate: '30',
    quality: 'medium'
  });

  // Bitrate Comparator
  const [comparatorForm, setComparatorForm] = useState({
    bitrate1: '',
    bitrate2: '',
    duration: ''
  });

  const calculateBitrate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/utility/calculate-bitrate', {
        fileSize: parseFloat(bitrateForm.fileSize),
        duration: parseFloat(bitrateForm.duration)
      });
      setResults(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  const calculateFileSize = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/utility/calculate-filesize', {
        bitrate: parseFloat(fileSizeForm.bitrate),
        duration: parseFloat(fileSizeForm.duration)
      });
      setResults(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Calculation failed');
    } finally {
      setLoading(false);
    }
  };

  const estimateBitrate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/utility/estimate-bitrate', resolutionForm);
      setResults(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Estimation failed');
    } finally {
      setLoading(false);
    }
  };

  const compareBitrates = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/utility/compare-bitrates', {
        bitrate1: parseFloat(comparatorForm.bitrate1),
        bitrate2: parseFloat(comparatorForm.bitrate2),
        duration: parseFloat(comparatorForm.duration)
      });
      setResults(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Comparison failed');
    } finally {
      setLoading(false);
    }
  };

  const renderResults = () => {
    if (!results) return null;

    return (
      <div className="card" style={styles.resultsCard}>
        <h3 style={styles.resultsTitle}>RESULTS</h3>
        <pre style={styles.resultsContent}>
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div className="container">
        <div style={styles.header}>
          <h1 style={styles.title}>VIDEO UTILITY TOOLS</h1>
          <p style={styles.subtitle}>Professional video bitrate calculators and streaming tools</p>
        </div>

        <div style={styles.tabs}>
          <button
            className={activeTab === 'bitrate' ? 'btn' : 'btn btn-accent'}
            onClick={() => { setActiveTab('bitrate'); setResults(null); setError(''); }}
            style={styles.tabBtn}
          >
            BITRATE CALC
          </button>
          <button
            className={activeTab === 'filesize' ? 'btn' : 'btn btn-accent'}
            onClick={() => { setActiveTab('filesize'); setResults(null); setError(''); }}
            style={styles.tabBtn}
          >
            FILE SIZE CALC
          </button>
          <button
            className={activeTab === 'resolution' ? 'btn' : 'btn btn-accent'}
            onClick={() => { setActiveTab('resolution'); setResults(null); setError(''); }}
            style={styles.tabBtn}
          >
            RESOLUTION EST
          </button>
          <button
            className={activeTab === 'compare' ? 'btn' : 'btn btn-accent'}
            onClick={() => { setActiveTab('compare'); setResults(null); setError(''); }}
            style={styles.tabBtn}
          >
            COMPARE
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="card" style={styles.toolCard}>
          {activeTab === 'bitrate' && (
            <>
              <h2 style={styles.toolTitle}>BITRATE CALCULATOR</h2>
              <p style={styles.toolDescription}>Calculate video bitrate from file size and duration</p>
              <form onSubmit={calculateBitrate} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>FILE SIZE (MB)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="input-field"
                    placeholder="e.g., 100"
                    value={bitrateForm.fileSize}
                    onChange={(e) => setBitrateForm({ ...bitrateForm, fileSize: e.target.value })}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>DURATION (SECONDS)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="input-field"
                    placeholder="e.g., 120"
                    value={bitrateForm.duration}
                    onChange={(e) => setBitrateForm({ ...bitrateForm, duration: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn" style={styles.submitBtn} disabled={loading}>
                  {loading ? 'CALCULATING...' : 'CALCULATE'}
                </button>
              </form>
            </>
          )}

          {activeTab === 'filesize' && (
            <>
              <h2 style={styles.toolTitle}>FILE SIZE CALCULATOR</h2>
              <p style={styles.toolDescription}>Calculate file size from bitrate and duration</p>
              <form onSubmit={calculateFileSize} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>BITRATE (KBPS)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="input-field"
                    placeholder="e.g., 2500"
                    value={fileSizeForm.bitrate}
                    onChange={(e) => setFileSizeForm({ ...fileSizeForm, bitrate: e.target.value })}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>DURATION (SECONDS)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="input-field"
                    placeholder="e.g., 120"
                    value={fileSizeForm.duration}
                    onChange={(e) => setFileSizeForm({ ...fileSizeForm, duration: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn" style={styles.submitBtn} disabled={loading}>
                  {loading ? 'CALCULATING...' : 'CALCULATE'}
                </button>
              </form>
            </>
          )}

          {activeTab === 'resolution' && (
            <>
              <h2 style={styles.toolTitle}>RESOLUTION BITRATE ESTIMATOR</h2>
              <p style={styles.toolDescription}>Estimate bitrate based on resolution and frame rate</p>
              <form onSubmit={estimateBitrate} style={styles.form}>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>WIDTH (PX)</label>
                    <input
                      type="number"
                      className="input-field"
                      value={resolutionForm.width}
                      onChange={(e) => setResolutionForm({ ...resolutionForm, width: e.target.value })}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>HEIGHT (PX)</label>
                    <input
                      type="number"
                      className="input-field"
                      value={resolutionForm.height}
                      onChange={(e) => setResolutionForm({ ...resolutionForm, height: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>FRAME RATE (FPS)</label>
                    <input
                      type="number"
                      className="input-field"
                      value={resolutionForm.frameRate}
                      onChange={(e) => setResolutionForm({ ...resolutionForm, frameRate: e.target.value })}
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>QUALITY</label>
                    <select
                      className="input-field"
                      value={resolutionForm.quality}
                      onChange={(e) => setResolutionForm({ ...resolutionForm, quality: e.target.value })}
                      style={styles.select}
                    >
                      <option value="low">LOW</option>
                      <option value="medium">MEDIUM</option>
                      <option value="high">HIGH</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn" style={styles.submitBtn} disabled={loading}>
                  {loading ? 'ESTIMATING...' : 'ESTIMATE'}
                </button>
              </form>
            </>
          )}

          {activeTab === 'compare' && (
            <>
              <h2 style={styles.toolTitle}>BITRATE COMPARATOR</h2>
              <p style={styles.toolDescription}>Compare two bitrates for the same video duration</p>
              <form onSubmit={compareBitrates} style={styles.form}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>BITRATE 1 (KBPS)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="input-field"
                    placeholder="e.g., 2500"
                    value={comparatorForm.bitrate1}
                    onChange={(e) => setComparatorForm({ ...comparatorForm, bitrate1: e.target.value })}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>BITRATE 2 (KBPS)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="input-field"
                    placeholder="e.g., 5000"
                    value={comparatorForm.bitrate2}
                    onChange={(e) => setComparatorForm({ ...comparatorForm, bitrate2: e.target.value })}
                    required
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>DURATION (SECONDS)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="input-field"
                    placeholder="e.g., 120"
                    value={comparatorForm.duration}
                    onChange={(e) => setComparatorForm({ ...comparatorForm, duration: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn" style={styles.submitBtn} disabled={loading}>
                  {loading ? 'COMPARING...' : 'COMPARE'}
                </button>
              </form>
            </>
          )}
        </div>

        {renderResults()}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: 'calc(100vh - 80px)',
    padding: '40px 0'
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px'
  },
  title: {
    fontSize: '48px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  subtitle: {
    fontSize: '18px',
    color: 'var(--color-text)'
  },
  tabs: {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  tabBtn: {
    margin: 0
  },
  toolCard: {
    padding: '32px',
    marginBottom: '24px'
  },
  toolTitle: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  toolDescription: {
    fontSize: '16px',
    color: 'var(--color-text)',
    marginBottom: '32px'
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
  select: {
    cursor: 'pointer'
  },
  submitBtn: {
    width: '100%',
    marginTop: '12px'
  },
  resultsCard: {
    padding: '32px',
    backgroundColor: 'var(--color-accent)'
  },
  resultsTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--color-text)',
    marginBottom: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  resultsContent: {
    fontSize: '14px',
    fontFamily: 'monospace',
    backgroundColor: 'var(--color-white)',
    padding: '20px',
    border: 'var(--border)',
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word'
  }
};

export default Tools;
