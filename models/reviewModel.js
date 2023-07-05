const mongoose = require('mongoose');
const JWTUser = require('./userModel');

mongoose.Schema.Types.String.set('trim', true);

const reviewSchema = new mongoose.Schema(
  {
    reviewText: {
      type: String,
      required: [true, 'Review needs a description'],
      unique: true,
      maxLength: [255, 'Exceeded 255 allowed characters']
    },
    reviewRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Highest rating is a 5']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'JWTUser',
      required: [true, 'Review must have an author']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual properties are not save in database. Derived from another field.
// reviewSchema.virtual('birthDate').get(function () {
//   return { $substr: [this.reviewDOB, 0, 9] };
// });
// Document Middleware runs before .save() and .create

// EMBEDS the user doc into review doc on .save  To use this... change back to user: Array
// reviewSchema.pre('save', async function (next) {
//   const userPromises = this.user.map(
//     async (id) => await JWTUser.findById(id)
//   );
//   this.user = await Promise.all(userPromises);
//   next();
// });

//Populates docs from ObjectId for child referenced relationships
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name'
  });
  // can call populate again if needed for another ObjectId
  // .populate({
  //   path: 'otherField',
  //   select: 'name'
  // });
  next();
});

// reviewSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// Aggregation middleware
// reviewSchema.pre('aggregate', function (next) {
//   // add another match to beginning of aggregation pipeline array
//   this.pipeline().unshift({ $match: { reviewAvailable: { $eq: true } } });
//   console.log(this.pipeline());
//   next();
// });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
