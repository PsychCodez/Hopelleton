const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.js');

router.post('/', reviewController.createReview);
router.get('/:id', reviewController.findReviewById);
router.get('/', reviewController.getAllReviews);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;
