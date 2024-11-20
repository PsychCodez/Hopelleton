const db = require('../db/db.js');

const paymentTable = `
CREATE TABLE IF NOT EXISTS Payment (
    PaymentID INT PRIMARY KEY AUTO_INCREMENT,
    BookingID INT,
    PaymentMethod VARCHAR(50),
    TransactionID VARCHAR(100),
    PaymentAmount DECIMAL(10, 2),
    PaymentDate DATE,
    PaymentStatus VARCHAR(50));
`;

// const updateReferences1 = `ALTER TABLE Booking ADD FOREIGN KEY (PaymentID) REFERENCES Payment(PaymentID);`;
const updateReferences2 = `ALTER TABLE Payment ADD FOREIGN KEY (BookingID) REFERENCES Booking(BookingID);`;

db.query(paymentTable, (err, result) => {
    if (err) {
        console.error('Error creating Payment table:', err);
    } else {
        console.log('Payment table created or already exists.');
    }
});
db.query(updateReferences1, (err, result) => {
    if (err) {
        console.error('Error updating Booking Referenes:', err);
    } else {
        console.log('updating Booking Referenes sucess.');
    }
});
db.query(updateReferences2, (err, result) => {
    if (err) {
        console.error('Error creating Payment References:', err);
    } else {
        console.log('updating Payment Referenes sucess');
    }
});


module.exports = {
    createPayment: (bookingId, paymentMethod, transactionId, paymentAmount, paymentDate, paymentStatus, callback) => {
        const query = `
            INSERT INTO Payment (BookingID, PaymentMethod, TransactionID, PaymentAmount, PaymentDate, PaymentStatus) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [bookingId, paymentMethod, transactionId, paymentAmount, paymentDate, paymentStatus], callback);
    },

    findPaymentById: (paymentId, callback) => {
        const query = `SELECT * FROM Payment WHERE PaymentID = ?`;
        db.query(query, [paymentId], callback);
    },

    updatePayment: (paymentId, paymentStatus, callback) => {
        const query = `
            UPDATE Payment 
            SET PaymentStatus = ? 
            WHERE PaymentID = ?
        `;
        db.query(query, [paymentStatus, paymentId], callback);
    },

    deletePayment: (paymentId, callback) => {
        const query = `DELETE FROM Payment WHERE PaymentID = ?`;
        db.query(query, [paymentId], callback);
    },

    getAllPayments: (callback) => {
        const query = `SELECT * FROM Payment`;
        db.query(query, callback);
    }
};


