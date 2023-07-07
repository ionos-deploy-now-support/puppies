const mongoose = require('mongoose');
const slugify = require('slugify');
const HealthEvent = require('./healthEvent');
const Litter = require('./litter');

mongoose.Schema.Types.String.set('trim', true);

const puppySchema = new mongoose.Schema(
  {
    puppyTempName: {
      type: String,
      required: [true, 'Poor puppy needs a name'],
      unique: true,
      maxLength: [15, 'Name should be less than 16 characters']
    },
    slug: String,
    puppyDOB: {
      type: Date,
      required: [true, 'Puppy must have a birth date.'],
      min: ['2020-05-05', 'Date must be later than 2020-04-05'],
      max: ['2050-12-31', 'Date must be before 2051-01-01']
    },
    puppySex: {
      type: String,
      required: [true, 'Puppy must have a gender. M or F'],
      maxLength: [1, 'Use single character. M or F'],
      enum: { values: ['F', 'M'], message: '{VALUE} is not supported. Enter M or F' }
    },
    puppyColor: {
      type: String,
      required: [true, 'Puppy must be have a color.'],
      enum: {
        values: ['chocolate', 'yellow', 'black'],
        message: '{VALUE} is not supported. Enter chocolate, yellow, or black'
      }
    },
    puppyCollar: {
      type: String,
      required: [true, 'For marketing purposes puppy must have a colored collar.'],
      maxLength: [25, 'Color should be less than 26 characters']
    },
    puppyAKC: {
      type: String,
      required: [true, 'Puppy must have AKC registration number.'],
      maxLength: [10, 'AKC registration must be less than 11 characters']
    },
    puppyNewName: {
      type: String,
      required: false,
      maxLength: [15, 'Puppy new name must be less than 16 characters'],
      default: 'TBD by Owner'
    },
    puppyAvailable: {
      type: Boolean,
      default: true
    },
    //Child reference. will only contain puppyHealth Events id in array. Not whole doc.
    puppyHealthEvents: [
      {
        type: mongoose.Schema.ObjectId,
        ref: HealthEvent
      }
    ],
    litter: {
      type: mongoose.Schema.ObjectId,
      ref: 'Litter',
      required: [true, 'Puppy must belong to a litter']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual properties are not saved in database. Derived from another field.
// puppySchema.virtual('birthDate').get(function () {
//   return { $substr: [this.puppyDOB, 0, 9] };
// });
//virtual populate - virtually populate litter in puppy
// puppySchema.virtual('litter', {
//   ref: 'Litter',
//   foreignField: 'litterId',
//   localField: '_id'
// });

// Document Middleware runs before .save() and .create
puppySchema.pre('save', function (next) {
  this.slug = slugify(this.puppyTempName, { lower: true });
  next();
});
// EMBEDS the healthEvents docs into puppy doc on .save  To use this... change back to puppyHealthEvents: Array (Not for updating? so what is the point. Need to add additional healthEvents to the array)
// puppySchema.pre('save', async function (next) {
//   const healthEventsPromises = this.puppyHealthEvents.map(
//     async (id) => await HealthEvent.findById(id)
//   );
//   this.puppyHealthEvents = await Promise.all(healthEventsPromises);
//   next();
// });

//Populates docs from ObjectId for child referenced relationships
puppySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'puppyHealthEvents',
    select: '-__v'
  });
  next();
});

// puppySchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// Query Middleware  //find, findOne, findOneAndUpdate..
// Somehow need to turn this to find only available puppies
// puppySchema.pre(/^find/, function (next) {
//   this.find({ puppyAvailable: true });
//   this.start = Date.now();
//   next();
// });

// puppySchema.post(/^find/, function (docs, next) {
//   console.log(`Query took ${Date.now() - this.start} milliseconds`);
//   console.log(docs);
//   next();
// });

// Aggregation middleware
puppySchema.pre('aggregate', function (next) {
  // add another match to beginning of aggregation pipeline array
  this.pipeline().unshift({ $match: { puppyAvailable: { $eq: true } } });
  console.log(this.pipeline());
  next();
});

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
const Puppy = mongoose.model('Puppy', puppySchema);

module.exports = Puppy;
