const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Communication = require('./../models/communication');
const factory = require('../controllers/handlerFactory');

exports.setClientId = (req, res, next) => {
  if (!req.body.client) req.body.client = req.params.clientId;
  //For nested routes get clientId from params (url) if not in body
  next();
};

// exports.getAllCommunications = factory.getAll(Communication);

exports.getCommunication = factory.getOne(Communication);
exports.createCommunication = factory.createOne(Communication);
exports.updateCommunication = factory.updateOne(Communication);
exports.deleteCommunication = factory.deleteOne(Communication);
