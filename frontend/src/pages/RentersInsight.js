// src/pages/RentersInsight.js
import React from 'react';

const RentersInsight = () => {
  return (
    <div className="bg-gray-100">
      {/* Removed the Navbar here */}
      {/* Hero Section */}
      <section className="bg-green-500 text-white text-center py-20">
        <h1 className="text-4xl font-bold">Discover Insights and Reviews</h1>
        <p className="mt-4 text-xl">Read what past renters have to say</p>
      </section>

      {/* Recent Reviews */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Recent Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <span>Renter 1</span>
                </div>
                <div className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              </div>
              <p className="text-gray-700">Great experience, highly recommend!</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <span>Renter 2</span>
                </div>
                <div className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              </div>
              <p className="text-gray-700">Excellent service and amenities.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full mr-2"></div>
                  <span>Renter 3</span>
                </div>
                <div className="text-yellow-500">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              </div>
              <p className="text-gray-700">Very satisfied with my stay.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
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

      {/* Most Compatible Homes */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Most Compatible Homes Near You</h2>
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="mb-4">
                <img src="https://placehold.co/64x64" alt="Beautiful Home A" className="mx-auto" />
              </div>
              <h3 className="font-bold text-lg">Beautiful Home A</h3>
              <p>2 bedroom, 2 bath</p>
              <p className="font-bold text-gray-700">$1500/mo</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <img src="https://placehold.co/64x64" alt="Cozy Apartment B" className="mx-auto" />
              </div>
              <h3 className="font-bold text-lg">Cozy Apartment B</h3>
              <p>1 bedroom, 1 bath</p>
              <p className="font-bold text-gray-700">$1200/mo</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <img src="https://placehold.co/64x64" alt="Modern Townhome C" className="mx-auto" />
              </div>
              <h3 className="font-bold text-lg">Modern Townhome C</h3>
              <p>3 bedroom, 2.5 bath</p>
              <p className="font-bold text-gray-700">$1800/mo</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-white text-center text-gray-600">
        <div className="container mx-auto">
          <p className="mb-2">Contact Us</p>
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RentersInsight;
