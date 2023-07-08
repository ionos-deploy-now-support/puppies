const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviewsController');
const { protect, restrictTo } = require('../controllers/authController');

router.get('/', reviewsController.getAllReviews);

router.get('/:id', reviewsController.getReview);

router.post('/', protect, restrictTo('user'), reviewsController.createReview);

// router.put('/:id', protect, restrictTo('admin'), reviewsController.updateReview);

// router.delete('/:id', protect, restrictTo('admin'), reviewsController.deleteReview);

module.exports = router;
