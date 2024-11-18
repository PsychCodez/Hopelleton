// controllers/booking.js
const bookModule = require('../modules/booking.js');

module.exports = {
    createBooking: (req, res) => {
        const bookData = req.body;  // Data sent in the request body
        
        bookModule.createBooking(bookData, (error, result) => {
            if (error) {
                console.error('Error creating Booking:', error);
                return res.status(500).json({ error: error.message });
            }
            console.log("Booking create success");
            return res.status(201).json(result);
        });
    },
    findBookingById: (req, res) => {
        const bookingId = req.params.id;
        bookModule.findBookingById(bookingId,(error,result)=> {
            if (error) {
                console.error("Error in finding Booking ID",error);
                return res.status(500).json({error: error.message});
            }
            console.log("Found Booking ID");
            return res.status(200).json(result);
        })
    },
    getAllBookings: (req, res) => {
        bookModule.getAllBookings((error, results) => {
            if (error) {
                console.error("Error retrieving Bookings:", error);
                return res.status(500).json({ error: error.message });
            }
            res.status(200).json(results);
        });
    },
    updateBooking: (req, res) => {
        const bookingId = req.params.id;
        const updateData = req.body;
        bookModule.updateBooking(bookingId,updateData, (error,result)=>{
            if (error) {
                console.log("Booking Update Failed");
                return res.status(500).json({error: error.message});
            }
            console.log("Booking Update Sucessful");
            return res.status(201).json(result);
        });
    },
    deleteBooking: (req, res) => {
        const bookingId = req.params.id;
        bookModule.deleteBooking(bookingId, (err,result)=> {
            if (err) {
                console.log("Booking Delete Failed");
                return res.status(500).json({err: err.message});
            }
            console.log("Booking Delete Success");
            return res.status(200).json(result);
        })
    }
};
