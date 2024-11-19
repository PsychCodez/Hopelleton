import React, { useState } from "react";
import axios from 'axios'; // Import axios for making HTTP requests
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import About from "./About";
import Landlords from "./Landlords.js"; // Import the About component
import './admin.js';

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
      <div className="carousel" style={{ transform: `translateX(-${scrollPosition}px)` }}>
        {properties.map((property, index) => (
          <div key={index} className="carousel-item">
            <div className="property-image">{property.image}</div>
            <div className="property-info">
              <h3>{property.title}</h3>
              <p>{property.description}</p>
              <p className="property-rating">⭐ {property.rating}</p>
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
  const [username, setUsername] = useState(null);
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

  const handleSearch = async () => {
    const searchPayload = {
      // destination: destination.trim(),
      checkInDate: new Date(checkIn).toISOString().slice(0, 10),
      checkOutDate: new Date(checkOut).toISOString().slice(0, 10),
      maxGuests: parseInt(guests, 10) || 0,
    };

    try {
      const response = await axios.get('http://localhost:5000/query', {
        params: searchPayload,
      });
      setProperties(response.data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching available properties:', error);
    }
  };

  return (
    <Router>
      {/* <Route path="/admin" element={<Admin />} /> */}
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <span className="logo">Hopelleton</span>
          <div className="center-links">
            <Link to="/about">About</Link>
            <Link to="/">Renters</Link>
            <Link to="/landlords">Landlords</Link>
            <Link to="/admin">Admin</Link>
          </div>
          {username ? (
            <span className="user-info">Welcome, {username}</span>
          ) : (
            <a href="#login" onClick={openModal}>
              Login <span className="login-icon">👤</span>
            </a>
          )}
        </nav>

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
          <button className="search-button" onClick={handleSearch}>🔍</button>
        </div>

        {/* Carousel below the search bar */}
        <Carousel properties={properties} />
      </div>
    </Router>
  );
}

export default App;
