import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  videoUrl: {
    type: String,
    required: [true, 'Please provide a video URL']
  },
  thumbnailUrl: {
    type: String,
    default: ''
  },
  videoType: {
    type: String,
    enum: ['mp4', 'hls'],
    default: 'hls'
  },
  duration: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
    default: 'General'
  },
  views: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  // Adaptive streaming configuration
  videoId: {
    type: String,
    unique: true,
    sparse: true
  },
  adaptiveStreamQualities: {
    type: [String],
    enum: ['480p', '720p', '1080p'],
    default: []
  },
  masterPlaylistUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Create index for search
videoSchema.index({ title: 'text', description: 'text', category: 'text' });

const Video = mongoose.model('Video', videoSchema);

export default Video;
