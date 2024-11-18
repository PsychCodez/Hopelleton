const express = require('express');
const router = express.Router();
const supportController = require('../controllers/support.js');

router.post('/', supportController.createSupportTicket);
router.get('/:id', supportController.findSupportTicketById);
router.get('/', supportController.getAllSupportTickets);
router.put('/:id', supportController.updateSupportTicket);
router.delete('/:id', supportController.deleteSupportTicket);

module.exports = router;
