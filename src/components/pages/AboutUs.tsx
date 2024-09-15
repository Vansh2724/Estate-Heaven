import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import '../../styles/AboutUs.css';

const AboutUs: React.FC = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>Your trusted partner in real estate journeys.</p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="our-mission">
        <div className="container">
          <div className="mission-content">
            <h2>Our Mission</h2>
            <p>
              At Estate Heaven, our mission is to simplify the process of buying, selling, and renting properties. We strive to provide the best user experience and a trustworthy platform that connects property seekers and sellers seamlessly.
            </p>
          </div>
          <div className="mission-image">
            <img src="https://via.placeholder.com/500x300.png?text=Mission+Image" alt="Our Mission" />
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="our-team">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-members">
            <div className="team-member">
              <img src="https://via.placeholder.com/150.png?text=Member+1" alt="Team Member 1" />
              <h3>John Doe</h3>
              <p>CEO & Founder</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/150.png?text=Member+2" alt="Team Member 2" />
              <h3>Jane Smith</h3>
              <p>CTO & Co-Founder</p>
            </div>
            <div className="team-member">
              <img src="https://via.placeholder.com/150.png?text=Member+3" alt="Team Member 3" />
              <h3>Mike Johnson</h3>
              <p>Head of Marketing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values">
        <div className="container">
          <h2>Our Core Values</h2>
          <div className="values-list">
            <div className="value-item">
              <img src="https://via.placeholder.com/80.png?text=Value+Icon+1" alt="Value 1" />
              <h4>Integrity</h4>
              <p>We believe in being honest and transparent in all our dealings.</p>
            </div>
            <div className="value-item">
              <img src="https://via.placeholder.com/80.png?text=Value+Icon+2" alt="Value 2" />
              <h4>Customer First</h4>
              <p>Your satisfaction is our top priority.</p>
            </div>
            <div className="value-item">
              <img src="https://via.placeholder.com/80.png?text=Value+Icon+3" alt="Value 3" />
              <h4>Innovation</h4>
              <p>We constantly strive to innovate and improve our platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2>What Our Clients Say</h2>
          <div className="testimonials-carousel">
            <div className="testimonial-item">
              <p>"Estate Heaven made buying my first home a breeze! Highly recommend."</p>
              <h4>- Alice Cooper</h4>
            </div>
            <div className="testimonial-item">
              <p>"A seamless and stress-free experience from start to finish."</p>
              <h4>- Bob Marley</h4>
            </div>
            <div className="testimonial-item">
              <p>"Professional, reliable, and easy to use. Great platform!"</p>
              <h4>- Charlie Chaplin</h4>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUs;
