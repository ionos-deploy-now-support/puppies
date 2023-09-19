const mongoose = require('mongoose');
mongoose.Schema.Types.String.set('trim', true);
const Puppy = require('./puppy');

const litterSchema = new mongoose.Schema({
  litterName: {
    type: String,
    required: [true, 'Each litter has a name.'],
    maxLength: [25, 'Litter name must be less than 26 characters']
  },
  litterAKC: {
    type: String,
    required: [true, 'All litters have an AKC #'],
    unique: true,
    maxLength: [20, 'AKC registration must be less than 21 characters']
  },
  sireName: {
    type: String,
    required: [true, 'Each litter has a father.'],
    maxLength: [15, "Sire's name must be less than 16 characters"]
  },
  damName: {
    type: String,
    required: [true, 'Each litter has a mother.'],
    maxLength: [15, "Dam's name must be less than 16 characters"]
  },
  litterConceived: {
    type: Date,
    required: false
  },
  litterDelivered: {
    type: Date,
    required: [true, 'Each litter has a delivery date.']
  },
  femalesBorn: {
    type: Number,
    default: 0,
    required: [true, '# of girls must be 0 or greater.'],
    max: [20, 'Litter size must be less than 21']
  },
  femalesSurvived: {
    type: Number,
    required: false,
    max: [20, 'Litter size must be less than 21']
  },
  malesBorn: {
    type: Number,
    default: 0,
    required: [true, '# of boys must be 0 or greater.'],
    max: [20, 'Litter size must be less than 21']
  },
  malesSurvived: {
    type: Number,
    required: false,
    max: [20, 'Litter size must be less than 21']
  },
  puppiesChocolate: {
    type: Number,
    required: [true, '# of chocolate puppies required.'],
    max: [20, 'Litter size must be less than 21']
  },
  puppiesYellow: {
    type: Number,
    required: [true, '# of yellow puppies required.'],
    max: [20, 'Litter size must be less than 21']
  },
  puppiesBlack: {
    type: Number,
    required: [true, '# of black puppies required.'],
    max: [20, 'Litter size must be less than 21']
  },
  litterNote: {
    type: String,
    required: false,
    maxLength: [255, 'Limit comment to 255 characters']
  },
  //Child reference: Litters have puppies. This gives us and id that can be used to populate the other fields. See .populate below.
  puppies: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Puppy',
      required: [true, 'Puppy must belong to a litter.']
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

//Populates docs from ObjectId for child referenced relationships
litterSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'puppies',
    select: 'puppyTempName puppySex puppyColor puppyCollar'
  });
  next();
});

const Litter = mongoose.model('Litter', litterSchema);

module.exports = Litter;
