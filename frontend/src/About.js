import React from "react";
import "./About.css";

function About({ openModal }) {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>About Hopelleton</h1>
        <p>
          Hopelleton is a revolutionary platform designed to connect renters with landlords, offering seamless property bookings, trusted reviews, and secure transactions. Our mission is to simplify the property rental experience for everyone involved.
        </p>
      </section>

      {/* Features Section */}
      <section className="feature-section">
        <div className="feature">
          <h2>Transparent Property Listings</h2>
          <p>
            Browse through a wide range of verified properties with detailed descriptions, high-quality images, and genuine reviews. Hopelleton ensures you make informed decisions by providing comprehensive property insights.
          </p>
        </div>
        <div className="feature">
          <h2>Secure Booking and Payment</h2>
          <p>
            Hopelleton offers a secure booking system with integrated payment options. We prioritize safety and transparency, ensuring your transactions are protected at every step.
          </p>
        </div>
        <div className="feature">
          <h2>Empowering Landlords and Renters</h2>
          <p>
            Whether you're a landlord looking to manage your property or a renter searching for your next home, Hopelleton provides tools and resources tailored to your needs. From managing bookings to writing reviews, we've got you covered.
          </p>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta-section">
        <h2>Ready to join the future of property rentals?</h2>
        <p>
          Whether you're renting or listing, Hopelleton is your trusted partner in making the process effortless and reliable. Create an account today and experience the difference.
        </p>
        <button className="cta-button" onClick={openModal}>
          Join Us
        </button>
      </section>
    </div>
  );
}

export default About;
