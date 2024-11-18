// controllers/amenity.js
const amenityModule = require('../modules/amenity.js');

module.exports = {
    createAmenity: (req, res) => {
        const amenityData = req.body;  // Data sent in the request body
        
        amenityModule.createAmenity(amenityData, (error, result) => {
            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("User create success");
            return res.status(201).json(result);
        });
    },
    findAmenityById: (req, res) => {
        const amenityId = req.params.id;
        amenityModule.findAmenityById(amenityId,(error,result)=> {
            if (error) {
                console.error("Error in finding User ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found User ID");
            return res.status(200).json(result);
        })
    },
    getAllAmenities: (req, res) => {
        amenityModule.getAllAmenities((error, results) => {
            if (error) {
                console.error("Error retrieving users:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updateAmenity: (req, res) => {
        const amenityId = req.params.id;
        const updateData = req.body;
        amenityModule.updateAmenity(amenityId,updateData, (error,result)=>{
            if (error) {
                console.log("User Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("User Update Sucessful");
            return res.status(201).json(result);
        });
    },
    deleteAmenity: (req, res) => {
        const amenityId = req.params.id;
        amenityModule.deleteAmenity(amenityId, (err,result)=> {
            if (err) {
                console.log("User Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("User Delete Success");
            return res.status(200).json(result);
        })
    }
};
