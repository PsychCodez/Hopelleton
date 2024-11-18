// controllers/guest.js
const guestModule = require('../modules/guest.js');

module.exports = {
    createGuest: (req, res) => {
        const guestData = req.body;  // Data sent in the request body
        
        guestModule.createGuest(guestData, (error, result) => {
            if (error) {
                console.error('Error creating Guest:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("Guest create success");
            return res.status(201).json(result);
        });
    },
    findGuestById: (req, res) => {
        const guestId = req.params.id;
        guestModule.findGuestById(guestId,(error,result)=> {
            if (error) {
                console.error("Error in finding Guest ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found Guest ID");
            return res.status(200).json(result);
        })
    },
    getAllGuests: (req, res) => {
        guestModule.getAllGuests((error, results) => {
            if (error) {
                console.error("Error retrieving Guests:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updateGuest: (req, res) => {
        const guestId = req.params.id;
        const updateData = req.body;
        guestModule.updateGuest(guestId,updateData, (error,result)=>{
            if (error) {
                console.log("Guest Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("Guest Update Sucessful");
            return res.status(201).json(result);
        });
    },
    deleteGuest: (req, res) => {
        const guestId = req.params.id;
        guestModule.deleteGuest(guestId, (err,result)=> {
            if (err) {
                console.log("Guest Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("Guest Delete Success");
            return res.status(200).json(result);
        })
    }
};
