// models/property.js
const db = require('../db/db.js');

// SQL Query to create Properties table
const createPropertyTable = `
    CREATE TABLE IF NOT EXISTS Property (
    PropertyID INT PRIMARY KEY AUTO_INCREMENT,
    HostID INT,
    Title VARCHAR(255),
    Description TEXT,
    AverageRating DECIMAL(10,2),
    MaxGuests INT,
    PricePerNight DECIMAL(10, 2),
    Rules TEXT,
    CreatedDate DATE,
    UpdatedDate DATE,
    FOREIGN KEY (HostID) REFERENCES Host(HostID));
`;

// Execute the query
db.query(createPropertyTable, (err, result) => {
    if (err) {
        console.error('Error creating Properties table:', err);
    } else {
        console.log('Properties table created or already exists.');
    }
});


module.exports = {
    createProperty : (propertyData, callback) => {
        const query = `INSERT INTO Property (HostID, Title, Description, Address, AverageRating, MaxGuests, PricePerNight, Rules, CreatedDate, UpdatedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const values = [propertyData.hostId, propertyData.title, propertyData.description, propertyData.address, propertyData.AverageRating, propertyData.maxGuests, propertyData.pricePerNight, propertyData.rules, propertyData.createdDate, propertyData.updatedDate];
        db.query(query, values, callback);
    },
    
    getPropertyById : (id, callback) => {
        const query = `SELECT * FROM Property WHERE PropertyID = ?`;
        db.query(query, [id], callback);
    },
    
    updateProperty : (id, propertyData, callback) => {
        const query = `UPDATE Property SET HostID = ?, Title = ?, Description = ?, Address = ?, Averagerating = ?, MaxGuests = ?, PricePerNight = ?, Rules = ?, CreatedDate = ?, UpdatedDate = ? WHERE PropertyID = ?`;
        const values = [propertyData.hostId, propertyData.title, propertyData.description, propertyData.address, propertyData.AverageRating, propertyData.maxGuests, propertyData.pricePerNight, propertyData.rules, propertyData.createdDate, propertyData.updatedDate, id];
        db.query(query, values, callback);
    },
    
    deleteProperty : (id, callback) => {
        const query = `DELETE FROM Property WHERE PropertyID = ?`;
        db.query(query, [id], callback);
    },
    
    getAllProperties : (callback) => {
        const query = `SELECT * FROM Properties`;
        db.query(query, callback);
    }
};



