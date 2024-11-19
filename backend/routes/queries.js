const express = require('express');
const db = require('../db/db.js'); // Your database connection
const router = express.Router();

router.get('/available', (req, res) => {
  const { checkInDate, checkOutDate, maxGuests } = req.query;
  if (!checkInDate || !checkOutDate || !maxGuests) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const query = `CALL GetAvailableProperties(?, ?, ?)`; 

  db.query(query, [checkInDate, checkOutDate, maxGuests], (error, results) => {
    if (error) {
      console.error('Error fetching available properties:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results && results[0].length > 0) {
      return res.status(200).json(results[0]);
    } else {
      return res.status(404).json({ message: 'No available properties found for the given criteria' });
    }
  });
});

router.get('/bookings/:userId', async (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT 
      b.BookingID, 
      p.PropertyName, 
      b.CheckInDate, 
      b.CheckOutDate, 
      (DATEDIFF(b.CheckOutDate, b.CheckInDate) * p.PricePerNight) AS TotalCost
    FROM 
      Bookings b
    JOIN 
      Properties p ON b.PropertyID = p.PropertyID
    WHERE 
      b.UserID = ?
  `;

  try {
    const [results] = await db.execute(query, [userId]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'No bookings found for the given user.' });
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
