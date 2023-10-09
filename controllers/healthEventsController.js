const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const HealthEvent = require('./../models/healthEvent');
const Puppy = require('./../models/puppy');
const factory = require('../controllers/handlerFactory');

exports.getAllHealthEvents = factory.getAll(HealthEvent);
exports.getHealthEvent = factory.getOne(HealthEvent);
exports.updateHealthEvent = factory.updateOne(HealthEvent);
exports.deleteHealthEvent = factory.deleteOne(HealthEvent);

exports.createOneHealthEvent = catchAsync(async (req, res, next) => {
  if (!req.body) {
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }
  const doc = await HealthEvent.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
  const puppyId = doc.puppy;
  const eventId = doc.id;
  this.updateOnePuppy(puppyId, eventId);
});
// adds the newly created healthEventId to puppyHealthEvents array in Puppy
exports.updateOnePuppy = catchAsync(async (puppyId, eventId, res) => {
  const result = await Puppy.findByIdAndUpdate(
    { _id: puppyId },
    {
      $push: { puppyHealthEvents: eventId }
    },
    {
      new: true,
      runValidators: true
    }
  );
  console.log(result);
});
