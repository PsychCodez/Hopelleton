// controllers/host.js
const hostModule = require('../modules/host.js');

module.exports = {
    createHost: (req, res) => {
        const hostData = req.body;
        hostModule.createHost(hostData, (error, result) => {
            if (error) {
                console.error('Error creating Host:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("Host create success");
            return res.status(201).json(result);
        });
    },
    findHostById: (req, res) => {
        const hostId = req.params.id;
        hostModule.findHostById(hostId,(error,result)=> {
            if (error) {
                console.error("Error in finding Host ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found Host ID");
            return res.status(200).json(result);
        })
    },
    getAllHosts: (req, res) => {
        hostModule.getAllHosts((error, results) => {
            if (error) {
                console.error("Error retrieving Hosts:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updateHost: (req, res) => {
        const hostId = req.params.id;
        const updateData = req.body;
        hostModule.updateHost(hostId,updateData, (error,result)=>{
            if (error) {
                console.log("Host Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("Host Update Sucessful");
            return res.status(201).json(result);
        });
    },
    deleteHost: (req, res) => {
        const hostId = req.params.id;
        hostModule.deleteHost(hostId, (err,result)=> {
            if (err) {
                console.log("Host Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("Host Delete Success");
            return res.status(200).json(result);
        })
    }
};
