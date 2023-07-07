const express = require('express');
const router = express.Router();
// puppiesRouter needed for nested routes
const puppiesRouter = require('../routes/puppies');
const littersController = require('../controllers/litters');
const { protect, restrictTo } = require('../controllers/authController');

//mount router - puppiesRouter for nested route /litters/:litterId/puppies
router.use('/:litterId/puppies', puppiesRouter);

router.get('/', littersController.getAllLitters);

router.get('/litters-stats', littersController.getLittersStats);

router.get('/:id', littersController.getLitterById);

router.post('/', protect, restrictTo('admin'), littersController.addLitter);

router.put('/:id', protect, restrictTo('admin'), littersController.updateLitter);

router.delete('/:id', protect, restrictTo('admin'), littersController.deleteLitter);

module.exports = router;
