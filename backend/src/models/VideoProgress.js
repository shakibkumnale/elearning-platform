import mongoose from 'mongoose';

const videoProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  watchedDuration: {
    type: Number,
    default: 0
  },
  totalDuration: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  lastWatchedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Compound index to ensure one progress record per user per video
videoProgressSchema.index({ user: 1, video: 1 }, { unique: true });

const VideoProgress = mongoose.model('VideoProgress', videoProgressSchema);

export default VideoProgress;
