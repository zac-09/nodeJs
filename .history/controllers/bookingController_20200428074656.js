const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');
const stripe =  require('stripe')(process.env.STRIPE_SECRET_KEY)
exports.getCheckoutSession = catchAsync(async (req,res,next) =>{
    // get currently booked tour
    const tour = await Tour.findById(req.params.tourId);
   const session =  await stripe.checkout.session.create({
        payment_method_types: ['card'],
        success_url:`${req.protocol}://${req.get('host')}/`,
        customer_email:req.user.email,
        client_reference_id:req.params.tourId,
        line_items:[
            {
                name:`${tour.name} Tour`,
                description:tour.summary,
                images:[`https://www.natours.dev/img/tours/${tour.imageCover}`],
                amount:tour.price * 100,
                currency:'usd',
                quantity:1
            }
        ]
    })
    res.status(200).json({
        status:"success",
        session:session
    })
})