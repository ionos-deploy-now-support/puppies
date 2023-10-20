const { application } = require('express');
const mongoose = require('../db/connect');
const { json } = require('body-parser');
const catchAsync = require('../utils/catchAsync');
const Contract = require('../models/contract');
const factory = require('../controllers/handlerFactory');

//Middleware - get clientId from url params for nested routes
exports.setClientId = (req, res, next) => {
  console.log(`req.params is ${req.params.id}`);
  if (!req.body.client) req.body.client = req.params.clientId;
  next();
};

exports.getAllContracts = factory.getAll(Contract);

exports.getContract = factory.getOne(Contract);
exports.createContract = factory.createOne(Contract);
exports.updateContract = factory.updateOne(Contract);
exports.deleteContract = factory.deleteOne(Contract);
