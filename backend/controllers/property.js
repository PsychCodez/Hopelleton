// controllers/property.js
const propertyModule = require('../modules/property.js');

module.exports = {
    createProperty: (req, res) => {
        const propertyData = req.body;  // Data sent in the request body
        
        propertyModule.createUser(propertyData, (error, result) => {
            if (error) {
                console.error('Error creating Property:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("Property Create Success");
            return res.status(201).json(result);
        });
    },
    findPropertyById: (req, res) => {
        const propertyId = req.params.id;
        propertyModule.findPropertyById(propertyId,(error,result)=> {
            if (error) {
                console.error("Error in finding Prop ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found Prop ID");
            return res.status(200).json(result);
        });
    },
    getAllProperties: (req, res) => {
        propertyModule.getAllProperties((error, results) => {
            if (error) {
                console.error("Error retrieving Props:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updateProperty: (req, res) => {
        const propertyId = req.params.id
        const updateData = req.body;
        propertyModule.updateProperty(propertyId,updateData, (error,result)=>{
            if (error) {
                console.log("Prop Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("Prop Update Sucessful");
            return res.status(201).json(result);
        })
    },
    deleteProperty: (req, res) => {
        const propertyId = req.params.id;
        propertyModule.deleteProperty(propertyId, (err,result)=> {
            if (err) {
                console.log("Property Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("Property Delete Success");
            return res.status(200).json(result);
        })
    }
};
