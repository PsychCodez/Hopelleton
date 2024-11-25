// models/booking.js
const db = require('../db/db.js');

// SQL Query to create Bookings table
const createBookingTable = `
    CREATE TABLE IF NOT EXISTS Booking (
    BookingID INT PRIMARY KEY AUTO_INCREMENT,
    PropertyID INT,
    UserID INT,
    CheckInDate DATE,
    CheckOutDate DATE,
    TotalCost DECIMAL(10, 2),
    BookingStatus VARCHAR(50),
    CreatedDate DATE,
    UpdatedDate DATE
);

`;

// Execute the query
db.query(createBookingTable, (err, result) => {
    if (err) {
        console.error('Error creating Bookings table:', err);
    } else {
        console.log('Bookings table created or already exists.');
    }
});

module.exports = {
    // Create a booking
    createBooking: (bookingData, callback) => {
        const query = `
            INSERT INTO Booking (UserID, PropertyID, CheckInDate, CheckOutDate, TotalCost, BookingStatus, CreatedDate, UpdatedDate) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [bookingData.userId, bookingData.propertyId, bookingData.checkInDate, bookingData.checkOutDate, bookingData.totalCost, bookingData.bookingStatus, bookingData.createdDate, bookingData.updatedDate];
        db.query(query, values, callback);
    },

    // Find a booking by ID
    findBookingById: (bookingId, callback) => {
        const query = `SELECT * FROM Booking WHERE BookingID = ?`;
        db.query(query, [bookingId], callback);
    },

    // Update a booking
    updateBooking: (bookingData, callback) => {
        const query = `
            UPDATE Booking 
            SET CheckInDate = ?, CheckOutDate = ?, TotalCost = ?, BookingStatus = ?, UpdatedDate = ? 
            WHERE BookingID = ?
        `;
        const values = [bookingData.checkInDate, bookingData.checkOutDate, bookingData.totalCost, bookingData.bookingStatus, bookingData.updatedDate, bookingData.bookingId];
        db.query(query, values, callback);
    },

    // Delete a booking
    deleteBooking: (bookingId, callback) => {
        const query = `DELETE FROM Booking WHERE BookingID = ?`;
        db.query(query, [bookingId], callback);
    },

    // Get all bookings
    getAllBookings: (callback) => {
        const query = `SELECT * FROM Booking`;
        db.query(query, callback);
    }
};

