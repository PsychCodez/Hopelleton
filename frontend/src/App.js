import React, { useState } from "react";
import axios from 'axios'; // Import axios for making HTTP requests
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import About from "./About.js";
import Landlords from "./Landlords.js";
import BookingPage from "./BookingPage.js"; // Import the About component
import Admin from "./admin.js";
import WriteReview from "./WriteReview.js";

// Carousel component
function Carousel({ properties }) {
  const [scrollPosition, setScrollPosition] = useState(0);

  const scrollLeft = () => {
    setScrollPosition((prev) => Math.max(prev - 300, 0));
  };

  const scrollRight = () => {
    setScrollPosition((prev) => Math.min(prev + 300, properties.length * 300));
  };

  return (
    <div className="carousel-wrapper">
      <button onClick={scrollLeft} className="carousel-button prev">❮</button>
      <div className="carousel" style={{ transform: `translateX(-${scrollPosition}px)`}}>
        {properties.map((property, index) => (
          <div key={index} className="carousel-item">
            <div className="property-image">{property.image}</div>
            <div className="property-info">
              <h3>{property.Title}</h3>
              <p>{property.Description}</p>
              <p className="property-rating">⭐ {property.AverageRating}</p>
              <Link to={`/booking/${property.id}`} className="book-button">Book</Link>
            </div>
          </div>
        ))}
      </div>
      <button onClick={scrollRight} className="carousel-button next">❯</button>
    </div>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default country code
  const [searchValues, setSearchValues] = useState({});
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [properties, setProperties] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogin = async (event) => {
    event.preventDefault();
  
    // Prepare login payload
    const loginPayload = {
      phoneNumber: `${phone}`,
      password: password,
    };
  
    try {
      // Make POST request to login route
      const response = await axios.post("http://localhost:5000/query/login", loginPayload);
      if (response.data.success) {
        setUsername(response.data.username); // Set username on successful login
        closeModal();
      } else {
        alert(response.data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred while logging in. Please try again later.");
    }
  };
  
  const handleRegister = async (event) => {
    event.preventDefault();
  
    // Prepare registration payload
    const registrationPayload = {
      name: username,
      email: event.target.email.value,
      phoneNumber: `${phone}`,
      password: password,
      profilePicture: null, // Default value
      verificationStatus: 0, // Default value
      dateJoined: new Date().toISOString(), // Current timestamp  "2023-07-01"
    };
  
    try {
      // Make POST request to registration route
      const response = await axios.post("http://localhost:5000/users/", registrationPayload);
      if (response.data.success) {
        alert("Registration successful. You can now log in.");
        setIsRegisterMode(false); // Switch to login mode after registration
      } else {
        console.log(response.data)
        alert(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred while registering. Please try again later.");
    }
  }

  const handleSearch = async () => {
    const searchPayload = {
      // destination: destination.trim(),
      checkInDate: new Date(checkIn).toISOString().slice(0, 10),
      checkOutDate: new Date(checkOut).toISOString().slice(0, 10),
      maxGuests: parseInt(guests, 10) || 0,
    };

    try {
      const response = await axios.get('http://localhost:5000/query/available', {
        params: searchPayload,
      });
      setProperties(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching available properties:', error);
    }
  };
  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    if (/^\d{0,10}$/.test(phoneValue)) {
      setPhone(phoneValue);
      setPhoneError(""); // Clear error if valid
    } else {
      setPhoneError("Phone number must be 10 digits.");
    }
  };

  // Confirm password validation
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError(""); // Clear error if passwords match
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <span className="logo">Hopelleton</span>
          <div className="center-links">
            <Link to="/about">About</Link>
            <Link to="/">Renters</Link>
            <Link to="/landlords">Landlords</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/writereview">Write a Review</Link>
          </div>
          {username ? (
            <span className="user-info">Welcome, {username}</span>
          ) : (
            <a href="#login" onClick={openModal}>
              Login <span className="login-icon">👤</span>
            </a>
          )}
        </nav>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>{isRegisterMode ? "Register" : "Login"}</h2>
              <form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
                {isRegisterMode && (
                  <>
                    <input
                      type="text"
                      placeholder="Name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <input type="email" name="email" placeholder="Email" required />
                  </>
                )}

                <div className="phone-input">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    required
                  >
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                    {/* Add more country codes as needed */}
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                  />
                </div>
                {phoneError && <p className="error-text">{phoneError}</p>}

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {isRegisterMode && (
                  <>
                    <input
                      type="password"
                      placeholder="Re-enter Password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      required
                    />
                    {passwordError && <p className="error-text">{passwordError}</p>}
                  </>
                )}
                <button type="submit">{isRegisterMode ? "Register" : "Login"}</button>
              </form>
              <span onClick={() => setIsRegisterMode(!isRegisterMode)} className="register-link">
                {isRegisterMode ? "Switch to Login" : "New user? Register here"}
              </span>
              <button onClick={closeModal} className="close-modal">✕</button>
            </div>
          </div>
        )}

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={
            <>
              {/* Search Bar */}
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
                    placeholder="Add dates"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <span className="separator"></span>
                <div className="search-bar-item">
                  <label>Check out</label>
                  <input
                    type="date"
                    placeholder="Add dates"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
                <span className="separator"></span>
                <div className="search-bar-item">
                  <label>Who</label>
                  <input
                    type="text"
                    placeholder="Add guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
                <button className="search-button" onClick={handleSearch}>
                  🔍
                </button>
              </div>

              {/* Carousel */}
              <Carousel properties={properties} />
            </>
          } />
          <Route path="/writereview" element={<WriteReview />}/>
            <Route path="/admin" element={<Admin />} />
          <Route path="/booking/:userId" element={<BookingPage />} />
          <Route path="/about" element={<About openModal={openModal} />} />
          <Route path="/landlords" element={<Landlords />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;