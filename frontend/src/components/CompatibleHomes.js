// frontend/src/components/CompatibleHomes.js
import React from 'react';

const CompatibleHomes = () => {
  const homes = [
    { name: 'Beautiful Home A', price: '$1500/mo', bedrooms: 2, bathrooms: 2 },
    { name: 'Cozy Apartment B', price: '$1200/mo', bedrooms: 1, bathrooms: 1 },
    { name: 'Modern Townhome C', price: '$1800/mo', bedrooms: 3, bathrooms: 2.5 }
  ];

  return (
    <section className="homes" id="homes">
      <h2>Most Compatible Homes Near You</h2>
      <div className="homes-grid">
        {homes.map((home, index) => (
          <div key={index} className="home-card">
            <h3>{home.name}</h3>
            <p>{home.bedrooms} bedrooms, {home.bathrooms} baths</p>
            <p>{home.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompatibleHomes;
