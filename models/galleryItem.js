const mongoose = require('mongoose');

mongoose.Schema.Types.String.set('trim', true);

const galleryItemSchema = new mongoose.Schema(
  {
    galleryItemURL: {
      type: String,
      maxLength: [255, 'GalleryItem caption must not exceed 255 characters'],
      required: [true, 'GalleryItem must have a URL']
    },
    galleryItemDate: {
      type: Date,
      max: '2050-12-31',
      min: '2020-05-01',
      default: Date.now()
    },
    galleryItemType: {
      type: String,
      lowercase: true,
      maxLength: [15, 'GalleryItem Type must not exceed 15 characters'],
      enum: {
        values: ['image', 'video'],
        message: '{VALUE} is not supported. Enter image or video'
      }
    },
    galleryItemCaption: {
      type: String,
      maxLength: [255, 'GalleryItem caption must not exceed 255 characters']
    },
    displayInGallery: {
      type: Boolean,
      default: false
    },
    displayOnLanding: {
      type: Boolean,
      default: false
    },
    litter: {
      type: mongoose.Schema.ObjectId,
      ref: 'Litter'
    },
    puppy: {
      type: mongoose.Schema.ObjectId,
      ref: 'Puppy'
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
// galleryItemSchema.index({ galleryItemEmail: 1 });

// galleryItemSchema.post(/^find/, function (docs, next) {
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

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);

module.exports = GalleryItem;
