const db = require('../db/db.js');


const amenityTable = `
CREATE TABLE IF NOT EXISTS Amenity (
    AmenityID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Description TEXT,
    AdditionalInfo VARCHAR(255)
);
`;


db.query(amenityTable, (err, result) => {
    if (err) {
        console.error('Error creating Amenity table:', err);
    } else {
        console.log('Amenity table created or already exists.');
    }
});


module.exports = {
    createAmenity: (name, description, additionalInfo, callback) => {
        const query = `
            INSERT INTO Amenity (Name, Description, AdditionalInfo) 
            VALUES (?, ?, ?)
        `;
        db.query(query, [name, description, additionalInfo], callback);
    },

    findAmenityById: (amenityId, callback) => {
        const query = `SELECT * FROM Amenity WHERE AmenityID = ?`;
        db.query(query, [amenityId], callback);
    },

    updateAmenity: (amenityId, name, description, additionalInfo, callback) => {
        const query = `
            UPDATE Amenity 
            SET Name = ?, Description = ?, AdditionalInfo = ? 
            WHERE AmenityID = ?
        `;
        db.query(query, [name, description, additionalInfo, amenityId], callback);
    },

    deleteAmenity: (amenityId, callback) => {
        const query = `DELETE FROM Amenity WHERE AmenityID = ?`;
        db.query(query, [amenityId], callback);
    },

    getAllAmenities: (callback) => {
        const query = `SELECT * FROM Amenity`;
        db.query(query, callback);
    }
};
