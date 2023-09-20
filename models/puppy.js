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
      maxLength: [25, 'Name should be less than 26 characters']
    },
    slug: String,
    puppyDOB: {
      type: Date,
      required: [true, 'Puppy must have a birth date.'],
      min: ['2020-05-05', 'Date must be later than 2020-04-05'],
      max: ['2050-12-31', 'Date must be before 2051-01-01']
    },
    puppySurvived: {
      type: Boolean,
      default: true
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
      maxLength: [10, 'AKC registration must be less than 11 characters']
    },
    puppyNewName: {
      type: String,
      required: false,
      maxLength: [25, 'Puppy new name must be less than 26 characters'],
      default: 'TBD by Owner'
    },
    puppyAskingPrice: {
      type: Number,
      min: [0, 'Asking price should be a positive number'],
      max: [2000, 'Asking price should be 2000 or below'],
      default: 800
    },
    puppyAvailable: {
      type: Boolean,
      default: true
    },
    puppyNote: {
      type: String,
      maxLength: [255, 'Puppy note must not exceed 255 characters']
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
puppySchema.index(
  { puppyAvailable: 1, puppySex: 1, puppyColor: 1 },
  { collation: { locale: 'en' } }
);
puppySchema.index({ slug: 1 });

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
// `this` gives access to the query but not the doc.
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
// puppySchema.pre('aggregate', function (next) {
//   // add another match to beginning of aggregation pipeline array
//   this.pipeline().unshift({ $match: { puppyAvailable: { $eq: true } } });
//   console.log(this.pipeline());
//   next();
// });

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

/************************************* CAUSING ERROR IN CLIENT EDIT ************ 
puppySchema.statics.countGender = async function (litterId) {
  const stats = await this.aggregate([
    {
      $match: { litter: litterId }
    },
    {
      $group: {
        _id: '$puppySex',
        countGender: {
          $count: {}
        }
      }
    }
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Litter.findByIdAndUpdate(litterId, {
      femalesBorn: stats[0].countGender,
      malesBorn: stats[1].countGender
    });
  } else {
    // set back to default value
    await Litter.findByIdAndUpdate(litterId, {
      femalesBorn: 0,
      malesBorn: 0
    });
  }
};

puppySchema.statics.countColor = async function (litterId) {
  const stats = await this.aggregate([
    {
      $match: { litter: litterId }
    },
    {
      $group: {
        _id: '$puppyColor',
        countColor: {
          $count: {}
        }
      }
    }
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Litter.findByIdAndUpdate(litterId, {
      puppiesBlack: stats[1].countColor,
      puppiesChocolate: stats[0].countColor,
      puppiesYellow: stats[2].countColor
    });
  } else {
    // set back to default value
    await Litter.findByIdAndUpdate(litterId, {
      puppiesBlack: 0,
      puppiesChocolate: 0,
      puppiesYellow: 0
    });
  }
};

// Need to figure this out. How to get count of males and females that survived
puppySchema.statics.countSurvived = async function (litterId) {
  const stats = await this.aggregate([
    {
      $match: {
        litter: litterId
      }
    },
    {
      $match: {
        puppySurvived: true
      }
    },
    {
      $group: {
        _id: '$puppySex',
        countSurvived: {
          $count: {}
        }
      }
    }
  ]);
  console.log(stats);
  if (stats.length > 0) {
    // await Litter.findByIdAndUpdate(litterId, {
    //   femalesSurvived: stats[0].countSurvived,
    //   malesSurvived: stats[1].countSurvived
    // });
  } else {
    // set back to default value
    await Litter.findByIdAndUpdate(litterId, {
      femalesSurvived: femalesBorn,
      malesSurvived: malesBorn
    });
  }
};

//Litter stats updated on puppy SAVE
puppySchema.post('save', function () {
  this.constructor.countGender(this.litter);
  this.constructor.countColor(this.litter);
  this.constructor.countSurvived(this.litter);
});

//Litter stats updated on puppy UPDATE or DELETE
puppySchema.post(/^findOneAnd/, async function (puppy) {
  await puppy.constructor.countGender(puppy.litter);
  await puppy.constructor.countColor(puppy.litter);
  await puppy.constructor.countSurvived(puppy.litter);
});
*****************************************************/

const Puppy = mongoose.model('Puppy', puppySchema);

module.exports = Puppy;
