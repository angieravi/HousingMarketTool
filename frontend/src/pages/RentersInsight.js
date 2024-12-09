// src/pages/RentersInsight.js
import React from 'react';
import Footer from '../components/Footer';
import house1 from '../assets/house1.jpg';
import house2 from '../assets/house2.jpg';
import house3 from '../assets/house3.jpg';

const HousingInsight = () => {
  const houseData = [
    {
      image: house1,
      title: '320 Lois Lane',
      description: 'Charming 3 bedroom home with a big yard.',
      price: '$321,000',
    },
    {
      image: house2,
      title: '221B Mary Street',
      description: 'Brick home with updated amenities.',
      price: '$648,000',
    },
    {
      image: house3,
      title: '742 Gwen Terrace',
      description: 'Family home near schools and parks.',
      price: '$590,900',
    },
  ];

  return (
    <div className="bg-gray-100">
      <section className="bg-green-700 text-white text-center py-20">
        <h1 className="text-5xl font-bold">Housing Insights</h1>
        <p className="mt-4 text-xl">Explore homes and communities in a specified area</p>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Top Features</h3>
              <p className="text-gray-600">Spacious rooms, modern kitchen</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Local Recommendations</h3>
              <p className="text-gray-600">Best restaurants and parks nearby</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Community Insights</h3>
              <p className="text-gray-600">Friendly neighborhood, easy access to public transportation</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Most Compatible Homes Near You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {houseData.map((house, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center">
                <img
                  src={house.image}
                  alt={house.title}
                  className="mb-4 w-full h-64 object-cover rounded-lg"
                />
                <h3 className="font-bold text-lg">{house.title}</h3>
                <p>{house.description}</p>
                <p className="font-bold text-gray-700">{house.price}</p>
                <button className="mt-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-green-600">
                  View Listing
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">County Ratings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Zillow</h3>
              <p className="text-gray-600">4.5/5 - Great schools and amenities</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">RedFin</h3>
              <p className="text-gray-600">4.3/5 - Excellent location and pricing</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">RateMyAgent</h3>
              <p className="text-gray-600">4.7/5 - Highly recommended by locals</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HousingInsight;
