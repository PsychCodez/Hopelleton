// controllers/user.js
const userModule = require('../modules/user.js');

module.exports = {
    createUser: (req, res) => {
        const userData = req.body;  // Data sent in the request body
        
        userModule.createUser(userData, (error, result) => {
            if (error) {
                console.error('Error creating user:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("User create success");
            return res.status(201).json(result);
        });
    },

    findUserById: (req,res) => {
        const userId = req.params.id

        userModule.findUserById(userId,(error,result)=> {
            if (error) {
                console.error("Error in finding User ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found User ID");
            return res.status(200).json(result);
        })
    },

    getAllUsers: (req, res) => {
        userModule.getAllUsers((error, results) => {
            if (error) {
                console.error("Error retrieving users:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updateUser: (req,res) => {
        const userId = req.params.id
        const updateData = req.body;
        userModule.updateUser(userId,updateData, (error,result)=>{
            if (error) {
                console.log("User Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("User Update Sucessful");
            return res.status(201).json(result);
        });
    },

    deleteUser: (req,res)=> {
        const userId = req.params.id;

        userModule.deleteUser(userId, (err,result)=> {
            if (err) {
                console.log("User Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("User Delete Success");
            return res.status(200).json(result);
        })
    },
};
