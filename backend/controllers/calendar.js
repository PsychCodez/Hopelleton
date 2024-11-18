// controllers/calendar.js
const calendarModule = require('../modules/calendar.js');

module.exports = {
    createAvailability: (req, res) => {
        const calData = req.body;  // Data sent in the request body
        
        calendarModule.createAvailability(calData, (error, result) => {
            if (error) {
                console.error('Error creating calendar:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("calendar create success");
            return res.status(201).json(result);
        });
    },
    findAvailabilityById: (req, res) => {
        const availabilityId = req.params.id;
        calendarModule.findAvailabilityById(availabilityId,(error,result)=> {
            if (error) {
                console.error("Error in finding calendar ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found calendar ID");
            return res.status(200).json(result);
        })
    },
    getAllAvailabilities: (req, res) => {
        calendarModule.getAllAvailabilities((error, results) => {
            if (error) {
                console.error("Error retrieving calendars:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updateAvailability: (req, res) => {
        const availabilityId = req.params.id;
        const updateData = req.body;
        calendarModule.updateAvailability(availabilityId,updateData, (error,result)=>{
            if (error) {
                console.log("calendar Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("calendar Update Sucessful");
            return res.status(201).json(result);
        });
    },
    deleteAvailability: (req, res) => {
        const availabilityId = req.params.id;
        calendarModule.deleteAvailability(availabilityId, (err,result)=> {
            if (err) {
                console.log("calendar Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("calendar Delete Success");
            return res.status(200).json(result);
        })
    }
};
