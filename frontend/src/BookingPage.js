import React, { useState } from 'react';
import axios from 'axios'; // Import axios for API calls
import "./Booking.css"

function Booking() {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('');
  const [price, setPrice] = useState(0);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  // Placeholder user ID for now

  // Handle booking confirmation
  const handleBook = () => {
    const userId = 4; // Hardcoded user ID for now, to be replaced later
    const propertyId = 10; // Placeholder property ID for now
    const paymentId = 6; // Placeholder payment ID
    const createdDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format
    const updatedDate = createdDate;

    // Calculate total cost (no. of guests * price per night * number of nights)
    const pricePerNight = 100; // Placeholder price per night
    const numNights = (new Date(checkOut) - new Date(checkIn)) / (1000 * 3600 * 24);
    const totalCost = guests * pricePerNight * numNights;

    // Prepare booking data to send to the backend
    const bookingData = {
      userId: userId,
      propertyId: propertyId,
      checkInDate: checkIn, // Make sure this is in the correct format (YYYY-MM-DD)
      checkOutDate: checkOut, // Same for checkOutDate
      totalCost: totalCost.toFixed(2), // Ensure it's formatted as a string with 2 decimal places
      bookingStatus: 'Confirmed', // Example status
      createdDate: createdDate,
      updatedDate: updatedDate
    };

    console.log('Booking data:', bookingData); // Log the data to see it

    // Make the POST request to create the booking
    axios.post('http://localhost:5000/bookings/', bookingData)
      .then((response) => {
        console.log('Booking confirmed:', response.data);

        // Save the booking confirmation, including the BookingID returned from the server
        setBookingConfirmation({
          BookingID: response.data.BookingID,
          userId,
          propertyId,
          checkIn,
          checkOut,
          totalCost,
          createdDate,
        });
      })
      .catch((error) => {
        console.error('Error confirming booking:', error);
      });
  };

  const handleCancelBooking = () => {
    // Check if bookingConfirmation exists and has a valid BookingID
    if (bookingConfirmation && bookingConfirmation.BookingID) {
      const bookingId = bookingConfirmation.BookingID; // Use BookingID for cancellation
      axios.delete(`http://localhost:5000/bookings/${bookingId}`)
        .then((response) => {
          console.log('Booking cancelled:', response.data);
          setBookingConfirmation(null); // Clear booking confirmation after cancellation
        })
        .catch((error) => {
          console.error('Error cancelling booking:', error);
        });
    }
  };

  return (
    <div className="booking-page">
      <h2>Book Your Stay</h2>
      <div className="search-bar">
        <div className="search-bar-item">
          <label>Where</label>
          <input
            type="text"
            placeholder="Search destinations"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>
        <span className="separator"></span>
        <div className="search-bar-item">
          <label>Check in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <span className="separator"></span>
        <div className="search-bar-item">
          <label>Check out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <span className="separator"></span>
        <div className="search-bar-item">
          <label>Who</label>
          <input
            type="number"
            placeholder="Add guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
      </div>

      {/* Booking Confirmation */}
      {bookingConfirmation ? (
        <div className="booking-confirmation">
          <h3>Your Booking Confirmation</h3>
          <p>Destination: {destination}</p>
          <p>Check-in: {checkIn}</p>
          <p>Check-out: {checkOut}</p>
          <p>Guests: {guests}</p>
          <p>Total Cost: ${bookingConfirmation.totalCost}</p>
          <button onClick={handleCancelBooking} className="cancel-button">
            Cancel Booking
          </button>
        </div>
      ) : (
        <button onClick={handleBook} className="confirm-button">Confirm Booking</button>
      )}
    </div>
  );
}

export default Booking;
