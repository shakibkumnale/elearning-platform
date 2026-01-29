import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaExternalLinkAlt,
  FaExclamationTriangle,
  FaCogs,
  FaCheckCircle,
  FaServer,
  FaFileAlt,
  FaCode,
  FaUser,
  FaProjectDiagram,
  FaBriefcase,
} from 'react-icons/fa';

const About = () => {
  const profileImage = '/stkdp.png';
  
  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/shakibkumnale resume.pdf';
    link.download = 'Shakib_Kumnale_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
    section: {
      marginBottom: '60px',
    },
    sectionTitle: {
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '30px',
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: 'var(--color-text)',
      borderBottom: 'var(--border)',
      paddingBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    titleIcon: {
      fontSize: '32px',
      color: 'var(--color-primary)',
    },
    profileHeader: {
      display: 'flex',
      gap: '30px',
      alignItems: 'flex-start',
      marginBottom: '40px',
      backgroundColor: 'var(--color-white)',
      border: 'var(--border)',
      boxShadow: 'var(--shadow)',
      padding: '30px',
    },
    profileImage: {
      width: '200px',
      height: '200px',
      borderRadius: '0px',
      border: '3px solid var(--color-primary)',
      boxShadow: 'var(--shadow)',
      flexShrink: 0,
      objectFit: 'cover',
    },
    profileInfo: {
      flex: 1,
    },
    profileName: {
      fontSize: '32px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: '8px',
      color: 'var(--color-text)',
    },
    profileTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: 'var(--color-primary)',
      textTransform: 'uppercase',
    },
    profileLocation: {
      fontSize: '14px',
      marginBottom: '20px',
      color: 'var(--color-text)',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    resumeButton: {
      padding: '12px 24px',
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
      border: 'var(--border)',
      boxShadow: 'var(--shadow)',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      transition: 'all 0.2s ease',
      marginBottom: '15px',
    },
    card: {
      backgroundColor: 'var(--color-white)',
      border: 'var(--border)',
      boxShadow: 'var(--shadow)',
      padding: '30px',
      marginBottom: '20px',
      transition: 'all 0.2s ease',
    },
    cardHover: {
      transform: 'translate(-3px, -3px)',
      boxShadow: 'var(--shadow-hover)',
    },
    aboutMeContent: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      alignItems: 'start',
    },
    aboutText: {
      lineHeight: '1.8',
      fontSize: '16px',
      color: 'var(--color-text)',
    },
    highlightBox: {
      backgroundColor: 'var(--color-accent)',
      border: 'var(--border)',
      boxShadow: 'var(--shadow)',
      padding: '20px',
      marginTop: '15px',
    },
    contactGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    contactCard: {
      backgroundColor: 'var(--color-white)',
      border: 'var(--border)',
      boxShadow: 'var(--shadow)',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    contactIcon: {
      fontSize: '32px',
      marginBottom: '12px',
      color: 'var(--color-primary)',
    },
    contactLabel: {
      fontWeight: 'bold',
      marginBottom: '8px',
      textTransform: 'uppercase',
      fontSize: '12px',
      letterSpacing: '1px',
    },
    contactValue: {
      fontSize: '16px',
      color: 'var(--color-text)',
      wordBreak: 'break-all',
    },
    problemCard: {
      backgroundColor: '#fff3cd',
      border: '3px solid #ff6b6b',
      boxShadow: '4px 4px 0px var(--color-text)',
      padding: '25px',
      marginBottom: '20px',
      position: 'relative',
      paddingLeft: '60px',
    },
    problemIcon: {
      position: 'absolute',
      left: '20px',
      top: '20px',
      fontSize: '28px',
      color: '#ff6b6b',
    },
    problemTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    problemDesc: {
      fontSize: '14px',
      marginBottom: '12px',
      lineHeight: '1.6',
    },
    solutionBox: {
      backgroundColor: '#d4edda',
      border: '3px solid #4ecdc4',
      padding: '15px',
      marginTop: '12px',
      display: 'flex',
      gap: '10px',
      alignItems: 'flex-start',
    },
    solutionIcon: {
      fontSize: '20px',
      color: '#4ecdc4',
      marginTop: '2px',
      flexShrink: 0,
    },
    linkButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-white)',
      border: 'var(--border)',
      boxShadow: 'var(--shadow)',
      cursor: 'pointer',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: 'bold',
      transition: 'all 0.2s ease',
      marginRight: '10px',
      marginTop: '10px',
    },
    portGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '20px',
    },
    portItem: {
      backgroundColor: 'var(--color-white)',
      border: 'var(--border)',
      boxShadow: 'var(--shadow)',
      padding: '20px',
      transition: 'all 0.2s ease',
    },
    portTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '10px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    portDesc: {
      fontSize: '14px',
      marginBottom: '15px',
      color: 'var(--color-text)',
      lineHeight: '1.5',
    },
    techStack: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '10px',
    },
    techTag: {
      backgroundColor: 'var(--color-secondary)',
      color: 'var(--color-white)',
      padding: '4px 12px',
      fontSize: '12px',
      fontWeight: 'bold',
      border: '2px solid var(--color-text)',
    },
    deploymentGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '20px',
    },
    deploymentBox: {
      backgroundColor: 'var(--color-white)',
      border: 'var(--border)',
      boxShadow: 'var(--shadow)',
      padding: '20px',
    },
    deploymentTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      marginBottom: '12px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    deploymentList: {
      fontSize: '14px',
      lineHeight: '1.8',
    },
    deploymentItem: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      marginBottom: '8px',
    },
    checkIcon: {
      color: '#4ecdc4',
      marginTop: '3px',
      flexShrink: 0,
    },
    highlightText: {
      fontWeight: 'bold',
      color: 'var(--color-primary)',
    },
    experienceItem: {
      marginBottom: '20px',
    },
    responsiveAdjust: {
      '@media (max-width: 768px)': {
        profileHeader: {
          flexDirection: 'column',
          textAlign: 'center',
        },
        aboutMeContent: {
          gridTemplateColumns: '1fr',
        },
        deploymentGrid: {
          gridTemplateColumns: '1fr',
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Profile Header */}
        <div style={styles.profileHeader}>
          <img src={profileImage} alt="Shakib Kumnale" style={styles.profileImage} />
          <div style={styles.profileInfo}>
            <div style={styles.profileName}>Shakib Kumnale</div>
            <div style={styles.profileTitle}>🚀 Full Stack Developer & Founder</div>
            <div style={styles.profileLocation}>
              <FaEnvelope /> Thane, Maharashtra 400601
            </div>
            <div style={styles.profileLocation}>
              <FaPhone /> +91 82911 21080
            </div>
            <div style={styles.profileLocation}>
              <FaEnvelope /> shakibkumnali@gmail.com
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.6', marginTop: '15px', color: 'var(--color-text)' }}>
              Dedicated Full Stack Developer with <strong>1+ years experience</strong> specializing in MERN stack. Founder of 
              <strong> Soul Distribution</strong>, a music distribution agency. Passionate about building scalable, user-centric 
              web applications and exploring Next.js to enhance frontend capabilities. Thrive on solving real-world problems 
              through impactful digital solutions.
            </p>
            <button 
              onClick={handleResumeDownload}
              style={styles.resumeButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
            >
              📄 DOWNLOAD RESUME
            </button>
          </div>
        </div>

        {/* About Me Section */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaUser style={styles.titleIcon} />
            ABOUT ME
          </div>
          <div style={styles.card}>
            <div style={styles.aboutMeContent}>
              <div>
                <p style={styles.aboutText}>
                  I'm Shakib Kumnale, a dedicated Full Stack Developer with a passion for creating innovative digital solutions. 
                  With hands-on experience in the MERN stack and emerging technologies, I've built multiple projects ranging from 
                  AI-powered applications to music distribution platforms.
                </p>
                <p style={{ ...styles.aboutText, marginTop: '15px' }}>
                  Currently exploring <strong>Next.js</strong> to enhance my frontend development capabilities and stay ahead of 
                  modern web technologies. As founder of <strong>Soul Distribution</strong>, I combine technical expertise with 
                  entrepreneurial vision to solve real-world problems.
                </p>
                <div style={styles.highlightBox}>
                  <strong>📊 Quick Stats:</strong>
                  <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
                    <li><strong>1+ Years</strong> of professional experience</li>
                    <li><strong>7+ Projects</strong> built & deployed</li>
                    <li><strong>Finalist</strong> in SuperMind Hackathon (500 selected from 22,000)</li>
                    <li><strong>Learning Mindset</strong> - Certified in Python, Cybersecurity, Tkinter</li>
                  </ul>
                </div>
              </div>

              <div>
                <div style={styles.highlightBox}>
                  <strong style={{ fontSize: '18px' }}>Technical Skills</strong>
                  <div style={styles.techStack}>
                    <span style={styles.techTag}>React</span>
                    <span style={styles.techTag}>Next.js</span>
                    <span style={styles.techTag}>Node.js</span>
                    <span style={styles.techTag}>Express</span>
                  </div>
                  <div style={styles.techStack}>
                    <span style={styles.techTag}>MongoDB</span>
                    <span style={styles.techTag}>TypeScript</span>
                    <span style={styles.techTag}>Tailwind CSS</span>
                    <span style={styles.techTag}>REST APIs</span>
                  </div>
                  <div style={styles.techStack}>
                    <span style={styles.techTag}>JavaScript</span>
                    <span style={styles.techTag}>Git/GitHub</span>
                    <span style={styles.techTag}>AI APIs</span>
                    <span style={styles.techTag}>Full-Stack Dev</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaEnvelope style={styles.titleIcon} />
            GET IN TOUCH
          </div>
          <div style={styles.contactGrid}>
            <a
              href="mailto:shakibkumnali@gmail.com"
              style={{ ...styles.contactCard, textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
            >
              <div style={styles.contactIcon}>
                <FaEnvelope />
              </div>
              <div style={styles.contactLabel}>Email</div>
              <div style={styles.contactValue}>shakibkumnali@gmail.com</div>
            </a>

            <a
              href="tel:+918291121080"
              style={{ ...styles.contactCard, textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
            >
              <div style={styles.contactIcon}>
                <FaPhone />
              </div>
              <div style={styles.contactLabel}>Phone</div>
              <div style={styles.contactValue}>+91 82911 21080</div>
            </a>

            <a
              href="https://github.com/shakibkumnale"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.contactCard, textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
            >
              <div style={styles.contactIcon}>
                <FaGithub />
              </div>
              <div style={styles.contactLabel}>GitHub</div>
              <div style={styles.contactValue}>github.com/shakibkumnale</div>
            </a>

            <a
              href="https://www.linkedin.com/in/shakibkumnale/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.contactCard, textDecoration: 'none', color: 'inherit' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-2px, -2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}
            >
              <div style={styles.contactIcon}>
                <FaLinkedin />
              </div>
              <div style={styles.contactLabel}>LinkedIn</div>
              <div style={styles.contactValue}>linkedin.com/in/shakibkumnale</div>
            </a>
          </div>
        </section>

        {/* Work Experience Section */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaBriefcase style={styles.titleIcon} />
            WORK EXPERIENCE
          </div>
          
          <div style={styles.card}>
            <div style={styles.experienceItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>Software Engineer Trainee</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-primary)', fontWeight: 'bold' }}>Inogic</div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text)', textAlign: 'right' }}>
                  Aug 2025 - Nov 2025 (Full-time)
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.6' }}>
                Inogic delivers innovative productivity apps to enhance Dynamics 365 CRM and Power Platform performance. 
                Contributing to building scalable solutions for enterprise clients.
              </p>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.experienceItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>Full Stack Developer</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-primary)', fontWeight: 'bold' }}>Apitos Technologies</div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text)', textAlign: 'right' }}>
                  Oct 2024 - Jun 2025 (Full-time)
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.6' }}>
                Navi Mumbai-based startup specializing in web development, digital marketing, and AI chatbot solutions. 
                Contributed to end-to-end development across the technology stack, building scalable web applications 
                and intelligent digital solutions. <strong>Website:</strong> https://apitos.in
              </p>
            </div>
          </div>

          <div style={styles.card}>
            <div style={styles.experienceItem}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>IT Officer</div>
                  <div style={{ fontSize: '14px', color: 'var(--color-primary)', fontWeight: 'bold' }}>iPolitycal</div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text)', textAlign: 'right' }}>
                  Jun 2024 - Oct 2024 (Full-time)
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.6' }}>
                Political consulting, policy development, and leadership training company managing election campaigns 
                both on-ground and digitally for candidate success.
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaProjectDiagram style={styles.titleIcon} />
            PROJECTS & PORTFOLIO
          </div>
          <div style={styles.portGrid}>
            <div style={styles.portItem}>
              <div style={styles.portTitle}>Ask Baba Saheb</div>
              <div style={styles.portDesc}>
                RAG-based Q&A system answering queries from Dr. B.R. Ambedkar's Volume 1 using Retrieval-Augmented Generation 
                and DeepSeek AI's LLM for enhanced contextual accuracy.
              </div>
              <div style={styles.techStack}>
                <span style={styles.techTag}>MERN</span>
                <span style={styles.techTag}>RAG</span>
                <span style={styles.techTag}>DeepSeek AI</span>
              </div>
            </div>

            <div style={styles.portItem}>
              <div style={styles.portTitle}>AVAZ</div>
              <div style={styles.portDesc}>
                AI-powered voice assistant capable of answering questions, generating images/audio, and performing chat-based 
                interactions. Features JWT authentication, voice command support, and multi-API integration.
              </div>
              <div style={styles.techStack}>
                <span style={styles.techTag}>MERN</span>
                <span style={styles.techTag}>OpenAI API</span>
                <span style={styles.techTag}>Hugging Face</span>
              </div>
            </div>

            <div style={styles.portItem}>
              <div style={styles.portTitle}>SoulDistribution</div>
              <div style={styles.portDesc}>
                Web platform for independent music distribution and artist management. My own startup venture enabling 
                artists to distribute music globally.
              </div>
              <div style={styles.techStack}>
                <span style={styles.techTag}>Next.js</span>
                <span style={styles.techTag}>Vercel</span>
                <span style={styles.techTag}>Music API</span>
              </div>
              <a href="http://souldistribution.vercel.app/" target="_blank" rel="noopener noreferrer" 
                 style={{...styles.linkButton, marginTop: '10px'}}>
                <FaExternalLinkAlt /> VISIT SITE
              </a>
            </div>

            <div style={styles.portItem}>
              <div style={styles.portTitle}>Label Padega India</div>
              <div style={styles.portDesc}>
                Mobile food label analyzer that scans and analyzes food labels from images to provide instant health insights 
                and flag misleading nutritional information.
              </div>
              <div style={styles.techStack}>
                <span style={styles.techTag}>React Native</span>
                <span style={styles.techTag}>Image Processing</span>
                <span style={styles.techTag}>Health API</span>
              </div>
            </div>

            <div style={styles.portItem}>
              <div style={styles.portTitle}>SHAKA BANK</div>
              <div style={styles.portDesc}>
                Digital banking interface prototype focusing on intuitive UI/UX and basic banking features. Demonstrates 
                modern banking app design principles.
              </div>
              <div style={styles.techStack}>
                <span style={styles.techTag}>MERN</span>
                <span style={styles.techTag}>Banking Logic</span>
                <span style={styles.techTag}>UI/UX</span>
              </div>
            </div>

            <div style={styles.portItem}>
              <div style={styles.portTitle}>My Loan</div>
              <div style={styles.portDesc}>
                Loan management application enabling loan tracking, EMI calculation, borrower profiling, interest computation, 
                and daily collections for money lenders.
              </div>
              <div style={styles.techStack}>
                <span style={styles.techTag}>React Native</span>
                <span style={styles.techTag}>Node.js</span>
                <span style={styles.techTag}>MongoDB</span>
              </div>
            </div>

            <div style={styles.portItem}>
              <div style={styles.portTitle}>Quizy</div>
              <div style={styles.portDesc}>
                Online quiz application for interactive learning and assessment. Features multiple question types, 
                score tracking, and user analytics.
              </div>
              <div style={styles.techStack}>
                <span style={styles.techTag}>React</span>
                <span style={styles.techTag}>Node.js</span>
                <span style={styles.techTag}>MongoDB</span>
              </div>
              <a href="https://github.com/shakibkumnale" target="_blank" rel="noopener noreferrer" 
                 style={{...styles.linkButton, marginTop: '10px'}}>
                <FaGithub /> VIEW CODE
              </a>
            </div>

            <div style={styles.portItem}>
              <div style={styles.portTitle}>Portfolio Website</div>
              <div style={styles.portDesc}>
                Personal portfolio showcasing all projects and technical expertise. Built with modern web technologies 
                and optimized for performance.
              </div>
              <div style={styles.techStack}>
                <span style={styles.techTag}>Next.js</span>
                <span style={styles.techTag}>Vercel</span>
                <span style={styles.techTag}>Responsive</span>
              </div>
              <a href="https://kumnaleshakib.vercel.app/" target="_blank" rel="noopener noreferrer" 
                 style={{...styles.linkButton, marginTop: '10px'}}>
                <FaExternalLinkAlt /> VISIT PORTFOLIO
              </a>
            </div>
          </div>
        </section>

        {/* Achievements & Certifications */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaCheckCircle style={styles.titleIcon} />
            ACHIEVEMENTS & CERTIFICATIONS
          </div>
          
          <div style={styles.card}>
            <div style={{ marginBottom: '25px' }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-primary)' }}>
                🏆 AWARDS
              </div>
              <div style={styles.deploymentItem}>
                <FaCheckCircle style={styles.checkIcon} />
                <div>
                  <strong>Finalist, SuperMind Hackathon</strong> - January 2025
                  <p style={{ fontSize: '13px', color: 'var(--color-text)', marginTop: '4px' }}>
                    Selected among 500 participants out of 22,000 all-India applicants. Reached final round with innovative solution.
                  </p>
                </div>
              </div>
              <div style={styles.deploymentItem}>
                <FaCheckCircle style={styles.checkIcon} />
                <div>
                  <strong>2nd Place - Escape Room Event</strong> - February 2024
                  <p style={{ fontSize: '13px', color: 'var(--color-text)', marginTop: '4px' }}>
                    College event competition. Demonstrated problem-solving and team collaboration skills.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px', color: 'var(--color-primary)' }}>
                📜 CERTIFICATIONS
              </div>
              <div style={styles.deploymentItem}>
                <FaCheckCircle style={styles.checkIcon} />
                <span><strong>iBase Certification</strong> - Tkinter & Turtle in Python (Jan 2024 - Present)</span>
              </div>
              <div style={styles.deploymentItem}>
                <FaCheckCircle style={styles.checkIcon} />
                <span><strong>Cyber Security Certification</strong> - Course (Dec 2023 - Present)</span>
              </div>
              <div style={styles.deploymentItem}>
                <FaCheckCircle style={styles.checkIcon} />
                <span><strong>Python Coding Workshop</strong> - (Oct 2023 - Present)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaFileAlt style={styles.titleIcon} />
            EDUCATION
          </div>
          
          <div style={styles.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  Bachelor of Technology in Information Technology
                </div>
                <div style={{ fontSize: '14px', color: 'var(--color-primary)', fontWeight: 'bold', marginTop: '5px' }}>
                  University of Mumbai
                </div>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-text)', textAlign: 'right' }}>
                Jun 2021 - Present
              </div>
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: '1.6' }}>
              Pursuing Bachelor's degree in Information Technology from University of Mumbai. Location: Thane, Maharashtra.
              Actively engaged in academic projects, hackathons, and technical workshops.
            </p>
          </div>
        </section>

        {/* Languages Section */}
        <section style={styles.section}>
          <div style={styles.sectionTitle}>
            <FaUser style={styles.titleIcon} />
            LANGUAGES
          </div>
          
          <div style={styles.card}>
            <div style={styles.contactGrid}>
              <div style={{ ...styles.contactCard, textAlign: 'left' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Hindi</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text)' }}>Expert Level</div>
              </div>
              <div style={{ ...styles.contactCard, textAlign: 'left' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>English</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text)' }}>Native Speaker</div>
              </div>
              <div style={{ ...styles.contactCard, textAlign: 'left' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>Marathi</div>
                <div style={{ fontSize: '14px', color: 'var(--color-text)' }}>Expert Level</div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section style={styles.section}>
          <div
            style={{
              ...styles.card,
              textAlign: 'center',
              backgroundColor: 'var(--color-secondary)',
              color: 'var(--color-white)',
            }}
          >
            <h3 style={{ fontSize: '28px', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '2px' }}>
              Ready to Collaborate?
            </h3>
            <p style={{ marginBottom: '25px', fontSize: '16px', lineHeight: '1.6' }}>
              I'm always interested in hearing about new projects and opportunities. Feel free to reach out via email or connect on social media.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="mailto:shakibkumnali@gmail.com" 
                style={{...styles.linkButton, color: 'var(--color-text)'}}
              >
                📧 SEND EMAIL
              </a>
              <a 
                href="https://github.com/shakibkumnale" 
                target="_blank"
                rel="noopener noreferrer"
                style={{...styles.linkButton, color: 'var(--color-text)'}}
              >
                🔗 GITHUB
              </a>
              <a 
                href="https://www.linkedin.com/in/shakibkumnale/" 
                target="_blank"
                rel="noopener noreferrer"
                style={{...styles.linkButton, color: 'var(--color-text)'}}
              >
                💼 LINKEDIN
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
