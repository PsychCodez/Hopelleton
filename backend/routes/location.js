const express = require('express');
const router = express.Router();
const locationController = require('../controllers/location.js');

router.post('/', locationController.createLocation);
router.get('/:id', locationController.findLocationById);
router.get('/', locationController.getAllLocations);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;
