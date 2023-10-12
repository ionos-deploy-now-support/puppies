const express = require('express');
//mergeParams for nested routes to get access to add fields in nested route
const router = express.Router({ mergeParams: true });
const communicationsController = require('../controllers/communications');

const { protect, restrictTo } = require('../controllers/authController');

// router.get('/', communicationsController.getAllCommunications);

// router.get('/communications-stats', communicationsController.getCommunicationsStats);
router.get('/:id', communicationsController.getCommunication);
router.post(
  '/',
  protect,
  restrictTo('admin'),
  communicationsController.setClientId,
  communicationsController.createCommunication
);
router.put('/:id', protect, restrictTo('admin'), communicationsController.updateCommunication);
router.delete('/:id', protect, restrictTo('admin'), communicationsController.deleteCommunication);

module.exports = router;
