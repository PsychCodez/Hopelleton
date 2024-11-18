const db = require('../db/db.js');



const guestTable = `
CREATE TABLE IF NOT EXISTS Guest (
    GuestID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNIQUE,
    GuestRating DECIMAL(2,1),
    NumberOfBookings INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);
`;



db.query(guestTable, (err, result) => {
    if (err) {
        console.error('Error creating Guest table:', err);
    } else {
        console.log('Guest table created or already exists.');
    }
});


module.exports = {
    createGuest: (userId, guestRating, numberOfBookings, callback) => {
        const query = `
            INSERT INTO Guest (UserID, GuestRating, NumberOfBookings) 
            VALUES (?, ?, ?)
        `;
        db.query(query, [userId, guestRating, numberOfBookings], callback);
    },

    findGuestById: (guestId, callback) => {
        const query = `SELECT * FROM Guest WHERE GuestID = ?`;
        db.query(query, [guestId], callback);
    },

    updateGuest: (guestId, guestRating, numberOfBookings, callback) => {
        const query = `
            UPDATE Guest 
            SET GuestRating = ?, NumberOfBookings = ? 
            WHERE GuestID = ?
        `;
        db.query(query, [guestRating, numberOfBookings, guestId], callback);
    },

    deleteGuest: (guestId, callback) => {
        const query = `DELETE FROM Guest WHERE GuestID = ?`;
        db.query(query, [guestId], callback);
    },

    getAllGuests: (callback) => {
        const query = `SELECT * FROM Guest`;
        db.query(query, callback);
    }
};