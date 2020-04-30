const express = require('express');
const router = express.Router();
const viewsController = require('./../controllers/viewsController')
const authController = require('./../controllers/authController')
const bookingController  = require('./../controllers/bookingController')
const cors = require('cors')
 
router.use(cors())
//  app.use(cors())
router.options('*', cors())
  router.get('/',bookingController.createBookingCheckout,authController.isLoggedIn,viewsController.getOverView);
  router.get('/tour',authController.isLoggedIn, viewsController.getTour);
  router.get('/tours/:slug',authController.isLoggedIn,viewsController.getTour)
  router.get('/login',authController.isLoggedIn,viewsController.login)
  router.get('/me',authController.protect,viewsController.getAccount)
  router.post('/submit-user-data',authController.protect,viewsController.updateUserData)
module.exports = router; 