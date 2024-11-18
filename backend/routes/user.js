// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');

// Define CRUD routes for User
router.post('/',userController.createUser);

// Retrieve a specific user by ID
router.get('/:id', userController.findUserById); 

// Retrieve all users
router.get('/', userController.getAllUsers);

// Update an existing user by ID
router.put('/:id', userController.updateUser);

// Delete a user by ID
router.delete('/:id', userController.deleteUser);

module.exports = router;
