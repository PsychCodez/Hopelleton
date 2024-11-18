const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.js');

router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.findBookingById);
router.get('/', bookingController.getAllBookings);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;
