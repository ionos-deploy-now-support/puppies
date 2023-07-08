const { application } = require('express');
const mongoose = require('../db/connect');
const { json } = require('body-parser');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
// const ObjectId = require('mongodb').ObjectId;
const Litter = require('../models/litter');
const factory = require('../controllers/handlerFactory');

exports.getLittersStats = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'GET litters-stats.'
*/
  const litters = await Litter.find();
  res.status(200).json({
    status: 'success',
    results: litters.length,
    data: { litters }
  });
});

exports.getAllLitters = factory.getAll(Litter);
exports.getLitter = factory.getOne(Litter);
exports.createLitter = factory.createOne(Litter);
exports.updateLitter = factory.updateOne(Litter);
exports.deleteLitter = factory.deleteOne(Litter);
