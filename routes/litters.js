const express = require('express');
const router = express.Router();
// puppiesRouter needed for nested routes
const puppiesRouter = require('../routes/puppies');
const littersController = require('../controllers/litters');
const { ensureAuth } = require('../controllers/auth');

//mount router - puppiesRouter for nested route /litters/:litterId/puppies
router.use('/litterId/puppies', puppiesRouter);

router.get('/', littersController.getAllLitters);

router.get('/litters-stats', littersController.getLittersStats);

router.get('/:id', littersController.getLitterById);

router.post('/', ensureAuth, littersController.addLitter);

router.put('/:id', ensureAuth, littersController.updateLitter);

router.delete('/:id', ensureAuth, littersController.deleteLitter);

module.exports = router;
