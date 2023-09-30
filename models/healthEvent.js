const mongoose = require('mongoose');

mongoose.Schema.Types.String.set('trim', true);
const healthEventsSchema = new mongoose.Schema(
  {
    eventDate: {
      type: Date,
      default: Date.now,
      min: ['2020-05-05', 'Date must be later than 2020-04-05'],
      max: ['2050-12-31', 'Date must be before 2051-01-01']
    },
    puppy: {
      type: mongoose.Schema.ObjectId,
      ref: 'Puppy'
    },
    description: {
      type: String,
      maxLength: [255, 'Exceeded 255 character description.']
    },
    grams: {
      type: Number,
      max: [13600, 'Puppy grams should not exceed 13600']
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

const HealthEvent = mongoose.model('HealthEvent', healthEventsSchema);

module.exports = HealthEvent;
