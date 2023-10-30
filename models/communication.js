const mongoose = require('mongoose');
const { isEmail } = require('validator');

mongoose.Schema.Types.String.set('trim', true);

const communicationSchema = new mongoose.Schema(
  {
    communicationDate: {
      type: Date,
      max: '2050-12-31',
      min: '2020-05-01',
      default: Date.now()
    },
    client: {
      type: mongoose.Schema.ObjectId,
      ref: 'Client',
      required: [true, 'Communication is tied to a Client']
    },
    communicationType: {
      type: String,
      lowercase: true,
      maxLength: [15, 'Communication Type must not exceed 15 characters'],
      enum: {
        values: ['phone', 'text', 'facebook', 'email', 'personal', 'akc', 'website'],
        message:
          '{VALUE} is not supported. Enter phone, text, facebook, email, personal, akc, or website'
      }
    },
    communicationNote: {
      type: String,
      maxLength: [255, 'Communication note must not exceed 255 characters']
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

// communicationSchema.post(/^find/, function (docs, next) {
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

const Communication = mongoose.model('Communication', communicationSchema);

module.exports = Communication;
