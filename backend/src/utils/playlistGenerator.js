/**
 * Utility to generate master.m3u8 file for adaptive streaming
 * This creates the master playlist that references all quality levels
 */

import fs from 'fs';
import path from 'path';

/**
 * Generate master.m3u8 for adaptive streaming
 * @param {string} videoDir - Directory containing quality folders (480p, 720p, 1080p)
 * @param {array} qualities - Array of available qualities (e.g., ['480p', '720p', '1080p'])
 */
export const generateMasterPlaylist = (videoDir, qualities) => {
  // Define bandwidth and resolution for each quality
  const qualityInfo = {
    '480p': {
      bandwidth: 500000,
      resolution: '854x480'
    },
    '720p': {
      bandwidth: 1500000,
      resolution: '1280x720'
    },
    '1080p': {
      bandwidth: 4000000,
      resolution: '1920x1080'
    }
  };

  // Sort qualities from lowest to highest
  const sortedQualities = qualities.sort((a, b) => {
    return parseInt(a) - parseInt(b);
  });

  // Generate master playlist content
  let content = '#EXTM3U\n';
  content += '#EXT-X-VERSION:3\n';
  content += '#EXT-X-INDEPENDENT-SEGMENTS\n\n';

  // Add stream information for each quality
  sortedQualities.forEach((quality) => {
    if (qualityInfo[quality]) {
      const info = qualityInfo[quality];
      content += `#EXT-X-STREAM-INF:BANDWIDTH=${info.bandwidth},RESOLUTION=${info.resolution}\n`;
      content += `${quality}/playlist.m3u8\n\n`;
    }
  });

  // Write master.m3u8 file
  const masterPath = path.join(videoDir, 'master.m3u8');
  fs.writeFileSync(masterPath, content);

  console.log(`Master playlist created at: ${masterPath}`);
  return masterPath;
};

/**
 * Generate quality playlist (.m3u8) file
 * @param {string} qualityDir - Directory for specific quality
 * @param {number} segmentCount - Number of .ts segments
 * @param {number} segmentDuration - Duration of each segment in seconds
 */
export const generateQualityPlaylist = (qualityDir, segmentCount, segmentDuration = 10) => {
  let content = '#EXTM3U\n';
  content += '#EXT-X-VERSION:3\n';
  content += `#EXT-X-TARGETDURATION:${segmentDuration}\n`;
  content += '#EXT-X-MEDIA-SEQUENCE:0\n';

  // Add all segments
  for (let i = 0; i < segmentCount; i++) {
    const segmentName = `segment-${String(i).padStart(3, '0')}.ts`;
    content += `#EXTINF:${segmentDuration}.0,\n`;
    content += `${segmentName}\n`;
  }

  content += '#EXT-X-ENDLIST\n';

  // Write playlist file
  const playlistPath = path.join(qualityDir, 'playlist.m3u8');
  fs.writeFileSync(playlistPath, content);

  console.log(`Quality playlist created at: ${playlistPath}`);
  return playlistPath;
};

/**
 * Initialize HLS directory structure
 * @param {string} videoId - Unique video identifier
 * @param {array} qualities - Array of qualities to create
 */
export const initializeHLSStructure = (videoId, qualities = ['480p', '720p', '1080p']) => {
  const uploadsDir = path.join(process.cwd(), 'uploads');
  const videoDir = path.join(uploadsDir, videoId);

  // Create video directory
  if (!fs.existsSync(videoDir)) {
    fs.mkdirSync(videoDir, { recursive: true });
  }

  // Create quality directories
  qualities.forEach(quality => {
    const qualityDir = path.join(videoDir, quality);
    if (!fs.existsSync(qualityDir)) {
      fs.mkdirSync(qualityDir, { recursive: true });
    }
  });

  console.log(`HLS structure created for video: ${videoId}`);
  return videoDir;
};

/**
 * Complete workflow: Initialize structure and generate playlists
 */
export const setupAdaptiveStream = (videoId, qualities, segmentCounts) => {
  const videoDir = initializeHLSStructure(videoId, qualities);

  // Generate quality playlists
  qualities.forEach((quality, index) => {
    const qualityDir = path.join(videoDir, quality);
    const segmentCount = segmentCounts[index] || 12; // default 12 segments
    generateQualityPlaylist(qualityDir, segmentCount);
  });

  // Generate master playlist
  generateMasterPlaylist(videoDir, qualities);

  console.log(`Adaptive stream setup complete for: ${videoId}`);
  return videoDir;
};

export default {
  generateMasterPlaylist,
  generateQualityPlaylist,
  initializeHLSStructure,
  setupAdaptiveStream
};
