import { useState } from 'react';
import {
  FaBook,
  FaExclamationTriangle,
  FaCheckCircle,
  FaCogs,
  FaCode,
  FaServer,
  FaDatabase,
  FaRocket,
  FaLightbulb,
  FaChartLine,
  FaTerminal,
  FaGithub,
  FaArrowRight,
  FaDownload,
  FaLink,
  FaClock,
  FaChevronDown,
  FaChevronUp,
} from 'react-icons/fa';

const Documentation = () => {
  const [expandedChallenge, setExpandedChallenge] = useState(0);

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '40px 20px',
      backgroundColor: 'var(--color-bg)',
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
    },
    heroSection: {
      backgroundColor: 'var(--color-white)',
      border: '3px solid var(--color-text)',
      boxShadow: '6px 6px 0px var(--color-text)',
      padding: '50px 40px',
      marginBottom: '60px',
      textAlign: 'center',
    },
    heroTitle: {
      fontSize: '48px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '3px',
      marginBottom: '15px',
      color: 'var(--color-text)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '20px',
    },
    heroIcon: {
      fontSize: '48px',
      color: 'var(--color-primary)',
    },
    heroSubtitle: {
      fontSize: '18px',
      color: 'var(--color-text)',
      lineHeight: '1.6',
      maxWidth: '600px',
      margin: '0 auto',
    },
    section: {
      marginBottom: '80px',
    },
    sectionTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      marginBottom: '40px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      color: 'var(--color-text)',
      borderBottom: '3px solid var(--color-primary)',
      paddingBottom: '20px',
    },
    sectionIcon: {
      fontSize: '36px',
      color: 'var(--color-primary)',
    },
    challengeCard: {
      marginBottom: '30px',
      backgroundColor: 'var(--color-white)',
      border: '3px solid var(--color-text)',
      boxShadow: '4px 4px 0px var(--color-text)',
      overflow: 'hidden',
    },
    challengeHeader: {
      padding: '25px',
      backgroundColor: '#fff3cd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      borderBottom: '3px solid var(--color-text)',
    },
    challengeHeaderHover: {
      backgroundColor: '#ffe066',
      transform: 'translate(-2px, -2px)',
      boxShadow: '6px 6px 0px var(--color-text)',
    },
    challengeNumber: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      flex: 1,
    },
    challengeTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      color: 'var(--color-text)',
    },
    challengeIcon: {
      fontSize: '24px',
      color: '#ff6b6b',
    },
    challengeToggle: {
      fontSize: '20px',
      color: 'var(--color-text)',
      transition: 'transform 0.2s ease',
    },
    challengeContent: {
      padding: '30px',
      backgroundColor: 'var(--color-white)',
    },
    problemSection: {
      marginBottom: '25px',
    },
    problemTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: '12px',
      color: 'var(--color-primary)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    problemList: {
      marginLeft: '25px',
      lineHeight: '1.8',
      fontSize: '14px',
      color: 'var(--color-text)',
    },
    solutionBox: {
      backgroundColor: '#d4edda',
      border: '3px solid #4ecdc4',
      boxShadow: '4px 4px 0px #4ecdc4',
      padding: '20px',
      marginTop: '15px',
    },
    solutionTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '12px',
      textTransform: 'uppercase',
      color: '#4ecdc4',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    solutionText: {
      fontSize: '14px',
      color: 'var(--color-text)',
      lineHeight: '1.6',
    },
    metricsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '15px',
      marginTop: '20px',
    },
    metricCard: {
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-white)',
      border: '2px solid var(--color-text)',
      padding: '15px',
      textAlign: 'center',
      boxShadow: '3px 3px 0px var(--color-text)',
    },
    metricValue: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    metricLabel: {
      fontSize: '12px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    architectureSection: {
      backgroundColor: 'var(--color-white)',
      border: '3px solid var(--color-text)',
      boxShadow: '4px 4px 0px var(--color-text)',
      padding: '40px',
      marginBottom: '40px',
    },
    architectureBox: {
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-white)',
      border: '3px solid var(--color-text)',
      padding: '25px',
      marginBottom: '15px',
      boxShadow: '3px 3px 0px var(--color-text)',
    },
    architectureLabel: {
      fontSize: '14px',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      letterSpacing: '1px',
      marginBottom: '8px',
    },
    architectureTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    architectureDesc: {
      fontSize: '13px',
      lineHeight: '1.6',
      opacity: 0.9,
    },
    arrow: {
      textAlign: 'center',
      fontSize: '24px',
      margin: '15px 0',
      color: 'var(--color-primary)',
    },
    featuresList: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    featureCard: {
      backgroundColor: 'var(--color-white)',
      border: '3px solid var(--color-text)',
      padding: '20px',
      boxShadow: '3px 3px 0px var(--color-text)',
    },
    featureTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: 'var(--color-primary)',
    },
    featureList: {
      fontSize: '13px',
      lineHeight: '1.8',
      color: 'var(--color-text)',
    },
    codeBlock: {
      backgroundColor: '#001858',
      color: '#4ecdc4',
      border: '3px solid #4ecdc4',
      padding: '15px',
      marginTop: '15px',
      overflow: 'auto',
      fontFamily: 'monospace',
      fontSize: '12px',
      boxShadow: '3px 3px 0px #4ecdc4',
    },
    techStack: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '15px',
    },
    techTag: {
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
      padding: '6px 12px',
      fontSize: '12px',
      fontWeight: 'bold',
      border: '2px solid var(--color-text)',
      boxShadow: '2px 2px 0px var(--color-text)',
    },
    ctaSection: {
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-white)',
      border: '3px solid var(--color-text)',
      padding: '40px',
      textAlign: 'center',
      boxShadow: '6px 6px 0px var(--color-text)',
    },
    ctaTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: '15px',
      letterSpacing: '2px',
    },
    ctaText: {
      fontSize: '16px',
      lineHeight: '1.6',
      marginBottom: '25px',
    },
    linkButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 24px',
      backgroundColor: 'var(--color-white)',
      color: 'var(--color-text)',
      border: '3px solid var(--color-text)',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      transition: 'all 0.2s ease',
      boxShadow: '3px 3px 0px var(--color-text)',
      marginRight: '10px',
      marginTop: '10px',
    },
    timelineItem: {
      display: 'flex',
      gap: '20px',
      marginBottom: '30px',
      alignItems: 'flex-start',
    },
    timelineNumber: {
      minWidth: '50px',
      height: '50px',
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
      border: '2px solid var(--color-text)',
      borderRadius: '0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '18px',
      boxShadow: '3px 3px 0px var(--color-text)',
      flexShrink: 0,
    },
    timelineContent: {
      flex: 1,
    },
  };

  const challenges = [
    {
      id: 0,
      title: '🎬 HLS Video Conversion Complexity',
      icon: FaServer,
      problems: [
        'Frequent file corruption during transcoding process',
        'Extremely long processing times (4-8 hours for longer videos)',
        'Inconsistent quality output across different bitrates',
        'Resource-intensive operations consuming significant CPU/memory',
        'Segmentation issues with .ts file generation',
      ],
      solution:
        'Limited maximum resolution to 720p. This dramatically reduced file size, conversion time (from 4-8 hours to 15-25 minutes), and resource usage while maintaining excellent visual quality for educational content. Implemented FFmpeg with optimized encoding parameters for stability.',
      metrics: [
        { label: '90% Faster', value: '4-8h → 15-25m' },
        { label: 'Max Resolution', value: '720p' },
        { label: 'Quality', value: 'HD Ready' },
      ],
      techDetails: [
        'FFmpeg codec: libx264',
        'Bitrate: 2500-3500 kbps for 720p',
        'Segment duration: 10 seconds',
        'HLS version: 3',
      ],
    },
    {
      id: 1,
      title: '📚 FFmpeg Learning Curve',
      icon: FaCode,
      problems: [
        'Complex command-line syntax with 100+ options',
        'Minimal and confusing official documentation',
        'Very few practical examples and tutorials available',
        'Trial-and-error approach required for configurations',
        'Community resources scattered and often outdated',
        'Version compatibility issues across systems',
      ],
      solution:
        'Created robust wrapper scripts with pre-configured FFmpeg commands. Documented all parameters, experimented extensively to find optimal settings, and built reusable functions for common transcoding tasks (360p, 480p, 720p).',
      metrics: [
        { label: 'Encoding Profiles', value: '3 Quality' },
        { label: 'Wrapper Scripts', value: 'Pre-built' },
        { label: 'Setup Time', value: '90% Reduced' },
      ],
      codeExample: `# Optimized 720p encoding
ffmpeg -i input.mp4 \\
  -c:v libx264 \\
  -b:v 3500k \\
  -maxrate 4500k \\
  -bufsize 9000k \\
  -g 120 \\
  -hls_time 10 \\
  output.m3u8`,
      resources: [
        'Created local FFmpeg reference guide',
        'Built encoding parameter documentation',
        'Developed test scripts for quality validation',
      ],
    },
    {
      id: 2,
      title: '🚀 Deployment & Serverless Limitations',
      icon: FaRocket,
      problems: [
        'Video transcoding requires long-running processes (incompatible with serverless)',
        'File upload limitations in serverless environments',
        'Cannot spawn subprocess for FFmpeg execution',
        'Memory and CPU constraints on edge functions (timeout limits ~15 min)',
        'No persistent storage between function invocations',
        'Vercel 50MB Lambda function size limit',
      ],
      solution:
        'Separated backend and frontend deployment. Frontend (React + Vite) deployed on Vercel for static content delivery. Backend (Node.js + Express) hosted on traditional server with full FFmpeg support and system access. Removed HLS generation code from serverless function.',
      metrics: [
        { label: 'Frontend', value: 'Vercel CDN' },
        { label: 'Backend', value: 'Node.js' },
        { label: 'Processing', value: 'Server-side' },
      ],
      architectureFlow: true,
    },
  ];

  const toggleChallenge = (id) => {
    setExpandedChallenge(expandedChallenge === id ? null : id);
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Hero Section */}
        <div style={styles.heroSection}>
          <div style={styles.heroTitle}>
            <FaBook style={styles.heroIcon} />
            Project Documentation
          </div>
          <p style={styles.heroSubtitle}>
            Deep dive into EDUSTREAM's architecture, challenges, and innovative solutions. 
            Learn how we solved real-world problems in video streaming, FFmpeg integration, 
            and serverless deployment constraints.
          </p>
        </div>

        {/* Challenges Section */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaExclamationTriangle style={styles.sectionIcon} />
            Project Challenges & Solutions
          </div>

          {challenges.map((challenge) => (
            <div key={challenge.id} style={styles.challengeCard}>
              <div
                style={styles.challengeHeader}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, {
                    backgroundColor: '#ffe066',
                    transform: 'translate(-2px, -2px)',
                  });
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, {
                    backgroundColor: '#fff3cd',
                    transform: 'translate(0, 0)',
                  });
                }}
                onClick={() => toggleChallenge(challenge.id)}
              >
                <div style={styles.challengeNumber}>
                  <challenge.icon style={styles.challengeIcon} />
                  <div style={styles.challengeTitle}>{challenge.title}</div>
                </div>
                <div
                  style={{
                    ...styles.challengeToggle,
                    transform: expandedChallenge === challenge.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                >
                  <FaChevronDown />
                </div>
              </div>

              {expandedChallenge === challenge.id && (
                <div style={styles.challengeContent}>
                  {/* Problems */}
                  <div style={styles.problemSection}>
                    <div style={styles.problemTitle}>
                      <FaExclamationTriangle /> Problems Faced
                    </div>
                    <ul style={styles.problemList}>
                      {challenge.problems.map((problem, idx) => (
                        <li key={idx}>• {problem}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Solution */}
                  <div style={styles.solutionBox}>
                    <div style={styles.solutionTitle}>
                      <FaCheckCircle /> Solution Implemented
                    </div>
                    <div style={styles.solutionText}>{challenge.solution}</div>

                    {challenge.metrics && (
                      <div style={styles.metricsGrid}>
                        {challenge.metrics.map((metric, idx) => (
                          <div key={idx} style={styles.metricCard}>
                            <div style={styles.metricValue}>{metric.value}</div>
                            <div style={styles.metricLabel}>{metric.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Code Example */}
                  {challenge.codeExample && (
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', textTransform: 'uppercase' }}>
                        📝 FFmpeg Command Example
                      </div>
                      <div style={styles.codeBlock}>
                        {challenge.codeExample.split('\n').map((line, idx) => (
                          <div key={idx}>{line}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {challenge.resources && (
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', textTransform: 'uppercase' }}>
                        💡 Resources Created
                      </div>
                      <ul style={styles.problemList}>
                        {challenge.resources.map((resource, idx) => (
                          <li key={idx}>✓ {resource}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech Details */}
                  {challenge.techDetails && (
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px', textTransform: 'uppercase' }}>
                        🔧 Technical Details
                      </div>
                      <div style={styles.techStack}>
                        {challenge.techDetails.map((detail, idx) => (
                          <span key={idx} style={styles.techTag}>{detail}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Architecture */}
                  {challenge.architectureFlow && (
                    <div style={{ marginTop: '30px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px', textTransform: 'uppercase' }}>
                        🏗️ Deployment Architecture
                      </div>

                      <div style={styles.architectureBox}>
                        <div style={styles.architectureLabel}>⚡ Frontend Layer</div>
                        <div style={styles.architectureTitle}>React 18 + Vite on Vercel</div>
                        <div style={styles.architectureDesc}>
                          Static deployment with CDN acceleration. Handles UI rendering, user interactions, and API calls. 
                          No video processing.
                        </div>
                      </div>

                      <div style={styles.arrow}>↓ HTTP Requests ↓</div>

                      <div style={styles.architectureBox}>
                        <div style={styles.architectureLabel}>🖥️ Backend Layer</div>
                        <div style={styles.architectureTitle}>Node.js + Express Server</div>
                        <div style={styles.architectureDesc}>
                          Traditional server with full system access. Runs FFmpeg, handles video transcoding, 
                          generates HLS playlists, manages database, and serves media files.
                        </div>
                      </div>

                      <div style={styles.arrow}>↓ File Storage ↓</div>

                      <div style={styles.architectureBox}>
                        <div style={styles.architectureLabel}>💾 Storage Layer</div>
                        <div style={styles.architectureTitle}>MongoDB + File System</div>
                        <div style={styles.architectureDesc}>
                          MongoDB for metadata, file system for HLS streams (m3u8 + .ts segments). 
                          Persistent storage between requests.
                        </div>
                      </div>

                      <div style={{ marginTop: '25px', backgroundColor: '#d4edda', border: '2px solid #4ecdc4', padding: '15px' }}>
                        <strong>Why This Works:</strong>
                        <ul style={{ marginLeft: '20px', marginTop: '10px', fontSize: '13px' }}>
                          <li>✓ Frontend can scale instantly with Vercel's CDN</li>
                          <li>✓ Backend processes videos asynchronously without timeout limits</li>
                          <li>✓ Separation of concerns: content delivery vs. heavy processing</li>
                          <li>✓ Independent scaling for frontend and backend</li>
                          <li>✓ Backend has full access to FFmpeg and system resources</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Architecture Overview */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaCogs style={styles.sectionIcon} />
            Technology Stack & Architecture
          </div>

          <div style={styles.featuresList}>
            <div style={styles.featureCard}>
              <div style={styles.featureTitle}>
                <FaRocket /> Frontend
              </div>
              <div style={styles.featureList}>
                <strong>Framework:</strong> React 18 + Vite
                <br />
                <strong>Hosting:</strong> Vercel (CDN)
                <br />
                <strong>Routing:</strong> React Router v6
                <br />
                <strong>State:</strong> Context API
                <br />
                <strong>Icons:</strong> React Icons
              </div>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureTitle}>
                <FaServer /> Backend
              </div>
              <div style={styles.featureList}>
                <strong>Runtime:</strong> Node.js
                <br />
                <strong>Framework:</strong> Express
                <br />
                <strong>Video:</strong> FFmpeg
                <br />
                <strong>Streaming:</strong> HLS
                <br />
                <strong>Auth:</strong> JWT
              </div>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureTitle}>
                <FaDatabase /> Database & Storage
              </div>
              <div style={styles.featureList}>
                <strong>Database:</strong> MongoDB
                <br />
                <strong>Streams:</strong> m3u8 + .ts files
                <br />
                <strong>Metadata:</strong> User & video info
                <br />
                <strong>Progress:</strong> Watch history
                <br />
                <strong>Auth:</strong> User credentials
              </div>
            </div>
          </div>
        </section>

        {/* Development Timeline */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaClock style={styles.sectionIcon} />
            Development Journey
          </div>

          <div style={styles.architectureSection}>
            <div style={styles.timelineItem}>
              <div style={styles.timelineNumber}>1</div>
              <div style={styles.timelineContent}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Initial Approach: Full-Stack on Vercel
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text)', lineHeight: '1.6' }}>
                  Attempted to deploy entire application (frontend + backend video processing) on Vercel serverless platform. 
                  Encountered 15-minute timeout limits and no subprocess access for FFmpeg.
                </p>
              </div>
            </div>

            <div style={styles.timelineItem}>
              <div style={styles.timelineNumber}>2</div>
              <div style={styles.timelineContent}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Discovery Phase: Serverless Limitations
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text)', lineHeight: '1.6' }}>
                  Identified fundamental constraints: no long-running processes, limited memory/CPU, no file persistence, 
                  50MB Lambda size limit. Video transcoding impossible in serverless environment.
                </p>
              </div>
            </div>

            <div style={styles.timelineItem}>
              <div style={styles.timelineNumber}>3</div>
              <div style={styles.timelineContent}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Solution: Backend Separation
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text)', lineHeight: '1.6' }}>
                  Separated frontend and backend deployments. Frontend stays on Vercel (content delivery), 
                  backend moves to Node.js server (video processing). Each layer optimized for its specific role.
                </p>
              </div>
            </div>

            <div style={styles.timelineItem}>
              <div style={styles.timelineNumber}>4</div>
              <div style={styles.timelineContent}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Optimization: Resolution Limiting
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text)', lineHeight: '1.6' }}>
                  Limited maximum resolution to 720p. Achieved 90% reduction in processing time (4-8h to 15-25m), 
                  reduced file corruption issues, maintained high quality for educational content.
                </p>
              </div>
            </div>

            <div style={styles.timelineItem}>
              <div style={styles.timelineNumber}>5</div>
              <div style={styles.timelineContent}>
                <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Production Ready
                </div>
                <p style={{ fontSize: '13px', color: 'var(--color-text)', lineHeight: '1.6' }}>
                  Deployed frontend on Vercel, backend on Node.js server. System handles adaptive HLS streaming 
                  with 3 quality levels (360p, 480p, 720p). Production-ready and scalable architecture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaChartLine style={styles.sectionIcon} />
            Performance & Metrics
          </div>

          <div style={styles.featuresList}>
            <div style={styles.featureCard}>
              <div style={styles.featureTitle}>
                <FaClock /> Encoding Time (1-hour video)
              </div>
              <div style={styles.featureList}>
                <strong>720p:</strong> 15-25 minutes
                <br />
                <strong>480p:</strong> 8-12 minutes
                <br />
                <strong>360p:</strong> 3-5 minutes
                <br />
                <strong>Previous:</strong> 4-8 hours ❌
              </div>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureTitle}>
                <FaClock /> Bandwidth Usage (Streaming)
              </div>
              <div style={styles.featureList}>
                <strong>720p:</strong> 0.8-1.2 MB/s
                <br />
                <strong>480p:</strong> 0.4-0.6 MB/s
                <br />
                <strong>360p:</strong> 0.2-0.3 MB/s
                <br />
                <strong>Adaptive:</strong> Auto-quality ✓
              </div>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureTitle}>
                <FaDatabase /> Storage (Per 1-hour video)
              </div>
              <div style={styles.featureList}>
                <strong>All 3 Qualities:</strong> 2-3 GB
                <br />
                <strong>720p Only:</strong> 1.2-1.5 GB
                <br />
                <strong>M3U8 Playlists:</strong> ~100 KB
                <br />
                <strong>Segments:</strong> ~10 seconds each
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ marginBottom: '40px' }}>
          <div style={styles.ctaSection}>
            <div style={styles.ctaTitle}>Ready to Explore More?</div>
            <p style={styles.ctaText}>
              Check out the About page for my profile and project portfolio, 
              or explore the video library to see the streaming platform in action.
            </p>
            <div>
              <a href="/about" style={styles.linkButton}>
                <FaBook /> ABOUT ME
              </a>
              <a href="/videos" style={styles.linkButton}>
                <FaRocket /> VIDEOS
              </a>
              <a href="https://github.com/shakibkumnale" target="_blank" rel="noopener noreferrer" style={styles.linkButton}>
                <FaGithub /> GITHUB
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Documentation;
