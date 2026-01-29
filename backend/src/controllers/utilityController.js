import { 
  calculateBitrate, 
  calculateFileSize, 
  estimateBitrateFromResolution, 
  compareBitrates 
} from '../utils/bitrateCalculator.js';

export const calculateVideoBitrate = async (req, res) => {
  try {
    const { fileSize, duration } = req.body;
    
    if (!fileSize || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide fileSize (in MB) and duration (in seconds)'
      });
    }
    
    const result = calculateBitrate(fileSize, duration);
    
    res.status(200).json({
      success: true,
      data: {
        input: {
          fileSizeMB: fileSize,
          durationSeconds: duration
        },
        result
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const calculateVideoFileSize = async (req, res) => {
  try {
    const { bitrate, duration } = req.body;
    
    if (!bitrate || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide bitrate (in kbps) and duration (in seconds)'
      });
    }
    
    const result = calculateFileSize(bitrate, duration);
    
    res.status(200).json({
      success: true,
      data: {
        input: {
          bitrateKbps: bitrate,
          durationSeconds: duration
        },
        result
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const estimateBitrate = async (req, res) => {
  try {
    const { width, height, frameRate, quality } = req.body;
    
    if (!width || !height) {
      return res.status(400).json({
        success: false,
        message: 'Please provide width and height'
      });
    }
    
    const result = estimateBitrateFromResolution(
      parseInt(width), 
      parseInt(height), 
      parseInt(frameRate) || 30, 
      quality || 'medium'
    );
    
    res.status(200).json({
      success: true,
      data: {
        input: {
          width: parseInt(width),
          height: parseInt(height),
          frameRate: parseInt(frameRate) || 30,
          quality: quality || 'medium'
        },
        result
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const compareTwoBitrates = async (req, res) => {
  try {
    const { bitrate1, bitrate2, duration } = req.body;
    
    if (!bitrate1 || !bitrate2 || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide bitrate1, bitrate2 (in kbps) and duration (in seconds)'
      });
    }
    
    const result = compareBitrates(
      parseFloat(bitrate1), 
      parseFloat(bitrate2), 
      parseFloat(duration)
    );
    
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
