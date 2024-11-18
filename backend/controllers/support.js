// controllers/support.js
const supportModule = require('../modules/support.js');

module.exports = {
    createSupportTicket: (req, res) => {
        const supportData = req.body;  // Data sent in the request body
        
        supportModule.createTicket(supportData, (error, result) => {
            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("Success");
            return res.status(201).json(result);
        });

    },
    findSupportTicketById: (req, res) => {
        const ticketId = req.params.id;
        supportModule.findTicketById(ticketId,(error,result)=> {
            if (error) {
                console.error("Error in finding ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found ID");
            return res.status(200).json(result);
        })

    },
    getAllSupportTickets: (req, res) => {
        supportModule.getAllTickets((error, results) => {
            if (error) {
                console.error("Error retrieving SupportTickets:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });

    },
    updateSupportTicket: (req, res) => {
        const ticketId = req.params.id;
        const updateData = req.body;

        supportModule.updateSupportTicket(ticketId,updateData,(error,result)=>{
            if (error) {
                console.log("Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("Update Sucessful");
            return res.status(201).json(result);
        })
    },
    deleteSupportTicket: (req, res) => {
        const ticketId = req.params.id;

        supportModule.deleteSupportTicket(ticketId, (err,result)=> {
            if (err) {
                console.log("Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("Successfull Delete");
            return res.status(200).json(result);
        })
    }
};
