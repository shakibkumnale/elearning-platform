import express from 'express';
import {
  getAllVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
  updateProgress,
  getProgress,
  getCategories,
  getStreamUrls,
  updateStreamMetadata
} from '../controllers/videoController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getAllVideos);
router.get('/categories', getCategories);
router.get('/:id', getVideoById);
router.get('/:id/stream', getStreamUrls);

// Protected routes (user)
router.post('/progress', protect, updateProgress);
router.get('/progress/:videoId', protect, getProgress);

// Admin routes
router.post('/', protect, authorize('admin'), createVideo);
router.put('/:id', protect, authorize('admin'), updateVideo);
router.put('/:id/stream-metadata', protect, authorize('admin'), updateStreamMetadata);
router.delete('/:id', protect, authorize('admin'), deleteVideo);

export default router;
