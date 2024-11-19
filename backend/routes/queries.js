const express = require('express');
const db = require('../db/db.js'); // Your database connection
const router = express.Router();

router.get('/available', (req, res) => {
  const { checkInDate, checkOutDate, maxGuests } = req.query;

  if (!checkInDate || !checkOutDate || !maxGuests) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  const query = `
    SELECT 
        p.PropertyID, 
        p.Title, 
        p.Description, 
        p.AverageRating, 
        p.MaxGuests, 
        p.PricePerNight, 
        p.Rules, 
        l.City
    FROM 
        Property p
    JOIN 
        Location l ON p.PropertyID = l.PropertyID
    WHERE 
        p.MaxGuests >= ?
        AND NOT EXISTS (
            SELECT 1
            FROM Booking b
            WHERE b.PropertyID = p.PropertyID
              AND b.BookingStatus = 'Completed'
              AND (
                  (b.CheckInDate <= ? AND b.CheckOutDate >= ?) -- Overlaps with start of range
                  OR (b.CheckInDate <= ? AND b.CheckOutDate >= ?) -- Overlaps with end of range
                  OR (b.CheckInDate >= ? AND b.CheckOutDate <= ?) -- Fully within range
              )
        );
  `;

  const queryParams = [
    maxGuests, 
    checkInDate, checkInDate, 
    checkOutDate, checkOutDate, 
    checkInDate, checkOutDate
  ];

  db.query(query, queryParams, (error, results) => {
    if (error) {
      console.error('Error fetching available properties:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results && results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: 'No available properties found for the given criteria.' });
    }
  });
});


router.get('/bookings/:userId', (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ error: 'Missing required parameter: userId' });
  }

  const query = `
    SELECT 
      b.BookingID, 
      p.Title AS PropertyName, 
      b.CheckInDate, 
      b.CheckOutDate, 
      b.TotalCost
    FROM 
      Booking b
    JOIN 
      Property p ON b.PropertyID = p.PropertyID
    WHERE 
      b.UserID = ?
  `;

  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching bookings:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results && results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: 'No bookings found for the given user.' });
    }
  });
});

router.get('/properties/:hostId', (req, res) => {
  const { hostId } = req.params;

  if (!hostId) {
    return res.status(400).json({ error: 'Missing required parameter: hostId' });
  }

  const query = `
    SELECT 
      p.PropertyID,
      p.Title,
      p.Description,
      p.AverageRating,
      p.MaxGuests,
      p.PricePerNight,
      p.Rules,
      l.City,
      l.State,
      l.Country
    FROM 
      Property p
    LEFT JOIN 
      Location l ON p.PropertyID = l.PropertyID
    WHERE 
      p.HostID = ?
  `;

  db.query(query, [hostId], (error, results) => {
    if (error) {
      console.error('Error fetching properties:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results && results.length > 0) {
      return res.status(200).json(results);
    } else {
      return res.status(404).json({ message: 'No properties found for the given host.' });
    }
  });
});



module.exports = router;
