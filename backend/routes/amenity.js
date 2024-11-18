const express = require('express');
const router = express.Router();
const amenityController = require('../controllers/amenity.js');

router.post('/', amenityController.createAmenity);
router.get('/:id', amenityController.findAmenityById);
router.get('/', amenityController.getAllAmenities);
router.put('/:id', amenityController.updateAmenity);
router.delete('/:id', amenityController.deleteAmenity);

module.exports = router;
