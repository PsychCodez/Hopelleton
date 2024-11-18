const express = require('express');
const db = require('../db/db.js'); // Your database connection
const router = express.Router();

router.get('/', (req, res) => {
  // Destructure parameters from query string
  const { checkInDate, checkOutDate, maxGuests } = req.query;

  // Validate that all required query parameters are provided
  if (!checkInDate || !checkOutDate || !maxGuests) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const query = `CALL GetAvailableProperties(?, ?, ?)`; // The stored procedure call

  // Execute the query with parameters
  db.query(query, [checkInDate, checkOutDate, maxGuests], (error, results) => {
    if (error) {
      // Handle query execution error
      console.error('Error fetching available properties:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Check if results exist
    if (results && results[0].length > 0) {
      // Send the available properties as a response
      return res.status(200).json(results[0]);
    } else {
      // Handle case where no properties are available
      return res.status(404).json({ message: 'No available properties found for the given criteria' });
    }
  });
});

module.exports = router;
