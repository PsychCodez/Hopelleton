import React, { useState } from "react";
import axios from "axios";
import "./WriteReview.css"; // Optional: Add styling if needed

function WriteReview() {
  const [bookingId, setBookingId] = useState("");
  const [userId, setUserId] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [reviewDate, setReviewDate] = useState(new Date().toISOString().slice(0, 10));
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  const handleSubmit = async (event) => {
    event.preventDefault();

    const reviewPayload = {
      bookingId: parseInt(bookingId, 10),
      userId: parseInt(userId, 10),
      rating: parseFloat(rating),
      comment,
      reviewDate,
    };

    try {
      const response = await axios.post("http://localhost:5000/reviews", reviewPayload);
      if (response.status === 200) {
        alert("Review submitted successfully!");
      } else {
        // Show specific error message if the backend provides one
        setErrorMessage("Failed to submit the review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle the error and show a message to the user
      if (error.response) {
        // Backend returned an error response
        setErrorMessage(`Error: ${error.response.data.error || "Something went wrong!"}`);
      } else if (error.request) {
        // No response received from backend
        setErrorMessage("No response received from the server. Please check your connection.");
      } else {
        // Something else went wrong
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="write-review">
      <h1>Write a Review</h1>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error if any */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookingId">Booking ID:</label>
          <input
            type="number"
            id="bookingId"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            type="number"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating (0-5):</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="reviewDate">Review Date:</label>
          <input
            type="date"
            id="reviewDate"
            value={reviewDate}
            onChange={(e) => setReviewDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit Review</button>
      </form>
    </div>
  );
}

export default WriteReview;
