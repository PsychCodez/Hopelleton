const db = require('../db/db.js');


const calendarTable = `
CREATE TABLE IF NOT EXISTS CalendarAvailability (
    AvailabilityID INT PRIMARY KEY AUTO_INCREMENT,
    PropertyID INT,
    Date DATE,
    IsAvailable BOOLEAN,
    Notes VARCHAR(255),
    FOREIGN KEY (PropertyID) REFERENCES Property(PropertyID)
);
`;


db.query(calendarTable, (err, result) => {
    if (err) {
        console.error('Error creating Calendar table:', err);
    } else {
        console.log('CalendarAvailability table created or already exists.');
    }
});

module.exports = {
    createAvailability: (calendarData, callback) => {
        const query = `
            INSERT INTO CalendarAvailability (PropertyID, Date, IsAvailable, Notes) 
            VALUES (?, ?, ?, ?)
        `;
        db.query(query, [calendarData.propertyId, calendarData.date, calendarData.isAvailable, calendarData.notes], callback);
    },

    findAvailabilityById: (availabilityId, callback) => {
        const query = `SELECT * FROM CalendarAvailability WHERE AvailabilityID = ?`;
        db.query(query, [availabilityId], callback);
    },

    updateAvailability: (calendarData, callback) => {
        const query = `
            UPDATE CalendarAvailability 
            SET Date = ?, IsAvailable = ?, Notes = ? 
            WHERE AvailabilityID = ?
        `;
        db.query(query, [calendarData.date, calendarData.isAvailable, calendarData.notes, calendarData.availabilityId], callback);
    },

    deleteAvailability: (availabilityId, callback) => {
        const query = `DELETE FROM CalendarAvailability WHERE AvailabilityID = ?`;
        db.query(query, [availabilityId], callback);
    },

    getAllAvailabilities: (callback) => {
        const query = `SELECT * FROM CalendarAvailability`;
        db.query(query, callback);
    }
};
