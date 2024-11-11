// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/global.css';   // Ensure styles are imported if needed
import App from './App';        // Import App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // Ensure this matches the id in public/index.html
);
