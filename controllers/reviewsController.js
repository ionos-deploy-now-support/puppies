const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const APIFeatures = require('../utils/apiFeatures');
const Review = require('./../models/reviewModel');

exports.getAllReviews = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'READ all reviews.'
*/

  const features = new APIFeatures(Review.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const reviews = await features.query;

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: { reviews }
  });
});

exports.getReviewById = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'READ a specific health event by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to find desired review.');
  }
  const reviewId = new ObjectId(req.params.id);
  const review = await Review.findById(reviewId);
  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { review }
  });
});

exports.addReview = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'CREATE a new review.'
*/
  if (!req.body.reviewText) {
    res.status(400).send({ message: 'Content cannot be empty!' });
    return;
  }
  const review = new Review({
    reviewText: req.body.reviewText,
    reviewRating: req.body.reviewRating,
    user: req.body.user
  });
  const newReview = await Review.create(review);
  res.status(201).json({
    status: 'success',
    data: { review: newReview }
  });
});

exports.updateReview = catchAsync(async (req, res) => {
  /*
  #swagger.description = 'UPDATE a specific review by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to update desired review.');
  }
  const reviewId = new ObjectId(req.params.id);
  const changeReview = {
    reviewText: req.body.reviewText,
    reviewRating: req.body.reviewRating,
    user: req.body.user
  };
  const review = await Review.findByIdAndUpdate(reviewId, changeReview, {
    new: true,
    runValidators: true
  });
  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { review }
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  /*
  #swagger.description = 'DELETE a review by id.'
*/
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Use a valid id to delete desired review.');
  }
  const reviewId = new ObjectId(req.params.id);
  const review = await Review.findByIdAndDelete(reviewId);
  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
