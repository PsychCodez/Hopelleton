const express = require('express');
const router = express.Router();
const propertyAmenityController = require('../controllers/propertyAmenity.js');

router.post('/', propertyAmenityController.createPropertyAmenity);
router.get('/:id', propertyAmenityController.findPropertyAmenityById);
router.get('/', propertyAmenityController.getAllPropertyAmenities);
// router.put('/:id', propertyAmenityController.updatePropertyAmenity);
router.delete('/:id', propertyAmenityController.deletePropertyAmenity);

module.exports = router;
