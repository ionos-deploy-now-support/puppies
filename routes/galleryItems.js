const express = require('express');
const router = express.Router({ mergeParams: true });
const galleryItemsController = require('../controllers/galleryItems');
const { protect, restrictTo } = require('../controllers/authController');

router.get('/', galleryItemsController.getAllGalleryItems);

router.get('/:id', galleryItemsController.getGalleryItem);
router.post(
  '/',
  protect,
  restrictTo('admin'),
  // galleryItemsController.setLitterId,
  galleryItemsController.createGalleryItem
);
router.put('/:id', protect, restrictTo('admin'), galleryItemsController.updateGalleryItem);
router.delete('/:id', protect, restrictTo('admin'), galleryItemsController.deleteGalleryItem);

module.exports = router;
