const db = require('../db/db.js');


const idVerificationTable = `
CREATE TABLE IF NOT EXISTS IdentityVerification (
    VerificationID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    DocumentType VARCHAR(50),
    DocumentNumber VARCHAR(100),
    VerificationDate DATE,
    VerificationStatus VARCHAR(50),
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);
`;

db.query(idVerificationTable, (err, result) => {
    if (err) {
        console.error('Error creating IDVerif table:', err);
    } else {
        console.log('IdentityVerification table created or already exists.');
    }
});

module.exports = {
    createVerification: (userId, documentType, documentNumber, verificationDate, verificationStatus, callback) => {
        const query = `
            INSERT INTO IdentityVerification (UserID, DocumentType, DocumentNumber, VerificationDate, VerificationStatus) 
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(query, [userId, documentType, documentNumber, verificationDate, verificationStatus], callback);
    },

    findVerificationById: (verificationId, callback) => {
        const query = `SELECT * FROM IdentityVerification WHERE VerificationID = ?`;
        db.query(query, [verificationId], callback);
    },

    updateVerification: (verificationId, documentType, documentNumber, verificationDate, verificationStatus, callback) => {
        const query = `
            UPDATE IdentityVerification 
            SET DocumentType = ?, DocumentNumber = ?, VerificationDate = ?, VerificationStatus = ? 
            WHERE VerificationID = ?
        `;
        db.query(query, [documentType, documentNumber, verificationDate, verificationStatus, verificationId], callback);
    },

    deleteVerification: (verificationId, callback) => {
        const query = `DELETE FROM IdentityVerification WHERE VerificationID = ?`;
        db.query(query, [verificationId], callback);
    },

    getAllVerifications: (callback) => {
        const query = `SELECT * FROM IdentityVerification`;
        db.query(query, callback);
    }
};

