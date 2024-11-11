// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';  // HomePage component
import RentersInsight from './pages/RentersInsight';  // RentersInsight component
import Navbar from './components/Navbar';  // Navbar component

function App() {
  return (
    <Router>
      {/* Navbar will only render once */}
      <Navbar />

      {/* Routes handle page rendering */}
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* HomePage route */}
        <Route path="/renters-insight" element={<RentersInsight />} />  {/* RentersInsight route */}
      </Routes>
    </Router>
  );
}

export default App;
