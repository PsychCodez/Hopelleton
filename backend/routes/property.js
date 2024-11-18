// routes/property.js
const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property.js');

router.post('/', propertyController.createProperty);
router.get('/:id', propertyController.findPropertyById);
router.get('/', propertyController.getAllProperties);
router.put('/:id', propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);

module.exports = router;
