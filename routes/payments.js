const express = require('express');
//mergeParams for nested routes to get access to add fields in nested route
const router = express.Router({ mergeParams: true });

const paymentsController = require('../controllers/payments');
const { protect, restrictTo } = require('../controllers/authController');

router.get('/', paymentsController.getAllPayments);

// router.get('/payments-stats', paymentsController.getPaymentsStats);
router.get('/:id', paymentsController.getPayment);
router.post(
  '/',
  protect,
  restrictTo('admin'),
  paymentsController.setClientId,
  paymentsController.createPayment
);
router.put('/:id', protect, restrictTo('admin'), paymentsController.updatePayment);
router.delete('/:id', protect, restrictTo('admin'), paymentsController.deletePayment);

module.exports = router;
