const { application } = require('express');
const mongoose = require('../db/connect');
const { json } = require('body-parser');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
// const ObjectId = require('mongodb').ObjectId;
const JWTUser = require('./../models/userModel');
const factory = require('../controllers/handlerFactory');

// object filtering to loop through object keeping only allowedFields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
exports.updateMe = catchAsync(async (req, res, next) => {
  //get error if users tries to update password as this is done elsewhere
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('Use /updateMyPassword for password updates', 400));
  }
  //filter out everything but name and email
  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await JWTUser.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const user = await JWTUser.findByIdAndUpdate(req.user.id, { active: false });
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getAllUsers = factory.getAll(JWTUser);
exports.getUser = factory.getOne(JWTUser);
exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};

// Do NOT update passwords with this
exports.updateUser = factory.updateOne(JWTUser);
exports.deleteUser = factory.deleteOne(JWTUser);
