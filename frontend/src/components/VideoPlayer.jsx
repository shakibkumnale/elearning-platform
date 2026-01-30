
import { useRef, useEffect, useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer=({ videoUrl, videoType = "hls", onProgress })=> {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const [availableResolutions, setAvailableResolutions] = useState([]);
  const [currentResolution, setCurrentResolution] = useState("auto");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  /* ---------------- RESOLUTION DETECTION ---------------- */

  useEffect(() => {
    if (!videoUrl || videoType !== "hls") return;

    const detectResolutions = async () => {
      try {
        setIsLoading(true);

        const url = new URL(videoUrl);
        const parts = url.pathname.split("/");

        const videoId = parts[2]; // uploads/video-id/master.m3u8
        const basePath = `${url.origin}/uploads/${videoId}`;

        const options = [
          { label: "Auto", value: "auto" },
          { label: "360p", value: "360p" },
          { label: "480p", value: "480p" },
          { label: "720p", value: "720p" }
        ];

        const found = [{ label: "Auto", value: "auto" }];

        for (const r of options.slice(1)) {
          try {
            const test = await fetch(`${basePath}/${r.value}/playlist.m3u8`);
            if (test.ok) found.push(r);
          } catch {}
        }

        setAvailableResolutions(found);
        setCurrentResolution("auto");
      } finally {
        setIsLoading(false);
      }
    };

    detectResolutions();
  }, [videoUrl]);

  /* ---------------- PLAYER INIT ---------------- */

  useEffect(() => {
    if (!videoRef.current || !videoUrl || isLoading) return;

    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    const el = document.createElement("video-js");
    el.className = "video-js vjs-big-play-centered";
    videoRef.current.appendChild(el);

    const player = (playerRef.current = videojs(el, {
      controls: true,
      fluid: true,
      responsive: true,
      preload: "auto",
      sources: [
        {
          src: videoUrl,
          type: "application/x-mpegURL"
        }
      ]
    }));

    player.on("error", () => {
      setError(player.error()?.message || "Playback error");
    });

    if (onProgress) {
      player.on("timeupdate", () =>
        onProgress({
          currentTime: player.currentTime(),
          duration: player.duration()
        })
      );
    }

    return () => {
      if (player && !player.isDisposed()) player.dispose();
    };
  }, [videoUrl, isLoading]);

  /* ---------------- QUALITY SWITCH ---------------- */

  const handleResolutionChange = (res) => {
    const player = playerRef.current;
    if (!player) return;

    const url = new URL(videoUrl);
    const parts = url.pathname.split("/");
    const videoId = parts[2];
    const base = `${url.origin}/uploads/${videoId}`;

    const src =
      res === "auto"
        ? `${base}/master.m3u8`
        : `${base}/${res}/playlist.m3u8`;

    const time = player.currentTime();
    const paused = player.paused();

    player.src({ src, type: "application/x-mpegURL" });

    player.one("loadedmetadata", () => {
      player.currentTime(time);
      if (!paused) player.play();
    });

    setCurrentResolution(res);
  };

  if (error) return <div>⚠ {error}</div>;
  if (isLoading) return <div>Loading video…</div>;

  return (
    <div style={{ position: "relative" }}>
      {availableResolutions.length > 1 && (
        <div
          style={styles.qualityContainer}
          onMouseEnter={() => setShowQualityMenu(true)}
          onMouseLeave={() => setShowQualityMenu(false)}
        >
          <div style={styles.settingsIcon}>
            ⚙️
          </div>
          {showQualityMenu && (
            <div style={styles.resolutionSelector}>
              <div style={styles.resolutionLabel}>QUALITY</div>
              <div style={styles.resolutionButtons}>
                {availableResolutions.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => handleResolutionChange(r.value)}
                    className="quality-btn"
                    style={{
                      ...styles.resolutionButton,
                      ...(currentResolution === r.value
                        ? styles.resolutionButtonActive
                        : {})
                    }}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
    backgroundColor: 'var(--color-black)',
    border: 'var(--border)',
    boxShadow: 'var(--shadow)',
    overflow: 'hidden',
    position: 'relative'
  },
  playerWrapper: {
    width: '100%'
  },
  qualityContainer: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    zIndex: 10,
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px'
  },
  settingsIcon: {
    width: '40px',
    height: '40px',
    padding: '8px',
    backgroundColor: 'var(--color-white)',
    border: 'var(--border)',
    fontSize: '18px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'var(--shadow)',
    transition: 'all 0.2s ease',
    fontWeight: 700
  },
  resolutionSelector: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '8px',
    backgroundColor: 'var(--color-white)',
    padding: '12px',
    border: 'var(--border)',
    boxShadow: 'var(--shadow)',
    minWidth: '120px'
  },
  resolutionLabel: {
    color: 'var(--color-text)',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '1.5px',
    marginBottom: '4px',
    width: '100%',
    textAlign: 'right'
  },
  resolutionButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    width: '100%'
  },
  resolutionButton: {
    padding: '8px 16px',
    backgroundColor: 'var(--color-white)',
    color: 'var(--color-text)',
    border: 'var(--border)',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'all 0.2s ease',
    letterSpacing: '0.5px',
    textAlign: 'center',
    boxShadow: '2px 2px 0px var(--color-black)',
    width: '100%'
  },
  resolutionButtonActive: {
    backgroundColor: 'var(--color-primary)',
    borderColor: 'var(--color-black)',
    color: 'var(--color-white)',
    fontWeight: 700,
    boxShadow: '3px 3px 0px var(--color-black)',
    transform: 'translate(-1px, -1px)'
  },
  errorContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    padding: '40px',
    textAlign: 'center',
    backgroundColor: 'var(--color-primary)',
    border: 'var(--border)'
  },
  errorIcon: {
    fontSize: '72px',
    marginBottom: '16px'
  },
  errorTitle: {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--color-white)',
    marginBottom: '12px',
    letterSpacing: '2px',
    textTransform: 'uppercase'
  },
  errorText: {
    fontSize: '16px',
    fontWeight: 600,
    color: 'var(--color-white)',
    marginBottom: '8px',
    maxWidth: '500px'
  },
  errorHint: {
    fontSize: '14px',
    color: 'var(--color-white)',
    maxWidth: '400px',
    opacity: 0.9
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    padding: '40px',
    backgroundColor: 'var(--color-bg)'
  },
  loadingText: {
    fontSize: '14px',
    fontWeight: 600,
    color: 'var(--color-text)',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '16px'
  }
};

