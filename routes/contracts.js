const express = require('express');
const router = express.Router({ mergeParams: true });
const contractsController = require('../controllers/contracts');
const { protect, restrictTo } = require('../controllers/authController');

router.get('/', contractsController.getAllContracts);

// router.get('/contracts-stats', contractsController.getContractsStats);
router.get('/:id', contractsController.getContract);
router.post(
  '/',
  protect,
  restrictTo('admin'),
  contractsController.setClientId,
  contractsController.createContract
);
router.put('/:id', protect, restrictTo('admin'), contractsController.updateContract);
router.delete('/:id', protect, restrictTo('admin'), contractsController.deleteContract);

module.exports = router;
