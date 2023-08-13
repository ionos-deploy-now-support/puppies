const { application } = require('express');
const { json } = require('body-parser');
const mongoose = require('../db/connect');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const ObjectId = require('mongodb').ObjectId;
const Puppy = require('./../models/puppy');
const factory = require('../controllers/handlerFactory');

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

exports.getAllPuppies = factory.getAll(Puppy);
exports.getPuppy = factory.getOne(Puppy, { path: 'puppyHealthEvents' });
// exports.setLitterId = (req, res, next) => {
//   if (!req.body.litter) req.body.litter = req.params.litterId;
//   //For nested routes get litterId from params (url) if not in body
// };
exports.createPuppy = factory.createOne(Puppy);
exports.updatePuppy = factory.updateOne(Puppy);
exports.deletePuppy = factory.deleteOne(Puppy);
