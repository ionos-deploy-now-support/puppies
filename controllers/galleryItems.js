const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const GalleryItem = require('./../models/galleryItem');
const factory = require('../controllers/handlerFactory');

exports.setLitterId = (req, res, next) => {
  if (!req.body.contract) req.body.contract = req.params.id;
  //For nested routes get litterId from params (url) if not in body
  next();
};

exports.getAllGalleryItems = factory.getAll(GalleryItem);
exports.getGalleryItem = factory.getOne(GalleryItem);
exports.createGalleryItem = factory.createOne(GalleryItem);
exports.updateGalleryItem = factory.updateOne(GalleryItem);
exports.deleteGalleryItem = factory.deleteOne(GalleryItem);
