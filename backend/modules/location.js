const db = require('../db/db.js');


const locationTable = `
CREATE TABLE IF NOT EXISTS Location (
    PropertyID INT PRIMARY KEY,
    City VARCHAR(50),
    State VARCHAR(50),
    Country VARCHAR(50),
    Latitude DECIMAL(9, 6),
    Longitude DECIMAL(9, 6),
    FOREIGN KEY (PropertyID) REFERENCES Property(PropertyID)
);
`;

db.query(locationTable, (err, result) => {
    if (err) {
        console.error('Error creating Location table:', err);
    } else {
        console.log('Location table created or already exists.');
    }
});

module.exports = {
    createLocation: (propertyId, city, state, country, latitude, longitude, callback) => {
        const query = `
            INSERT INTO Location (PropertyID, City, State, Country, Latitude, Longitude) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [propertyId, city, state, country, latitude, longitude], callback);
    },

    findLocationByPropertyId: (propertyId, callback) => {
        const query = `SELECT * FROM Location WHERE PropertyID = ?`;
        db.query(query, [propertyId], callback);
    },

    updateLocation: (propertyId, city, state, country, latitude, longitude, callback) => {
        const query = `
            UPDATE Location 
            SET City = ?, State = ?, Country = ?, Latitude = ?, Longitude = ? 
            WHERE PropertyID = ?
        `;
        db.query(query, [city, state, country, latitude, longitude, propertyId], callback);
    },

    deleteLocation: (propertyId, callback) => {
        const query = `DELETE FROM Location WHERE PropertyID = ?`;
        db.query(query, [propertyId], callback);
    },

    getAllLocations: (callback) => {
        const query = `SELECT * FROM Location`;
        db.query(query, callback);
    }
};
