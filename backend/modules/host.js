const db = require('../db/db.js');


const hostTable = `
CREATE TABLE IF NOT EXISTS Host (
    HostID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNIQUE,
    VerificationStatus BOOLEAN,
    HostRating DECIMAL(2,1),
    NumberOfProperties INT,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);
`;


db.query(hostTable, (err, result) => {
    if (err) {
        console.error('Error creating Host table:', err);
    } else {
        console.log('Host table created or already exists.');
    }
});

module.exports = {
    createHost: (userId, verificationStatus, hostRating, numberOfProperties, callback) => {
        const query = `
            INSERT INTO Host (UserID, VerificationStatus, HostRating, NumberOfProperties) 
            VALUES (?, ?, ?, ?)
        `;
        db.query(query, [userId, verificationStatus, hostRating, numberOfProperties], callback);
    },

    findHostById: (hostId, callback) => {
        const query = `SELECT * FROM Host WHERE HostID = ?`;
        db.query(query, [hostId], callback);
    },

    updateHost: (hostId, verificationStatus, hostRating, numberOfProperties, callback) => {
        const query = `
            UPDATE Host 
            SET VerificationStatus = ?, HostRating = ?, NumberOfProperties = ? 
            WHERE HostID = ?
        `;
        db.query(query, [verificationStatus, hostRating, numberOfProperties, hostId], callback);
    },

    deleteHost: (hostId, callback) => {
        const query = `DELETE FROM Host WHERE HostID = ?`;
        db.query(query, [hostId], callback);
    },

    getAllHosts: (callback) => {
        const query = `SELECT * FROM Host`;
        db.query(query, callback);
    }
};