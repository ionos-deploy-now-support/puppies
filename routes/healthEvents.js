const express = require('express');
const router = express.Router();

const healthEventsController = require('../controllers/healthEventsController');
const { protect, restrictTo } = require('../controllers/authController');

router.get('/', healthEventsController.getAllHealthEvents);

router.get('/:id', healthEventsController.getHealthEventById);

router.post('/', protect, restrictTo('admin'), healthEventsController.addHealthEvent);

router.put('/:id', protect, restrictTo('admin'), healthEventsController.updateHealthEvent);

router.delete('/:id', protect, restrictTo('admin'), healthEventsController.deleteHealthEvent);

module.exports = router;
