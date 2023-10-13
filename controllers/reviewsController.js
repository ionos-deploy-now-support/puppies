const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
// const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
// const ObjectId = require('mongodb').ObjectId;
// const APIFeatures = require('../utils/apiFeatures');
const Review = require('./../models/reviewModel');
const factory = require('../controllers/handlerFactory');

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);
