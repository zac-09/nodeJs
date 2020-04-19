const express = require('express');
const router = express.Router();
const viewsController = require('./../controllers/viewsController')
const authController = require('./../controllers/authController')
 router.use(authController.isLoggedIn)
  router.get('/',viewsController.getOverView);
  router.get('/tour', viewsController.getTour);
  router.get('/tours/:slug',viewsController.getTour)
  router.get('/login',viewsController.login)
module.exports = router;