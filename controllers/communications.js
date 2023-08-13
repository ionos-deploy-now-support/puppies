const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Communication = require('./../models/communication');
const factory = require('../controllers/handlerFactory');

exports.getAllCommunications = factory.getAll(Communication);
exports.getCommunication = factory.getOne(Communication);
exports.createCommunication = factory.createOne(Communication);
exports.updateCommunication = factory.updateOne(Communication);
exports.deleteCommunication = factory.deleteOne(Communication);
