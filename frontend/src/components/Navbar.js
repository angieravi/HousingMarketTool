// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';  

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <Link to="/">
      <img src={logo} alt="HomeScope" className="w-52" />
      </Link>

      {/* Navigation Links */}
      <ul className="flex space-x-8 text-lg">
        <li>
          <Link to="/market-page" className="hover:underline">Market Overview</Link>
        </li>
        <li>
          <Link to="/location-based-insights" className="hover:underline">Location Based Insights</Link>
        </li>
        <li>
          <Link to="/renters-insight" className="hover:underline">Housing Insights</Link>
        </li>
      </ul>

    </nav>
  );
};

export default Navbar;
