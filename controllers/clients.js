const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Client = require('./../models/client');
const factory = require('../controllers/handlerFactory');
const PAGINATION_LIMIT = require('../utils/constants2');

class ClientFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryObj = { ...this.queryStr };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    const { search, sort } = queryObj;

    let queryFilterObj = {};

    if (search) {
      queryFilterObj.$or = [
        { clientFirstName: { $regex: search, $options: 'i' } },
        { clientLastName: { $regex: search, $options: 'i' } }
      ];
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
      'a-z': 'clientFirstName',
      'z-a': '-clientFirstName'
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

exports.getAllClients = catchAsync(async (req, res, next) => {
  // To allow for nested GETs we may need another ID.
  let filter = {};
  if (req.params.ClientId) filter = { client: req.params.clientId };

  const totalDocs = await Client.countDocuments(filter);
  const filtered = new ClientFeatures(Client.find(filter), req.query).filter();
  const filteredDocs = await filtered.query;

  const features = new ClientFeatures(Client.find(filter), req.query)
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
exports.getClient = factory.getOne(Client);
exports.createClient = factory.createOne(Client);
exports.updateClient = factory.updateOne(Client);
exports.deleteClient = factory.deleteOne(Client);
