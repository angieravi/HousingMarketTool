import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import MapComponent from '../components/MapComponent.js';
import UnemploymentRateComponent from '../components/UnemploymentRateComponent';
import HousingMarketComponent from '../components/HousingMarketComponent.js';
import RenterMarketComponent from '../components/RenterMarketComponent.js';

const HomePage = () => {
  const [stateName, setStateName] = useState('');
  const [stateOptions, setStateOptions] = useState([]);
  const [maps, setMaps] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/api/data')
      .then((response) => {
        setStateOptions(response.data.state_names); 
      })
      .catch((err) => {
        console.error('Failed to fetch state options:', err);
        setError('Failed to load state options. Please try again.');
      });
  }, []);

  // map for a specific category
  const fetchMap = async (category) => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/map', {
        state_name: stateName,
        category: category,
      });
      setMaps((prevMaps) => ({
        ...prevMaps,
        [category]: response.data, // Update map for the specific category
      }));
    } catch (err) {
      console.error(`Failed to fetch ${category} map:`, err);
      setError(`Failed to fetch ${category} map. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <section className="py-12 bg-green-700">
    <   div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold text-white leading-tight mb-8">
        Interact with County-Level Demographic Maps</h2>
        <p className="text-lg text-white max-w-3xl mx-auto mb-6 text-center">
        Explore detailed data to gain insights into age and race demographics, as well as ownership patterns.
        Choose a state from the drop-down and then compare across counties to make your own data-driven decisions.
        </p>
        <form>
        <label className="text-white">
            Select State:
            <select
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
            className="ml-2 mb-4 p-2 border rounded text-black"
            >
            <option value="">Select State</option>
            {stateOptions.map((state, index) => (
                <option key={index} value={state}>
                {state}
                </option>
            ))}
            </select>
        </label>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
    </section>

      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
        <MapComponent
            title={<span className="text-4xl font-bold text-black">Housing Occupancy</span>}
            description={
                <p className="text-lg text-black text-left max-w-lg mx-auto">
                Housing occupancy compares the percentage of housing units that are occupied full-time to percent vacant. The first row is the percent occupied, the second row the percent vacant, and the following rows are a breakdown of the types of vacant units.
                </p>
            }
            scaleInfo={
                <p className="text-lg text-black text-left max-w-lg mx-auto">
                <strong>Scale:</strong> The map is color-coded from 
                <span className="text-green-600"> green</span> (higher occupancy rates),
                <span className="text-yellow-500"> yellow</span> (moderate occupancy), and
                <span className="text-red-600"> red</span> (lower occupancy rates).
                </p>
            }
            category="Housing Occupancy"
            stateName={stateName}
            fetchMap={fetchMap}
            loading={loading}
            mapData={maps['Housing Occupancy']}
            />
          <MapComponent
            title={<span className="text-4xl font-bold text-black">Owners vs Renters</span>}
            description={
            <p className="text-lg text-black text-left max-w-lg mx-auto">
                Compare the percentage of owner-occupied units versus renter-occupied units to get an idea of the renting and buying market in different areas.
            </p>
            }
            scaleInfo={
                <p className="text-lg text-black text-left max-w-lg mx-auto">
                <strong>Scale:</strong> The map is color-coded from green to yellow to red, where{' '}
                <span className="text-green-600">green</span> represents higher owner-occupied units and{' '}
                <span className="text-red-600">red</span> represents higher renter-occupied units.
                </p>
            }
            category="Housing Tenure"
            stateName={stateName}
            fetchMap={fetchMap}
            loading={loading}
            mapData={maps['Housing Tenure']}
          />
          <MapComponent
            title={<span className="text-4xl font-bold text-black">Racial Demographics</span>}
            description= {
            <p className="text-lg text-black text-left max-w-lg mx-auto">
                Explore the racial composition of different counties.
            </p>
            }
            scaleInfo={
                <p className="text-lg text-black text-left max-w-lg mx-auto">
                <strong>Scale:</strong> The map is color-coded from green to yellow to red, where{' '}
                <span className="text-green-600">green</span> represents higher diversity,{' '}
                <span className="text-yellow-500">yellow</span> represents moderate diversity, and{' '}
                <span className="text-red-600">red</span> represents lower diversity rates.
                </p>
            }
            category="Race"
            stateName={stateName}
            fetchMap={fetchMap}
            loading={loading}
            mapData={maps['Race']}
          />

          <MapComponent
            title={<span className="text-4xl font-bold text-black">Age Demographics</span>}
            description={
                <p className="text-lg text-black text-left max-w-lg mx-auto">
                    Analyze the age distribution across counties to find areas with people in your or your family’s age range.
                </p>
            }
            scaleInfo={
                <p className="text-lg text-black text-left max-w-lg mx-auto">
                <strong>Scale:</strong> The map is color-coded from green to yellow to red, where{' '}
                <span className="text-green-600">green</span> represents a younger age composition and{' '}
                <span className="text-red-600">red</span> represents an older age composition.
                </p>
            }
            category="Age"
            stateName={stateName}
            fetchMap={fetchMap}
            loading={loading}
            mapData={maps['Age']}
          />
        </div>
      </section>
              
              <section className="mt-12">
        <UnemploymentRateComponent />
      </section>
      <section className="mt-12">
        <HousingMarketComponent />
      </section>
      <section className="mt-12">
        <RenterMarketComponent />
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
