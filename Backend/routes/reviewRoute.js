const express = require('express');
const { getAllReviews, createReview, getSingleReview, deleteReview, updateReview, getProductReview } = require('../controllers/reviewController');
const { authenticateUser } = require('../middleware/authentication');
const review = require('../models/review');
const router = express.Router();

router.route('/').get(getAllReviews).post(authenticateUser, createReview);
router.route('/product/details/:id').get(authenticateUser, getProductReview)
router.route('/:id').get(getSingleReview).delete(authenticateUser, deleteReview).patch(authenticateUser, updateReview);


module.exports = router;