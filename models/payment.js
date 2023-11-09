const mongoose = require('mongoose');

mongoose.Schema.Types.String.set('trim', true);

const paymentSchema = new mongoose.Schema(
  {
    paymentDate: {
      type: Date,
      required: [true, 'Payment must have a date'],
      max: '2050-12-31',
      min: '2020-05-01',
      default: Date.now()
    },
    paymentAmount: {
      type: Number,
      max: [2000, 'Payment should be less than 2000'],
      min: [0.01, 'Payment should be a positive number']
    },
    contract: {
      type: mongoose.Schema.ObjectId,
      ref: 'Contract',
      required: [true, 'Payment must belong to a contract']
    },
    client: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      required: [true, 'Payment must belong to a client']
    },
    paymentNote: {
      type: String,
      maxLength: [255, 'Payment note must not exceed 255 characters']
    },
    paymentMethod: {
      type: String,
      lowercase: true,
      maxLength: [15, 'Payment Type must not exceed 15 characters'],
      enum: {
        values: ['cash', 'check', 'venmo', 'paypal', 'zelle'],
        message: '{VALUE} is not supported. Enter cash, check, venmo, paypal, or zelle'
      }
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

// Set up indexes
// paymentSchema.index({ paymentEmail: 1 });

// paymentSchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds`);
//   console.log(docs);
//   next();
// });

// Aggregation middleware

//custom validators are possible
//priceDiscount : {
// type: Number,
// validate: {
//this points to only current doc on New document creation
//   validator: function(val) {
//     return val < this.price;
//   },
//   message: 'Discount price ({VALUE}) should be less than regular price'
// }
// }

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
