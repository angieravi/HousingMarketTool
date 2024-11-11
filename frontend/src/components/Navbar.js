// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';  // Assuming you have a logo asset

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link to="/">
        <img src={logo} alt="Renter Insights" className="w-32" />
      </Link>

      {/* Navigation Links */}
      <ul className="flex space-x-8 text-lg">
        <li>
          <Link to="/renters-insight" className="hover:underline">Renter Insights</Link>
        </li>
        <li>
          <Link to="#" className="hover:underline">Account</Link>
        </li>
        <li>
          <Link to="#" className="hover:underline">Reviews</Link>
        </li>
        <li>
          <Link to="#" className="hover:underline">Nearby Homes</Link>
        </li>
      </ul>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search in site"
        className="border border-gray-300 rounded px-3 py-2"
      />
    </nav>
  );
};

export default Navbar;
