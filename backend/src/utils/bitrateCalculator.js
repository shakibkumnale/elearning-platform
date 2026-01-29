export const calculateBitrate = (fileSize, duration) => {
  // fileSize in MB, duration in seconds
  // bitrate = (fileSize * 8 * 1024) / duration (in kbps)
  if (!fileSize || !duration || duration === 0) {
    throw new Error('Invalid input parameters');
  }
  
  const fileSizeInKb = fileSize * 1024;
  const fileSizeInBits = fileSizeInKb * 8;
  const bitrateKbps = fileSizeInBits / duration;
  
  return {
    bitrateKbps: Math.round(bitrateKbps * 100) / 100,
    bitrateMbps: Math.round((bitrateKbps / 1024) * 100) / 100
  };
};

export const calculateFileSize = (bitrate, duration) => {
  // bitrate in kbps, duration in seconds
  // fileSize = (bitrate * duration) / (8 * 1024) (in MB)
  if (!bitrate || !duration || duration === 0) {
    throw new Error('Invalid input parameters');
  }
  
  const fileSizeInBits = bitrate * duration;
  const fileSizeInKb = fileSizeInBits / 8;
  const fileSizeInMb = fileSizeInKb / 1024;
  
  return {
    fileSizeMB: Math.round(fileSizeInMb * 100) / 100,
    fileSizeGB: Math.round((fileSizeInMb / 1024) * 100) / 100
  };
};

export const estimateBitrateFromResolution = (width, height, frameRate = 30, quality = 'medium') => {
  // Rough estimation based on common encoding practices
  const pixels = width * height;
  const pixelsPerSecond = pixels * frameRate;
  
  let bitsPerPixel;
  
  switch (quality) {
    case 'low':
      bitsPerPixel = 0.05;
      break;
    case 'medium':
      bitsPerPixel = 0.1;
      break;
    case 'high':
      bitsPerPixel = 0.15;
      break;
    default:
      bitsPerPixel = 0.1;
  }
  
  const bitrateKbps = (pixelsPerSecond * bitsPerPixel) / 1000;
  
  return {
    bitrateKbps: Math.round(bitrateKbps * 100) / 100,
    bitrateMbps: Math.round((bitrateKbps / 1024) * 100) / 100,
    resolution: `${width}x${height}`,
    frameRate,
    quality
  };
};

export const compareBitrates = (bitrate1, bitrate2, duration) => {
  const size1 = calculateFileSize(bitrate1, duration);
  const size2 = calculateFileSize(bitrate2, duration);
  
  const difference = Math.abs(size1.fileSizeMB - size2.fileSizeMB);
  const percentageDiff = ((difference / size1.fileSizeMB) * 100).toFixed(2);
  
  return {
    bitrate1: {
      bitrateKbps: bitrate1,
      fileSize: size1
    },
    bitrate2: {
      bitrateKbps: bitrate2,
      fileSize: size2
    },
    difference: {
      sizeDifferenceMB: Math.round(difference * 100) / 100,
      percentageDifference: percentageDiff
    }
  };
};
