const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const ObjectId = require('mongodb').ObjectId;

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    /*
  #swagger.description = 'READ all documents.'
*/
    // To allow for nested GET puppies on litter
    let filter = {};
    if (req.params.litterId) filter = { litter: req.params.litterId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const docs = await features.query;

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: { docs }
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    /*
  #swagger.description = 'READ a document.'
*/
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid id to find desired document.');
    }
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    /*
  #swagger.description = 'CREATE a new document.'
*/
    if (!req.body) {
      res.status(400).send({ message: 'Content cannot be empty!' });
      return;
    }
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res) => {
    /*
  #swagger.description = 'UPDATE a specific document by id.'
*/
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Use a valid id to update desired document.');
    }
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  });

exports.deleteOne = (Model) =>
  /*
  #swagger.description = 'DELETE a specific document by id.'
*/
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  });
