// controllers/propertyAmenity.js
const propertyAmenityModule = require('../modules/propertyAmenity.js');

module.exports = {
    createPropertyAmenity: (req, res) => {
        const propAmenData = req.body;  // Data sent in the request body
        
        propertyAmenityModule.createPropertyAmenity(propAmenData, (error, result) => {
            if (error) {
                console.error('Error creating PropAmen:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("Create PropAmen Success");
            return res.status(201).json(result);
        });
    },
    findPropertyAmenityById: (req, res) => {
        const propertyAmenityId = req.params.id;
        propertyAmenityModule.findPropertyAmenityById(propertyAmenityId,(error,result)=> {
            if (error) {
                console.error("Error in finding PropAmen ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found PropAmen ID");
            return res.status(200).json(result);
        })
    },
    getAllPropertyAmenities: (req, res) => {
        propertyAmenityModule.getAllPropertyAmenities((error, results) => {
            if (error) {
                console.error("Error retrieving PropAmen:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    deletePropertyAmenity: (req, res) => {
        const propertyAmenityId = req.params.id;
        propertyAmenityModule.deletePropertyAmenity(propertyAmenityId, (err,result)=> {
            if (err) {
                console.log("PropAmen Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("PropAmen Delete Success");
            return res.status(200).json(result);
        })
    }
};
