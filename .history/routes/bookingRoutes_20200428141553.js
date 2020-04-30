const express = require('express');
const router = express.Router();
const bookingController  = require('./../controllers/bookingController')
const authController = require('./../controllers/authController')

 router.get('/checkout-session/:tourId',authController.protect,bookingController.getCheckoutSession)
router.get('/',bookingController.getAllBookings);
router.get('/:bookingId',bookingController.getBooking);

router.use(authController.protect,authController.restrictTo('admin'))
router.post('/',bookingController.createBookings);
router.patch('/update/:bookingId',bookingController.updateBooking)
router.delete('/:bookingId')

module.exports = router; 