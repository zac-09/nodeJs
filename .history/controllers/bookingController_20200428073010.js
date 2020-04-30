const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Tour = require('./../models/tourModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Email = require('./../utils/email');

exports.getCheckoutSession = catchAsync(async (req,res,next) =>{
    // get currently booked tour
    const tour = await Tour.findById(req.params.tourId);
})