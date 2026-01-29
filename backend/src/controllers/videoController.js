import Video from '../models/Video.js';
import VideoProgress from '../models/VideoProgress.js';

export const getAllVideos = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 10 } = req.query;
    
    let query = { isPublished: true };
    
    // Search functionality
    if (search) {
      query.$text = { $search: search };
    }
    
    // Category filter
    if (category && category !== 'all') {
      query.category = category;
    }
    
    const skip = (page - 1) * limit;
    
    const videos = await Video.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Video.countDocuments(query);
    
    res.status(200).json({
      success: true,
      data: {
        videos,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('createdBy', 'name email');
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    
    // Increment views
    video.views += 1;
    await video.save();
    
    res.status(200).json({
      success: true,
      data: { video }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const createVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, videoType, duration, category } = req.body;
    
    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      videoType,
      duration,
      category,
      createdBy: req.user.id
    });
    
    res.status(201).json({
      success: true,
      message: 'Video created successfully',
      data: { video }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, videoType, duration, category, isPublished } = req.body;
    
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    
    // Update fields
    if (title) video.title = title;
    if (description) video.description = description;
    if (videoUrl) video.videoUrl = videoUrl;
    if (thumbnailUrl !== undefined) video.thumbnailUrl = thumbnailUrl;
    if (videoType) video.videoType = videoType;
    if (duration) video.duration = duration;
    if (category) video.category = category;
    if (isPublished !== undefined) video.isPublished = isPublished;
    
    await video.save();
    
    res.status(200).json({
      success: true,
      message: 'Video updated successfully',
      data: { video }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }
    
    await video.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Video deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const updateProgress = async (req, res) => {
  try {
    const { videoId, watchedDuration, totalDuration } = req.body;
    
    const completed = watchedDuration >= totalDuration * 0.9; // 90% watched = completed
    
    const progress = await VideoProgress.findOneAndUpdate(
      { user: req.user.id, video: videoId },
      {
        watchedDuration,
        totalDuration,
        completed,
        lastWatchedAt: Date.now()
      },
      { new: true, upsert: true }
    );
    
    res.status(200).json({
      success: true,
      data: { progress }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getProgress = async (req, res) => {
  try {
    const { videoId } = req.params;
    
    const progress = await VideoProgress.findOne({
      user: req.user.id,
      video: videoId
    });
    
    res.status(200).json({
      success: true,
      data: { progress }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Video.distinct('category');
    
    res.status(200).json({
      success: true,
      data: { categories }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get adaptive streaming URLs for a video
export const getStreamUrls = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findById(id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    if (video.videoType !== 'hls' || !video.videoId) {
      return res.status(400).json({
        success: false,
        message: 'Video does not support adaptive streaming'
      });
    }

    const baseUrl = process.env.API_URL || 'http://localhost:5000';
    const streamUrls = {
      masterPlaylist: `${baseUrl}/uploads/${video.videoId}/master.m3u8`,
      qualities: {}
    };

    // Add quality-specific playlists if available
    if (video.adaptiveStreamQualities && video.adaptiveStreamQualities.length > 0) {
      video.adaptiveStreamQualities.forEach(quality => {
        streamUrls.qualities[quality] = `${baseUrl}/uploads/${video.videoId}/${quality}/playlist.m3u8`;
      });
    }

    res.status(200).json({
      success: true,
      data: {
        video: {
          _id: video._id,
          id: video._id,
          title: video.title,
          description: video.description,
          duration: video.duration,
          thumbnail: video.thumbnailUrl,
          videoUrl: video.videoUrl,
          thumbnailUrl: video.thumbnailUrl,
          videoType: video.videoType,
          category: video.category,
          views: video.views,
          createdBy: video.createdBy,
          isPublished: video.isPublished,
          videoId: video.videoId,
          adaptiveStreamQualities: video.adaptiveStreamQualities,
          masterPlaylistUrl: video.masterPlaylistUrl,
          createdAt: video.createdAt,
          updatedAt: video.updatedAt
        },
        streamUrls
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update video stream metadata (for admin to set available qualities)
export const updateStreamMetadata = async (req, res) => {
  try {
    const { id } = req.params;
    const { videoId, adaptiveStreamQualities } = req.body;

    const video = await Video.findById(id);
    
    if (!video) {
      return res.status(404).json({
        success: false,
        message: 'Video not found'
      });
    }

    // Update streaming metadata
    if (videoId) video.videoId = videoId;
    if (adaptiveStreamQualities && Array.isArray(adaptiveStreamQualities)) {
      video.adaptiveStreamQualities = adaptiveStreamQualities;
    }

    const baseUrl = process.env.API_URL || 'http://localhost:5000';
    video.masterPlaylistUrl = `${baseUrl}/uploads/${video.videoId || id}/master.m3u8`;

    await video.save();

    res.status(200).json({
      success: true,
      message: 'Stream metadata updated successfully',
      data: { video }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
