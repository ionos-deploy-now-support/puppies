const express = require('express');
const router = express.Router({ mergeParams: true });

const puppiesController = require('../controllers/puppies');
const { protect, restrictTo } = require('../controllers/authController');

router.get('/', puppiesController.getAllPuppies);

router.get('/puppies-stats', puppiesController.getPuppiesStats);

router.get('/:id', puppiesController.getPuppyById);

router.post('/', protect, restrictTo('admin'), puppiesController.addPuppy);

router.put('/:id', protect, restrictTo('admin'), puppiesController.updatePuppy);

router.delete('/:id', protect, restrictTo('admin'), puppiesController.deletePuppy);

module.exports = router;
