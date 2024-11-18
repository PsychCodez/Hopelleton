// controllers/payment.js
const paymentModule = require('../modules/payment.js');

module.exports = {
    createPayment: (req, res) => {
        const paymentData = req.body;  // Data sent in the request body
        
        paymentModule.createPayment(paymentData, (error, result) => {
            if (error) {
                console.error('Error creating Payment:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("Payment create success");
            return res.status(201).json(result);
        });
    },
    findPaymentById: (req, res) => {
        const paymentId = req.params.id;
        paymentModule.findPaymentById(paymentId,(error,result)=> {
            if (error) {
                console.error("Error in finding Payment ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found Payment ID");
            return res.status(200).json(result);
        })
    },
    getAllPayments: (req, res) => {
        paymentModule.getAllPayments((error, results) => {
            if (error) {
                console.error("Error retrieving Payments:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updatePayment: (req, res) => {
        const paymentId = req.params.id;
        const updateData = req.body;
        paymentModule.updatePayment(paymentId,updateData, (error,result)=>{
            if (error) {
                console.log("Payment Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("Payment Update Sucessful");
            return res.status(201).json(result);
        });
    },
    deletePayment: (req, res) => {
        const paymentId = req.params.id;
        paymentModule.deletePayment(paymentId, (err,result)=> {
            if (err) {
                console.log("Payment Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("Payment Delete Success");
            return res.status(200).json(result);
        })
    }
};
