const express = require('express');
const router = express.Router();
// puppiesRouter needed for nested routes
// const puppiesRouter = require('../routes/puppies');
const contractsController = require('../controllers/contracts');
const { protect, restrictTo } = require('../controllers/authController');

//mount router - puppiesRouter for nested route /contracts/:contractId/puppies
// router.use('/:contractId/puppies', puppiesRouter);

// router.get('/', contractsController.getAllContracts);

// router.get('/contracts-stats', contractsController.getContractsStats);
router.get('/:id', contractsController.getContract);
router.post('/', protect, restrictTo('admin'), contractsController.createContract);
router.put('/:id', protect, restrictTo('admin'), contractsController.updateContract);
router.delete('/:id', protect, restrictTo('admin'), contractsController.deleteContract);

module.exports = router;
