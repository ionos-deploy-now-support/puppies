const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Payment = require('./../models/payment');
const factory = require('../controllers/handlerFactory');

exports.setClientId = (req, res, next) => {
  if (!req.body.client) req.body.client = req.params.clientId;
  //For nested routes get clientId from params (url) if not in body
  next();
};

// exports.getAllPayments = factory.getAll(Payment);
exports.getPayment = factory.getOne(Payment);
exports.createPayment = factory.createOne(Payment);
exports.updatePayment = factory.updateOne(Payment);
exports.deletePayment = factory.deleteOne(Payment);
