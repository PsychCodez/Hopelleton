const db = require('../db/db.js');


const propertyAmenityTable = `
CREATE TABLE IF NOT EXISTS PropertyAmenity (
    PropertyAmenityID INT PRIMARY KEY AUTO_INCREMENT,
    PropertyID INT,
    AmenityID INT,
    FOREIGN KEY (PropertyID) REFERENCES Property(PropertyID),
    FOREIGN KEY (AmenityID) REFERENCES Amenity(AmenityID)
);
`;


db.query(propertyAmenityTable, (err, result) => {
    if (err) {
        console.error('Error creating PropertyAmenity table:', err);
    } else {
        console.log('PropertyAmenity table created or already exists.');
    }
});


module.exports = {
    createPropertyAmenity: (propertyId, amenityId, callback) => {
        const query = `
            INSERT INTO PropertyAmenity (PropertyID, AmenityID) 
            VALUES (?, ?)
        `;
        db.query(query, [propertyId, amenityId], callback);
    },

    findPropertyAmenityById: (propertyAmenityId, callback) => {
        const query = `SELECT * FROM PropertyAmenity WHERE PropertyAmenityID = ?`;
        db.query(query, [propertyAmenityId], callback);
    },

    deletePropertyAmenity: (propertyAmenityId, callback) => {
        const query = `DELETE FROM PropertyAmenity WHERE PropertyAmenityID = ?`;
        db.query(query, [propertyAmenityId], callback);
    },

    getAllPropertyAmenities: (callback) => {
        const query = `SELECT * FROM PropertyAmenity`;
        db.query(query, callback);
    }
};


