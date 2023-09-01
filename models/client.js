const mongoose = require('mongoose');
const { isEmail } = require('validator');

mongoose.Schema.Types.String.set('trim', true);

const clientSchema = new mongoose.Schema(
  {
    clientFirstName: {
      type: String,
      maxLength: [15, 'Name should be less than 16 characters']
    },
    clientLastName: {
      type: String,
      maxLength: [15, 'Name should be less than 16 characters']
    },
    clientEmail: {
      type: String,
      maxLength: [99, 'Email should be less than 100 characters']
      // unique: true
      // validate: [isEmail, 'Invalid Email']
    },
    clientPhone: {
      type: String,
      maxLength: [10, 'Phone should be 10 or fewer digits']
    },
    clientAddress1: {
      type: String,
      maxLength: [49, 'Address should be less than 50 characters']
    },
    clientAddress2: {
      type: String,
      maxLength: [49, 'Address should be less than 50 characters']
    },
    clientCity: {
      type: String,
      maxLength: [29, 'City should be less than 30 characters']
    },
    clientState: {
      type: String,
      maxLength: [14, 'City should be less than 15 characters']
    },
    clientZip: {
      type: String,
      maxLength: [10, 'Zip code should be less than 11 characters']
    },
    clientNote: {
      type: String,
      maxLength: [255, 'Client note must not exceed 255 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  {
    collation: { locale: 'en' }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Set up indexes
// clientSchema.index({ collation: { locale: 'en' } });

// clientSchema.post(/^find/, function (docs, next) {
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

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
