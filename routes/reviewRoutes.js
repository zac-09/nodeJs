const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');
const express = require('express');

const router = express.Router({ mergeParams: true });
router.use(authController.protect);
router.get('/', reviewController.getAllReviews);
router.post(
  '/',

  authController.restrictTo('user'),
  reviewController.setTourUserIds,
  reviewController.createReview
);
router.get('/:id', reviewController.getReview);
router
  .route('/:id')
  .delete(authController.restrictTo('user','admin'),reviewController.deleteReview)
  .patch(authController.restrictTo('user','admin'),reviewController.updateReview);
module.exports = router;
