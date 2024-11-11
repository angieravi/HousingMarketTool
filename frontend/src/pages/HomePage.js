// frontend/src/pages/HomePage.js
import React from 'react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-green-500 text-center text-white py-20">
        <h1 className="text-5xl font-bold">HomeScope</h1>
        <p className="mt-2 text-xl">Created by renters, for renters.</p>
        <p className="mt-4 max-w-xl mx-auto">Get valuable insights into housing prices, trends, areas, and other data to help renters make informed decisions.</p>
        <div className="mt-8">
          <button className="bg-black text-white px-6 py-3 mr-4 rounded hover:bg-gray-800">Find Homes</button>
          <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800" onClick={() => window.location.href = '/renters-insight'}>Renters Insights</button>
        </div>
      </section>

   {/* Map Visualization */}
<section className="bg-white py-10">
  <div className="container mx-auto">
    <iframe 
      src="/pennsylvania_demographics_embed.html" 
      width="65%" 
      height="500" 
      className="mx-auto rounded-lg shadow-lg" 
      style={{ border: 'none' }} 
      title="Pennsylvania Demographics Map">
    </iframe>
    <p className="text-center mt-4 text-lg">Visualize housing market data on an interactive map for better understanding.</p>
  </div>
</section>



      {/* Featured Properties */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Featured Properties Near You:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Property 1 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="https://placehold.co/250x150" alt="Chicagoland Residence" className="mb-4 rounded-lg" />
              <h3 className="font-bold text-lg">Chicagoland Residence</h3>
              <p className="text-gray-700">$2000/month</p>
            </div>
            {/* Property 2 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="https://placehold.co/250x150" alt="Green Meadows Villa" className="mb-4 rounded-lg" />
              <h3 className="font-bold text-lg">Green Meadows Villa</h3>
              <p className="text-gray-700">$1800/month</p>
            </div>
            {/* Property 3 */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <img src="https://placehold.co/250x150" alt="Seaside Heights Penthouse" className="mb-4 rounded-lg" />
              <h3 className="font-bold text-lg">Seaside Heights Penthouse</h3>
              <p className="text-gray-700">$2500/month</p>
            </div>
          </div>
        </div>
      </section>

      {/* Market Trends */}
      <section className="py-12 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Market Trends</h2>
          <p>Key metrics to understand the housing market</p>
          <button className="bg-black text-white px-6 py-3 rounded mt-6 hover:bg-gray-800">View Details</button>
          <div className="mt-10">
            <img src="https://placehold.co/800x400" alt="Price trends chart" className="mx-auto rounded-lg shadow-lg" />
          </div>
          <div className="mt-6 flex justify-center space-x-8 text-gray-700">
            <div>
              <p>Average Price</p>
              <p className="font-bold">$XXX,XXX</p>
            </div>
            <div>
              <p>Rent Price Index</p>
              <p className="font-bold">XXX</p>
            </div>
            <div>
              <p>Crime Rate</p>
              <p className="font-bold">XXX</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Customer Testimonials</h2>
          <p>See what our customers have to say about their experiences.</p>
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

export default HomePage;
