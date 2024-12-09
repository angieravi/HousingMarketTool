import React from 'react';

const MapComponent = ({ title, description, scaleInfo, category, stateName, fetchMap, loading, mapData }) => {
  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">{description}</p>
      <p className="text-sm text-gray-500 max-w-3xl mx-auto">{scaleInfo}</p>
      <br />
      <button
        onClick={() => fetchMap(category)}
        disabled={!stateName || loading}
        className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-900"
      >
        Generate Map
      </button>
      {loading && <p className="text-lg text-gray-500 mt-4">Loading...</p>}
      {mapData && (
        <div className="mt-8">
          <iframe
            srcDoc={mapData}
            width="75%"
            height="600"
            className="mx-auto rounded-lg shadow-lg"
            style={{ border: 'none' }}
            title={`${title} Map`}
          />
        </div>
      )}
    </div>
  );
};

export default MapComponent;
