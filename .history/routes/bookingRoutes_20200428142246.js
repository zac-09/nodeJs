const express = require('express');
const router = express.Router();
const bookingController  = require('./../controllers/bookingController')
const authController = require('./../controllers/authController')

 router.get('/checkout-session/:tourId',authController.protect,bookingController.getCheckoutSession)
router.get('/',bookingController.getAllBookings);
router.get('/:id',bookingController.getBooking);

router.use(authController.protect,authController.restrictTo('admin'))
router.post('/',bookingController.createBooking);
router.patch('/update/:id',bookingController.updateBooking)
router.delete('/:id')

module.exports = router; 