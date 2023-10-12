const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const authController = require('../controllers/authController');
const { protect, restrictTo, isLoggedIn } = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(protect); // protect routes after this point
router.use(isLoggedIn);
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', usersController.getMe, usersController.getUser);
router.patch(
  '/updateMe',
  usersController.uploadUserPhoto,
  usersController.resizeUserPhoto,
  usersController.updateMe
);
router.delete('/deleteMe', usersController.deleteMe);

router.use(restrictTo('admin')); //restrict to admin after this point

// router.get('/', usersController.getAllUsers);

router.post('/', usersController.createUser);
router.get('/:id', usersController.getUser);
router.put('/:id', usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;
