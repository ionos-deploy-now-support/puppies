const mongoose = require('mongoose');
const slugify = require('slugify');
const Client = require('./client');
const Puppy = require('./puppy');

mongoose.Schema.Types.String.set('trim', true);

const contractSchema = new mongoose.Schema(
  {
    contractOpen: {
      type: Date,
      required: [true, 'Contract must have a start date.'],
      min: ['2020-05-05', 'Date must be later than 2020-04-05'],
      max: ['2050-12-31', 'Date must be before 2051-01-01'],
      default: Date.now()
    },
    contractClose: {
      type: Date,
      min: ['2020-05-05', 'Date must be later than 2020-04-05'],
      max: ['2050-12-31', 'Date must be before 2051-01-01']
    },
    contractType: {
      type: String,
      required: [true, 'Contract type must be entered.'],
      lowercase: true,
      enum: {
        values: [
          'black-female',
          'black-male',
          'chocolate-female',
          'chocolate-male',
          'yellow-female',
          'yellow-male'
        ],
        message:
          '{VALUE} is not supported. Enter black-female black-male     chocolate-female chocolate-male yellow-female or yellow-male'
      }
    },
    contractPrice: {
      type: Number,
      required: [true, 'Contract must have an agreed upon price.'],
      max: [1000, 'Price should not exceed 1000'],
      min: [0, 'Price should be a positive value'],
      default: 800
    },
    contractNote: {
      type: String,
      maxLength: [255, 'Contract note must not exceed 255 characters']
    },
    puppyPickOrder: {
      type: Number,
      required: false,
      max: [15, 'Puppy pick order should not exceed 15'],
      min: [0, 'Puppy pick order should be a positive number']
    },
    puppy: {
      type: mongoose.Schema.ObjectId,
      ref: 'Puppy'
    },
    puppyPickUp: {
      type: Date
    },
    client: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      required: [true, 'Contract must have a client']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;
