import React from "react";
import "./About.css";

function About({ openModal }) {
  return (
    <div className="about-page">
      <section className="hero-section">
        <h1>About Hopelleton</h1>
        <p>Connecting renters with landlords effortlessly.</p>
      </section>

      <section className="feature-section">
        <div className="feature">
          <h2>Feature 1</h2>
          <p>Engaging content about this feature. Describe how it benefits users.</p>
        </div>
        <div className="feature">
          <h2>Feature 2</h2>
          <p>Engaging content about this feature. Describe how it benefits users.</p>
        </div>
        <div className="feature">
          <h2>Feature 3</h2>
          <p>Engaging content about this feature. Describe how it benefits users.</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to get started?</h2>
        <button className="cta-button" onClick={openModal}>
          Join Us
        </button>
      </section>
    </div>
  );
}

export default About;
