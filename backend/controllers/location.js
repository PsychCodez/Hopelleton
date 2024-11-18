// controllers/location.js
const locationModule = require('../modules/location.js');

module.exports = {
    createLocation: (req, res) => {
        const locData = req.body;
        locationModule.createLocation(locData, (error, result) => {
            if (error) {
                console.error('Error creating Location:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("Location create success");
            return res.status(201).json(result);
        });
    },
    findLocationById: (req, res) => {
        const propertyId = req.params.id;
        locationModule.findLocationByPropertyId(propertyId,(error,result)=> {
            if (error) {
                console.error("Error in finding Prop ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found Prop ID");
            return res.status(200).json(result);
        })
    },
    getAllLocations: (req, res) => {
        locationModule.getAllLocations((error, results) => {
            if (error) {
                console.error("Error retrieving Locations:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updateLocation: (req, res) => {
        const propertyId = req.params.id;
        const updateData = req.body;
        locationModule.updateLocation(propertyId,updateData, (error,result)=>{
            if (error) {
                console.log("Location Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("Location Update Sucessful");
            return res.status(201).json(result);
        });
    },
    deleteLocation: (req, res) => {
        const propertyId = req.params.id;
        locationModule.deleteLocation(propertyId, (err,result)=> {
            if (err) {
                console.log("Location Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("Location Delete Success");
            return res.status(200).json(result);
        })
    }
};
