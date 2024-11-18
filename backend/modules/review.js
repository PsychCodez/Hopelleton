const db = require('../db/db.js');

const reviewTable = `
CREATE TABLE IF NOT EXISTS Review (
    ReviewID INT PRIMARY KEY AUTO_INCREMENT,
    BookingID INT,
    UserID INT,
    Rating DECIMAL(2,1),
    Comment TEXT,
    ReviewDate DATE,
    FOREIGN KEY (BookingID) REFERENCES Booking(BookingID),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);
`;

db.query(reviewTable, (err, result) => {
    if (err) {
        console.error('Error creating Review table:', err);
    } else {
        console.log('Review table created or already exists.');
    }
});

module.exports = {
    createReview: (bookingId, userId, rating, comment, reviewDate, callback) => {
        const query = `
            INSERT INTO Review (BookingID, UserID, Rating, Comment, ReviewDate) 
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(query, [bookingId, userId, rating, comment, reviewDate], callback);
    },

    findReviewById: (reviewId, callback) => {
        const query = `SELECT * FROM Review WHERE ReviewID = ?`;
        db.query(query, [reviewId], callback);
    },

    updateReview: (reviewId, rating, comment, reviewDate, callback) => {
        const query = `
            UPDATE Review 
            SET Rating = ?, Comment = ?, ReviewDate = ? 
            WHERE ReviewID = ?
        `;
        db.query(query, [rating, comment, reviewDate, reviewId], callback);
    },

    deleteReview: (reviewId, callback) => {
        const query = `DELETE FROM Review WHERE ReviewID = ?`;
        db.query(query, [reviewId], callback);
    },

    getAllReviews: (callback) => {
        const query = `SELECT * FROM Review`;
        db.query(query, callback);
    }
};
