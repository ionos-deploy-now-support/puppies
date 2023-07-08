const express = require('express');
//mergeParams for nested routes to get access to add fields in nested route
const router = express.Router({ mergeParams: true });

const puppiesController = require('../controllers/puppies');
const { protect, restrictTo } = require('../controllers/authController');

router.get('/', puppiesController.getAllPuppies);

router.get('/puppies-stats', puppiesController.getPuppiesStats);

router.get('/:id', puppiesController.getPuppy);

router.post(
  '/',
  protect,
  restrictTo('admin'),
  // puppiesController.setLitterId,
  puppiesController.createPuppy
);

router.put('/:id', protect, restrictTo('admin'), puppiesController.updatePuppy);

router.delete('/:id', protect, restrictTo('admin'), puppiesController.deletePuppy);

module.exports = router;
