const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// const ObjectId = require('mongodb').ObjectId;
// const APIFeatures = require('../utils/apiFeatures');
const HealthEvent = require('./../models/healthEvent');
const factory = require('../controllers/handlerFactory');

exports.getAllHealthEvents = factory.getAll(HealthEvent);
exports.getHealthEvent = factory.getOne(HealthEvent);
exports.createHealthEvent = factory.createOne(HealthEvent);
exports.updateHealthEvent = factory.updateOne(HealthEvent);
exports.deleteHealthEvent = factory.deleteOne(HealthEvent);
