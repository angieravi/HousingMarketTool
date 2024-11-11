// frontend/src/components/Hero.js
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for routing

const Hero = () => {
  const navigate = useNavigate();  // Initialize navigate hook

  return (
    <section className="hero text-center py-20 bg-green-500 text-white">
      <h1 className="text-5xl font-bold">HomeScope</h1>
      <p className="mt-2 text-xl">Created by renters, for renters.</p>
      <p className="mt-4 max-w-xl mx-auto">Get valuable insights into housing prices, trends, areas, and other data to help renters make informed decisions.</p>
      <div className="mt-8">
        <button className="bg-black text-white px-6 py-3 mr-4 rounded hover:bg-gray-800">
          Find Homes
        </button>
        <button
          className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
          onClick={() => navigate('/renters-insight')}  // Use React Router to navigate
        >
          Renters Insights
        </button>
      </div>
    </section>
  );
};

export default Hero;
