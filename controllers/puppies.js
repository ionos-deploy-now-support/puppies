const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Puppy = require('./../models/puppy');
const factory = require('../controllers/handlerFactory');
const PAGINATION_LIMIT = require('../utils/constants2');

exports.getPuppiesStats = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'GET stats for puppies.'
*/
  const stats = await Puppy.aggregate([
    // {
    //   $match: { puppyColor: { $eq: 'black' } }
    // },

    {
      $group: {
        _id: { $toUpper: '$puppyColor' },
        countByColor: { $count: {} }
        // _id: '$puppySex',
        // countByGender: { $count: {} }
      }
    },
    {
      $sort: { countByColor: -1 }
    }
  ]);
  res.status(200).json({
    status: 'success',
    data: { stats }
  });
});

class PuppyFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    const { search, puppySex, puppyColor, litter } = queryObj;

    let queryFilterObj = {};

    if (search) {
      queryFilterObj.$or = [{ puppyTempName: { $regex: search, $options: 'i' } }];
    }
    if (puppySex && puppySex !== 'Both') {
      queryFilterObj.puppySex = puppySex;
    }
    if (puppyColor && puppyColor !== 'All') {
      queryFilterObj.puppyColor = puppyColor;
    }
    if (litter && litter !== 'All') {
      queryFilterObj.litter = litter;
    }

    let queryStr = JSON.stringify(queryFilterObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte\lt)\b/g, (match) => `$${match}`);
    queryFilterObj = JSON.parse(queryStr);
    this.query = this.query.find(queryFilterObj);
    return this;
  }

  sort() {
    const sortOptions = {
      newest: '-createdAt',
      oldest: 'createdAt',
      'a-z': 'puppyTempName',
      'z-a': '-puppyTempName'
    };

    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      const sortKey = sortOptions[sortBy] || sortOptions.newest;
      this.query = this.query.sort(sortKey);
    } else {
      // sort by newest entry by default if no sort params
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }
  paginate() {
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || PAGINATION_LIMIT;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.setLitterId = (req, res, next) => {
  if (!req.body.litter) req.body.litter = req.params.litterId;
  //For nested routes get litterId from params (url) if not in body
  next();
};

exports.getAllPuppies = catchAsync(async (req, res, next) => {
  // To allow for nested GETs we may need another ID.
  let filter = {};
  if (req.params.puppyId) filter = { puppy: req.params.puppyId };

  const totalDocs = await Puppy.countDocuments(filter);
  const filtered = new PuppyFeatures(Puppy.find(filter), req.query).filter();
  const filteredDocs = await filtered.query;

  const features = new PuppyFeatures(Puppy.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const docs = await features.query;
  let currentPage,
    limit = '';
  req.query.page ? (currentPage = req.query.page * 1) : (currentPage = 1 * 1);
  req.query.limit ? (limit = req.query.page * 1) : (limit = PAGINATION_LIMIT);
  const displaying = docs.length;
  const numPages = Math.ceil(filteredDocs.length / limit);

  res.status(200).json({
    status: 'success',
    results: totalDocs,
    filteredResults: filteredDocs.length,
    displaying: displaying,
    numPages: numPages,
    currentPage: currentPage,
    data: { docs }
  });
});

//see below - { path: 'puppyHealthEvents' } to pass in populate Options
// exports.getPuppy = factory.getOne(Puppy, { path: 'puppyHealthEvents' });
exports.getPuppy = factory.getOne(Puppy);
exports.createPuppy = factory.createOne(Puppy);
exports.updatePuppy = factory.updateOne(Puppy);
exports.deletePuppy = factory.deleteOne(Puppy);

exports.getPuppiesAvailable = catchAsync(async (req, res, next) => {
  const puppies = await Puppy.find({ puppyAvailable: true });
  const results = puppies.length;
  if (!puppies) {
    return next(new AppError('No available puppies found', 404));
  }
  res.status(200).json({
    status: 'success',
    results: results,
    data: {
      data: puppies
    }
  });
});
