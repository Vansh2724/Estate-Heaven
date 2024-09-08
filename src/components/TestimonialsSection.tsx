import React from 'react';
import '../styles/TestimonialsSection.css';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="testimonials-section">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-card">
        <p>"Estate Heaven helped me find my dream home effortlessly. Their platform is intuitive and easy to use!"</p>
        <h4>- John Doe</h4>
      </div>
      <div className="testimonial-card">
        <p>"I sold my property within a week, thanks to Estate Heaven's premium listing feature!"</p>
        <h4>- Jane Smith</h4>
      </div>
    </section>
  );
};

export default TestimonialsSection;
