// models/user.js
const db = require('../db/db.js');

// SQL Query to create Users table
const createUserTable = `
    CREATE TABLE IF NOT EXISTS User (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(100),
    PhoneNumber VARCHAR(15),
    ProfilePicture VARCHAR(255),
    VerificationStatus BOOLEAN,
    DateJoined DATE
    );
`;

// Execute the query
db.query(createUserTable, (err, result) => {
    if (err) {
        console.error('Error creating User table:', err);
    } else {
        console.log('Users table created or already exists.');
    }
});

module.exports = {
    createUser : (userData, callback) => {
        const query = `INSERT INTO User (Name, Email, Password, PhoneNumber, ProfilePicture, VerificationStatus, DateJoined) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [userData.name, userData.email, userData.password, userData.phoneNumber, userData.profilePicture,  userData.verificationStatus, userData.dateJoined];
        db.query(query, values, callback);
    },
    findUserById : (id, callback) => {
        const query = `SELECT * FROM User WHERE UserID = ?`;
        db.query(query, [id], callback);
    },

    updateUser : (id, userData, callback) => {
        const query = `UPDATE User SET Name = ?, Email = ?, Password = ?, PhoneNumber = ?, ProfilePicture = ?,  VerificationStatus = ?, DateJoined = ? WHERE UserID = ?`;
        const values = [userData.name, userData.email, userData.password, userData.phoneNumber, userData.profilePicture, userData.verificationStatus, userData.dateJoined, id];
        db.query(query, values, callback);
    },

    deleteUser : (id, callback) => {
        const query = `DELETE FROM User WHERE UserID = ?`;
        db.query(query, [id], callback);
    },

    getAllUsers: (callback) => {
        const query = `SELECT * FROM User`;
        db.query(query, callback);
    }
};
