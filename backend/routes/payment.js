const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.js');

router.post('/', paymentController.createPayment);
router.get('/:id', paymentController.findPaymentById);
router.get('/', paymentController.getAllPayments);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
