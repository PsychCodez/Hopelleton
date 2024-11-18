const db = require('../db/db.js');



const supportTable = `
CREATE TABLE IF NOT EXISTS SupportTicket (
    TicketID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    IssueDescription TEXT,
    IssueType VARCHAR(50),
    Status VARCHAR(50),
    CreatedDate DATE,
    ResolutionDate DATE,
    FOREIGN KEY (UserID) REFERENCES User(UserID)
);
`;

db.query(supportTable, (err, result) => {
    if (err) {
        console.error('Error creating Support table:', err);
    } else {
        console.log('SupportTicket table created or already exists.');
    }
});

module.exports = {
    createTicket: (supportData,callback) => {
        const query = `
            INSERT INTO SupportTicket (UserID, IssueDescription, IssueType, Status, CreatedDate, ResolutionDate) 
            VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [supportData.userId, supportData.issueDescription, supportData.issueType, supportData.status, supportData.createdDate, supportData.resolutionDate]
        
        db.query(query, values, callback);
    },

    findTicketById: (ticketId, callback) => {
        const query = `SELECT * FROM SupportTicket WHERE TicketID = ?`;
        db.query(query, [ticketId], callback);
    },

    updateTicketStatus: (ticketID, updateData, callback) => {
        const query = `
            UPDATE SupportTicket 
            SET Status = ?, ResolutionDate = ? 
            WHERE TicketID = ?
        `;
        values = [ updateData.ticketId, update.status, updateData.resolutionDate, ticketID]
        db.query(query, values, callback);
    },

    deleteTicket: (ticketId, callback) => {
        const query = `DELETE FROM SupportTicket WHERE TicketID = ?`;
        db.query(query, [ticketId], callback);
    },

    getAllTickets: (callback) => {
        const query = `SELECT * FROM SupportTicket`;
        db.query(query, callback);
    }
};
