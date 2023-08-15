const { application } = require('express');
const mongoose = require('../db/connect');
const { json } = require('body-parser');
const catchAsync = require('../utils/catchAsync');
// const AppError = require('../utils/appError');
// const ObjectId = require('mongodb').ObjectId;
const Contract = require('../models/contract');
const factory = require('../controllers/handlerFactory');

// exports.getContractsStats = catchAsync(async (req, res, next) => {
//   /*
//   #swagger.description = 'GET contracts-stats.'
// */
//   const contracts = await Contract.find();
//   res.status(200).json({
//     status: 'success',
//     results: contracts.length,
//     data: { contracts }
//   });
// });

exports.getAllContracts = factory.getAll(Contract);
exports.getContract = factory.getOne(Contract);
exports.createContract = factory.createOne(Contract);
exports.updateContract = factory.updateOne(Contract);
exports.deleteContract = factory.deleteOne(Contract);