// Add custom styles for video.js to match neo-brutalism theme
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .video-js .vjs-big-play-button {
      border: var(--border) !important;
      background-color: var(--color-primary) !important;
      font-size: 3em !important;
      line-height: 2em !important;
      height: 2em !important;
      width: 2em !important;
      border-radius: 0 !important;
      box-shadow: var(--shadow) !important;
    }
    
    .video-js:hover .vjs-big-play-button,
    .video-js .vjs-big-play-button:focus {
      background-color: var(--color-secondary) !important;
      transform: translate(-2px, -2px);
      box-shadow: var(--shadow-hover) !important;
    }
    
    .video-js .vjs-control-bar {
      background-color: var(--color-white) !important;
      border-top: var(--border) !important;
    }
    
    .video-js .vjs-play-progress,
    .video-js .vjs-volume-level {
      background-color: var(--color-primary) !important;
    }
    
    .video-js .vjs-slider {
      background-color: var(--color-bg) !important;
    }
    
    .video-js .vjs-button > .vjs-icon-placeholder:before {
      color: var(--color-text) !important;
    }
    
    .video-js .vjs-time-control {
      color: var(--color-text) !important;
      font-weight: 600 !important;
    }
    
    .quality-btn {
      padding: 8px 16px;
      background-color: var(--color-white);
      color: var(--color-text);
      border: 2px solid var(--color-black);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.15s ease;
      letter-spacing: 0.5px;
      text-align: center;
      box-shadow: 2px 2px 0px var(--color-black);
      width: 100%;
    }
    
    .quality-btn:hover {
      transform: translate(-2px, -2px);
      box-shadow: 4px 4px 0px var(--color-black);
      background-color: #f0f0f0;
    }
    
    .quality-btn:active {
      transform: translate(1px, 1px);
      box-shadow: 1px 1px 0px var(--color-black);
    }
  `;
  
  if (!document.getElementById('video-player-custom-styles')) {
    styleSheet.id = 'video-player-custom-styles';
    document.head.appendChild(styleSheet);
  }
}

export default VideoPlayer;