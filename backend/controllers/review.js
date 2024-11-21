// controllers/review.js
const reviewModule = require('../modules/review.js');

module.exports = {
    createReview: (req, res) => {
        const reviewData = req.body;  // Data sent in the request body
        
        reviewModule.createReview(reviewData, (error, result) => {
            if (error) {
                console.error('Error creating Review:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("Review Creation Success");
            return res.status(201).json(result);
        });
    },
    findReviewById: (req, res) => {
        const reviewId = req.params.id;

        reviewModule.findReviewById(reviewId,(error,result)=> {
            if (error) {
                console.error("Error in finding Review ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found Review ID");
            return res.status(200).json(result);
        })
    },
    getAllReviews: (req, res) => {
        reviewModule.getAllReviews((error, results) => {
            if (error) {
                console.error("Error retrieving users:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updateReview: (req, res) => {
        const reviewId = req.params.id
        const updateData = req.body;
        userModule.updateUser(reviewId,updateData, (error,result)=>{
            if (error) {
                console.log("Review Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("Review Update Sucessful");
            return res.status(201).json(result);
        })
    },
    deleteReview: (req, res) => {
        const reviewId = req.params.id;
        reviewModule.deleteReview(reviewId, (err,result)=> {
            if (err) {
                console.log("Review Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("Review Delete Success");
            return res.status(200).json(result);
        })
    }
};
