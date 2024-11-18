// controllers/identityVerification.js
const veriModule = require('../modules/identityVerification.js');

module.exports = {
    createVerification: (req, res) => {
        const verificationData = req.body;  // Data sent in the request body
        
        veriModule.createVerification(verificationData, (error, result) => {
            if (error) {
                console.error('Error creating verifying:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("verifying create success");
            return res.status(201).json(result);
        });
    },
    findVerificationById: (req, res) => {
        const verificationId = req.params.id;
        veriModule.findVerificationById(verificationId,(error,result)=> {
            if (error) {
                console.error("Error in finding verifying ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found verifying ID");
            return res.status(200).json(result);
        })
    },
    getAllVerifications: (req, res) => {
        veriModule.getAllVerifications((error, results) => {
            if (error) {
                console.error("Error retrieving verifyings:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updateVerification: (req, res) => {
        const verificationId = req.params.id;
        const updateData = req.body;
        veriModule.updateVerification(verificationId,updateData, (error,result)=>{
            if (error) {
                console.log("verifying Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("verifying Update Sucessful");
            return res.status(201).json(result);
        });
    },
    deleteVerification: (req, res) => {
        const verificationId = req.params.id;
        veriModule.deleteVerification(verificationId, (err,result)=> {
            if (err) {
                console.log("verifying Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("verifying Delete Success");
            return res.status(200).json(result);
        })
    }
};
