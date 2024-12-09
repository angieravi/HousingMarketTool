import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RentersInsight from './pages/RentersInsight';
import Navbar from './components/Navbar';
import ContactUs from './pages/ContactUs';
import MarketPage from './pages/MarketPage';
import LocationBasedInsights from './pages/LocationBasedInsights';
import DataPage from './pages/DataPage';

function App() {
  return (
    <Router>
      {/* Navbar will only render once */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/renters-insight" element={<RentersInsight />} /> 
        <Route path="/contact-us" element={<ContactUs />} /> 
        <Route path="/market-page" element={<MarketPage />} /> 
        <Route path="/location-based-insights" element={<LocationBasedInsights />} /> 
        <Route path="/data" element={<DataPage />} />
      </Routes>
    </Router>
  );
}

export default App;
