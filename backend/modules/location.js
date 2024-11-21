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
    createLocation: (propData, callback) => {
        const query = `
            INSERT INTO Location (PropertyID, City, State, Country, Latitude, Longitude) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(query, [propData.propertyId, propData.city, propData.state, propData.country, propData.latitude, propData.longitude], callback);
    },

    findLocationByPropertyId: (propertyId, callback) => {
        const query = `SELECT * FROM Location WHERE PropertyID = ?`;
        db.query(query, [propertyId], callback);
    },

    updateLocation: (propData, callback) => {
        const query = `
            UPDATE Location 
            SET City = ?, State = ?, Country = ?, Latitude = ?, Longitude = ? 
            WHERE PropertyID = ?
        `;
        db.query(query, [propData.city, propData.state, propData.country, propData.latitude, propData.longitude, propData.propertyId], callback);
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
