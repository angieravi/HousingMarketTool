import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UnemploymentRateComponent = () => {
  const [stateNames, setStateNames] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [county, setCounty] = useState('');
  const [graphUrl, setGraphUrl] = useState(null);
  const [error, setError] = useState('');

  // Fetch state names for the dropdown
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/data');
        setStateNames(response.data.state_names); // Populate dropdown with state names
      } catch (err) {
        console.error('Failed to fetch state names:', err);
        setError('Failed to load states. Please try again later.');
      }
    };

    fetchStates();
  }, []);

  // Handle form submission to fetch line graph
  const handleGenerateGraph = async (e) => {
    e.preventDefault();
    if (!selectedState || !county) {
      setError('Please select a state and enter a county.');
      return;
    }

    setError('');
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/api/line_graph',
        { state: selectedState, county },
        { responseType: 'blob' } // binary data (image)
      );

      const url = URL.createObjectURL(new Blob([response.data]));
      setGraphUrl(url); // Set the graph image URL
    } catch (err) {
      console.error('Failed to fetch line graph:', err.response?.data || err.message);
      setError('Failed to generate the graph. Please try again and make sure the county is in the following format ex: Butler County.');
    }
  };

  return (
    <div>
      <section className="py-12 bg-green-700">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Unemployment Rate Over Time</h2>
          <p className="text-lg text-white max-w-3xl mx-auto mb-6">
            Compare unemployment rates for a specific county to national rates over time to get an idea of the local job market an economy. Start by selecting a state and entering a county name.
          </p>
          <form>
            <label className="text-white">
              Select State:
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="ml-2 mb-4 p-2 border rounded text-black"
              >
                <option value="">Select State</option>
                {stateNames.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label className="text-white">
              Enter County:
              <input
                type="text"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                placeholder="Name County"
                className="ml-2 mb-4 p-2 border rounded text-black"
              />
            </label>
          </form>
          </div>
          </section>
          <section className="bg-grey-200">
            <div className="container mx-auto text-center">
          <br />
            <button
                onClick={handleGenerateGraph}
                disabled={!selectedState || !county}
                className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-900"
            >
                Generate Graph
            </button>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </section>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          {graphUrl ? (
            <div className="mt-8">
              <img
                src={graphUrl}
                alt="Line Graph"
                className="mx-auto rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <p className="text-lg text-gray-700">
              Your graph will appear here.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default UnemploymentRateComponent;