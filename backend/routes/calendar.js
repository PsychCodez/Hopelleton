const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendar.js');

router.post('/', calendarController.createAvailability);
router.get('/:id', calendarController.findAvailabilityById);
router.get('/', calendarController.getAllAvailabilities);
router.put('/:id', calendarController.updateAvailability);
router.delete('/:id', calendarController.deleteAvailability);

module.exports = router;
