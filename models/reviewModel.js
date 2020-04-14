const mongoose = require('mongoose');
const Tour = require('./tourModel');
const reviewScheema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'a review must be defined']
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    createdAt: {
      type: Date,
      value: Date.now
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour']
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'review must belong to a user']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { value: true }
  }
);

reviewScheema.index({tour:1,user:1},{unique:true})



reviewScheema.statics.calAverageRating = async function(tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId }
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);
  if(stats.lenth > 0){
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  }else{
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4 
    });
  }
  
  console.log(stats)
};

reviewScheema.pre(/^find/, function(next) {
  //   this.populate({
  //     path: 'tour',
  //     select:'name'
  //   }).populate({
  //       path:'user',
  //       select:'name photo'
  //   });
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});

reviewScheema.post('save', function() {
  this.constructor.calAverageRating(this.tour);
});
reviewScheema.pre(/^findOneAnd/,async function(next){
  this.review = await this.findOne()
  next()
})
reviewScheema.post(/^findOneAnd/,async function(){
  // querry has alrady been executed
 await this.review.constructor.calAverageRating(this.review.tour)
  
})

const Review = mongoose.model('Review', reviewScheema);
module.exports = Review;
