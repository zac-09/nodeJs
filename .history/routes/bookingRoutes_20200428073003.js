const express = require('express');
const router = express.Router();
const bookingController  = require('./../controllers/bookingController')
const authController = require('./../controllers/authController')

 router.get('/checkout-session/:TourId',authController.protect,bookingController.getCheckoutSession)


module.exports = router; 