const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guest.js');

router.post('/', guestController.createGuest);
router.get('/:id', guestController.findGuestById);
router.get('/', guestController.getAllGuests);
router.put('/:id', guestController.updateGuest);
router.delete('/:id', guestController.deleteGuest);

module.exports = router;
