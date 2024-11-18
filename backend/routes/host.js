const express = require('express');
const router = express.Router();
const hostController = require('../controllers/host.js');

router.post('/', hostController.createHost);
router.get('/:id', hostController.findHostById);
router.get('/', hostController.getAllHosts);
router.put('/:id', hostController.updateHost);
router.delete('/:id', hostController.deleteHost);

module.exports = router;
