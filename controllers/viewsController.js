const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
exports.getOverView =  async(req, res, ) => {
  //get tours
  const tours = await Tour.find();
 res.status(200).render('overview', {
    title: 'Exciting tours for adventurous people',
    tours
  });
  
};

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review rating user'
  });
  // console.log(tour)
  res.status(200).render('tour', {
    title: `${tour.name} tour`,
    tour
  });
});

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render('login',{
    title:'Log in to you account'
  });
});
