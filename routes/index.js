const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { ensureAuth, ensureGuest } = require('../controllers/auth');

router.use(bodyParser.json());

router.get('/api/v1/api-docs', ensureAuth);
router.use('/api/v1/', require('./swagger'));
router.use('/api/v1/auth', require('./auth'));
router.use('/api/v1/clients', require('./clients'));
router.use('/api/v1/communications', require('./communications'));
router.use('/api/v1/contracts', require('./contracts'));
router.use('/api/v1/galleryItems', require('./galleryItems'));
router.use('/api/v1/healthEvents', require('./healthEvents'));
router.use('/api/v1/litters', require('./litters'));
router.use('/api/v1/payments', require('./payments'));
router.use('/api/v1/puppies', require('./puppies'));
router.use('/api/v1/reviews', require('./reviews'));
router.use('/api/v1/users', require('./users'));
router.use(
  '/api/v1/',
  (docData = (req, res) => {
    let docData = {
      documentationURL: 'https://puppies-api-ek0y.onrender.com/api/v1/api-docs'
    };
    res.send(docData);
  })
);

module.exports = router;
