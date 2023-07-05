const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const APIFeatures = require('../utils/apiFeatures');
const HealthEvent = require('./../models/healthEvent');

exports.getAllHealthEvents = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'READ all health events.'
*/

  const features = new APIFeatures(HealthEvent.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const healthEvents = await features.query;

  res.status(200).json({
    status: 'success',
    results: healthEvents.length,
    data: { healthEvents }
  });
});

exports.getHealthEventById = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'READ a specific health event by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to find desired healthEvent.');
  }
  const healthEventId = new ObjectId(req.params.id);
  const healthEvent = await HealthEvent.findById(healthEventId);
  if (!healthEvent) {
    return next(new AppError('No healthEvent found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { healthEvent }
  });
});

exports.addHealthEvent = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'CREATE a new healthEvent.'
*/
  if (!req.body.eventDate) {
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }
  const healthEvent = new HealthEvent({
    eventDate: req.body.eventDate,
    puppyTempName: req.body.puppyTempName,
    description: req.body.description,
    grams: req.body.grams
  });
  const newHealthEvent = await HealthEvent.create(healthEvent);
  res.status(201).json({
    status: 'success',
    data: { healthEvent: newHealthEvent }
  });
});

exports.updateHealthEvent = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'UPDATE a specific healthEvent by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to update desired healthEvent.');
  }
  const healthEventId = new ObjectId(req.params.id);
  const changeHealthEvent = {
    eventDate: req.body.eventDate,
    puppyTempName: req.body.puppyTempName,
    description: req.body.description,
    grams: req.body.grams
  };
  const healthEvent = await HealthEvent.findByIdAndUpdate(healthEventId, changeHealthEvent, {
    new: true,
    runValidators: true
  });
  if (!healthEvent) {
    return next(new AppError('No healthEvent found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { healthEvent }
  });
});

exports.deleteHealthEvent = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'DELETE a healthEvent by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to delete desired healthEvent.');
  }
  const healthEventId = new ObjectId(req.params.id);
  const healthEvent = await HealthEvent.findByIdAndDelete(healthEventId);
  if (!healthEvent) {
    return next(new AppError('No healthEvent found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
