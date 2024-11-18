import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import About from "./About";
import Landlords from "./Landlords"; // Import the About component

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
            {/* Placeholders for property content */}
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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setUsername("User123");
    closeModal();
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setUsername("NewUser");
    closeModal();
  };

  const properties = [
    {
      image: "Image 1 placeholder",
      title: "Villa in Jalahalli",
      description: "Modern 4-bedroom villa with park views...",
      rating: "4.94 (111)",
    },
    {
      image: "Image 2 placeholder",
      title: "Rental unit in Mahalakshmi Layout",
      description: "Unique style home with great amenities...",
      rating: "4.94 (36)",
    },
    {
      image: "Image 3 placeholder",
      title: "Apartment in Bengaluru",
      description: "Cozy 1RK studio with lush surroundings...",
      rating: "4.97 (118)",
    },
    {
      image: "Image 4 placeholder",
      title: "Home in Jeevan Bima Nagar",
      description: "Brand new penthouse in Indiranagar...",
      rating: "4.95 (167)",
    },
    // Add more property objects as needed
  ];
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
                    <input type="text" placeholder="Name" required />
                    <input type="text" placeholder="Username" required />
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
        <Routes>
          <Route
            path="/"
            element={
              <div>
                {/* Search Bar */}
                <div className="search-bar">
                  <div className="search-bar-item">
                    <label>Where</label>
                    <input type="text" placeholder="Search destinations" />
                  </div>
                  <span className="separator"></span>
                  <div className="search-bar-item">
                    <label>Check in</label>
                    <input type="date" placeholder="Add dates" />
                  </div>
                  <span className="separator"></span>
                  <div className="search-bar-item">
                    <label>Check out</label>
                    <input type="date" placeholder="Add dates" />
                  </div>
                  <span className="separator"></span>
                  <div className="search-bar-item">
                    <label>Who</label>
                    <input type="number" placeholder="Add guests" />
                  </div>
                  <button className="search-button">🔍</button>
                </div>

                {/* Carousel below the search bar */}
                <Carousel properties={properties} />
              </div>
            }
          />
          <Route path="/about" element={<About openModal={openModal} />} />
          <Route path="/landlords" element={<Landlords />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
