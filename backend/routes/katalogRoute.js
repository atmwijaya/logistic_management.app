import express from 'express';
import {
  getKatalog,
  getKatalogById,
  createKatalog,
  updateKatalog,
  deleteKatalog,
  toggleStatus,
  getKatalogStats
} from '../controllers/katalogController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.route('/')
  .get(getKatalog);

router.route('/stats')
  .get(getKatalogStats);

router.route('/:id')
  .get(getKatalogById);

// Admin protected routes
router.route('/')
  .post(upload.array('gambar', 10), createKatalog);

router.route('/:id')
  .put(upload.array('gambar', 10), updateKatalog)
  .delete(deleteKatalog);

router.route('/:id/toggle-status')
  .patch(toggleStatus);

export default router;