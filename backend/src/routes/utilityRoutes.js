import express from 'express';
import {
  calculateVideoBitrate,
  calculateVideoFileSize,
  estimateBitrate,
  compareTwoBitrates
} from '../controllers/utilityController.js';

const router = express.Router();

router.post('/calculate-bitrate', calculateVideoBitrate);
router.post('/calculate-filesize', calculateVideoFileSize);
router.post('/estimate-bitrate', estimateBitrate);
router.post('/compare-bitrates', compareTwoBitrates);

export default router;
