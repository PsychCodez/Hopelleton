// app.js
const express = require('express');
const db = require('./db/db');
const userModel = require('./models/user');
const propertyModel = require('./models/property');
const bookingModel = require('./models/booking');
const path = require('path');

const app = express();
app.use(express.json());

app.use(express.static('public')); // Serve static HTML files from 'public' directory

app.get('/', (req,res)=> {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Route to get all users
app.get('/api/users', (req, res) => {
    userModel.getAllUsers((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Route to get all properties
app.get('/api/properties', (req, res) => {
    propertyModel.getAllProperties((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Route to get all bookings
app.get('/api/bookings', (req, res) => {
    bookingModel.getAllBookings((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/', (req,res) => {
    console.log("Active GET");
})
// Create a new user
app.post('/users', (req, res) => {
    const { username, password, email, role } = req.body;
    userModel.createUser(username, password, email, role, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    });
});

// Get user by ID
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    userModel.findUserById(userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(results[0]);
    });
});

// Update user by ID
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { username, password, email, role } = req.body;
    userModel.updateUser(userId, username, password, email, role, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User updated successfully' });
    });
});

// Delete user by ID
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    userModel.deleteUser(userId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'User deleted successfully' });
    });
});


// Create a new property
app.post('/properties', (req, res) => {
    const { owner_id, name, address, price } = req.body;
    propertyModel.createProperty(owner_id, name, address, price, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Property created successfully', propertyId: results.insertId });
    });
});

// Get property by ID
app.get('/properties/:id', (req, res) => {
    const propertyId = req.params.id;
    propertyModel.findPropertyById(propertyId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Property not found' });
        res.json(results[0]);
    });
});

// Update property by ID
app.put('/properties/:id', (req, res) => {
    const propertyId = req.params.id;
    const { name, address, price } = req.body;
    propertyModel.updateProperty(propertyId, name, address, price, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Property updated successfully' });
    });
});

// Delete property by ID
app.delete('/properties/:id', (req, res) => {
    const propertyId = req.params.id;
    propertyModel.deleteProperty(propertyId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Property deleted successfully' });
    });
});

// Create a new booking
app.post('/bookings', (req, res) => {
    const { guest_id, property_id, start_date, end_date } = req.body;
    bookingModel.createBooking(guest_id, property_id, start_date, end_date, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Booking created successfully', bookingId: results.insertId });
    });
});

// Get booking by ID
app.get('/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    bookingModel.findBookingById(bookingId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Booking not found' });
        res.json(results[0]);
    });
});

// Update booking by ID
app.put('/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    const { start_date, end_date, status } = req.body;
    bookingModel.updateBooking(bookingId, start_date, end_date, status, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Booking updated successfully' });
    });
});

// Delete booking by ID
app.delete('/bookings/:id', (req, res) => {
    const bookingId = req.params.id;
    bookingModel.deleteBooking(bookingId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Booking deleted successfully' });
    });
});

app.post('/api/users', (req, res) => {
    const { username, password, email, role } = req.body;
    const query = `INSERT INTO Users (username, password, email, role) VALUES (?, ?, ?, ?)`;
    
    db.query(query, [username, password, email, role], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User created', userId: results.insertId });
    });
});

app.post('/api/properties', (req, res) => {
    const { owner_id, name, address, price } = req.body;
    const query = `INSERT INTO Properties (owner_id, name, address, price) VALUES (?, ?, ?, ?)`;
    
    db.query(query, [owner_id, name, address, price], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Property created', propertyId: results.insertId });
    });
});

app.post('/api/bookings', (req, res) => {
    const { guest_id, property_id, start_date, end_date } = req.body;
    const query = `INSERT INTO Bookings (guest_id, property_id, start_date, end_date) VALUES (?, ?, ?, ?)`;
    
    db.query(query, [guest_id, property_id, start_date, end_date], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Booking created', bookingId: results.insertId });
    });
});



app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
