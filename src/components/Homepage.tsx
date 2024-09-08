import React from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import PropertyCard from './PropertyCard';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialsSection';
import Footer from './Footer';

const Homepage: React.FC = () => {
  // Sample property data to demonstrate multiple PropertyCard components
  const properties = [
    {
      image: 'https://example.com/property1.jpg',
      title: 'Beautiful Family House',
      description: 'A beautiful 4-bedroom family house located in a serene environment.',
      price: '$500,000',
    },
    {
      image: 'https://example.com/property2.jpg',
      title: 'Modern Apartment in City Center',
      description: 'A stylish 2-bedroom apartment with modern amenities in the heart of the city.',
      price: '$350,000',
    },
    {
      image: 'https://example.com/property3.jpg',
      title: 'Luxurious Villa with Pool',
      description: 'A luxurious villa with a private pool and a stunning ocean view.',
      price: '$1,200,000',
    },
  ];

  return (
    <>
      {/* Navbar is usually at the top of the page */}
      <Navbar />

      {/* Hero section with the search bar */}
      <HeroSection />

      {/* Property Cards Section */}
      <section className="property-section">
        {properties.map((property, index) => (
          <PropertyCard
            key={index}
            image={property.image}
            title={property.title}
            description={property.description}
            price={property.price}
          />
        ))}
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Footer at the bottom of the page */}
      <Footer />
    </>
  );
};

export default Homepage;
