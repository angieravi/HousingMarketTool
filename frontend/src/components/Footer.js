// frontend/src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-6 bg-white text-center text-gray-600">
      <div className="container mx-auto">
        <div className="flex justify-center space-x-4 mb-4">
          <Link to="/contact-us" className="hover:underline">Contact Us</Link> 
          <Link to="/data" className="hover:underline">Data</Link> 
        </div>
      </div>
    </footer>
  );
};

export default Footer;