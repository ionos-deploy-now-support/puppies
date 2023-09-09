const express = require('express');
//mergeParams for nested routes to get access to add fields in nested route
const router = express.Router({ mergeParams: true });
const clientsController = require('../controllers/clients');
const communicationsRouter = require('../routes/communications');
const paymentsRouter = require('../routes/payments');

const { protect, restrictTo } = require('../controllers/authController');

//mount router - paymentsRouter for nested route /clients/:clientId/payments
router.use('/:clientId/communications', communicationsRouter);
router.use('/:clientId/payments', paymentsRouter);
router.get('/', protect, restrictTo('admin'), clientsController.getAllClients);
// router.get('/clients-stats', clientsController.getClientsStats);
router.get('/:id', protect, restrictTo('admin'), clientsController.getClient);
router.post('/', protect, restrictTo('admin'), clientsController.createClient);
router.put('/:id', protect, restrictTo('admin'), clientsController.updateClient);
router.delete('/:id', protect, restrictTo('admin'), clientsController.deleteClient);

module.exports = router;
