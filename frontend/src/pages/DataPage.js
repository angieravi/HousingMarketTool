import React from 'react';
import Footer from '../components/Footer';

const DataPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-4">Data</h1>
        <p className="text-lg text-gray-700 mb-4">
          We rely on consistently updated, publicly available data to power our visualizations. Our data comes from the following sources:
        </p>
        <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
          <li>
            <a
              href="https://www.redfin.com/news/data-center/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 hover:underline"
            >
              Redfin
            </a>{' '}
            - Insights on housing market trends.
          </li>
          <li>
            <a
              href="https://www.zillow.com/research/data/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 hover:underline"
            >
              Zillow Research
            </a>{' '}
            - Rental and home price data.
          </li>
          <li>
            <a
              href="https://www.census.gov/programs-surveys/decennial-census/decade/2020/2020-census-results.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 hover:underline"
            >
              U.S. Census Bureau
            </a>{' '}
            - 2020 Census results and demographic data.
          </li>
          <li>
            <a
              href="https://www.ers.usda.gov/data-products/county-level-data-sets/county-level-data-sets-download-data/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-700 hover:underline"
            >
              USDA Economic Research Service
            </a>{' '}
            - County-level data on economics.
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default DataPage;
