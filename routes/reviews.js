const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviewsController');
const { protect, restrictTo } = require('../controllers/authController');

router.use(protect); // protect all routes
// router.get('/', reviewsController.getAllReviews);
router.get('/:id', reviewsController.getReview);
router.post('/', restrictTo('user'), reviewsController.createReview);
router.put('/:id', restrictTo('user', 'admin'), reviewsController.updateReview);
router.delete('/:id', restrictTo('user', 'admin'), reviewsController.deleteReview);

module.exports = router;
