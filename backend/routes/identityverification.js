const express = require('express');
const router = express.Router();
const identityVerificationController = require('../controllers/identityVerification.js');

router.post('/', identityVerificationController.createVerification);
router.get('/:id', identityVerificationController.findVerificationById);
router.get('/', identityVerificationController.getAllVerifications);
router.put('/:id', identityVerificationController.updateVerification);
router.delete('/:id', identityVerificationController.deleteVerification);

module.exports = router;
