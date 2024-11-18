// controllers/user.js
const db = require('../db/db.js');
const userModule = require('../modules/user.js');

module.exports = {
    createUser: (req, res) => {
        const userData = req.body;  // Data sent in the request body
        
        userModule.createUser(userData, (error, result) => {
            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("Success");
            return res.status(201).json(result);  // Send the success response to the client
        });
    },

    findUserById: (userId) => {
        const query = `SELECT * FROM User WHERE UserID = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, [userId], (error, result) => {
                if (error) {
                    return reject(error); // Reject on error
                }
                resolve(result); // Resolve with the result
            });
        });
    },

    getAllUsers: (req, res) => {
        const query = `SELECT * FROM User`;
        db.query(query, (error, results) => {
            if (error) {
                console.error("Error retrieving users:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updateUser: (userId, name, email, password, phoneNumber, profilePicture, verificationStatus, dateJoined) => {
        const query = `UPDATE User SET Name = ?, Email = ?, Password = ?, PhoneNumber = ?, ProfilePicture = ?, VerificationStatus = ?, DateJoined = ? WHERE UserID = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, [name, email, password, phoneNumber, profilePicture, verificationStatus, dateJoined, userId], (error, result) => {
                if (error) {
                    return reject(error); // Reject on error
                }
                resolve(result); // Resolve with the result
            });
        });
    },

    deleteUser: (userId) => {
        const query = `DELETE FROM User WHERE UserID = ?`;

        return new Promise((resolve, reject) => {
            db.query(query, [userId], (error, result) => {
                if (error) {
                    return reject(error); // Reject on error
                }
                resolve(result); // Resolve with the result
            });
        });
    }
};
