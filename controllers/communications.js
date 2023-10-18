const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Communication = require('./../models/communication');
const factory = require('../controllers/handlerFactory');

//get clientId from url params for nested routes
exports.setClientId = (req, res, next) => {
  console.log(`req.params is ${req.params.id}`);
  if (!req.body.client) req.body.client = req.params.clientId;
  next();
};

exports.getAllCommunications = factory.getAll(Communication);

exports.getCommunication = factory.getOne(Communication);
exports.createCommunication = factory.createOne(Communication);
exports.updateCommunication = factory.updateOne(Communication);
exports.deleteCommunication = factory.deleteOne(Communication);
