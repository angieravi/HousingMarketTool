import React, { useEffect } from 'react';
import * as d3 from 'd3';
import Footer from '../components/Footer';

const MarketPage = () => {
  // doing the two charts with metro areas first
  // https://d3-graph-gallery.com/graph/line_basic.html
  const createMetroChart = (chartId, dataKey, title, yLabel, useKSuffix = false) => {
    d3.json('/housing_metrics.json') // Load data from JSON
      .then((data) => {
        const container = d3.select(`#${chartId}`).node();
        const containerWidth = container.getBoundingClientRect().width;
  
        const width = containerWidth > 950 ? 950 : containerWidth; // max width for big screen
        const height = width / 1.5; // Maintain 3:2 
        const margin = { top: 50, right: 225, bottom: 80, left: 80 };
  
        // contianer
        const svg = d3
          .select(`#${chartId}`)
          .append('svg')
          .attr('viewBox', `0 0 ${width} ${height}`)
          .classed('svg-content-responsive', true);
  
        // scales
        const x = d3
          .scaleTime()
          .domain(d3.extent(data[0].time_series, (d) => new Date(d.date)))
          .range([margin.left, width - margin.right]);
  
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(data, (region) => d3.max(region.time_series, (d) => d[dataKey]))])
          .nice()
          .range([height - margin.bottom, margin.top]);
  
        // generate lines
        const line = d3
          .line()
          .x((d) => x(new Date(d.date)))
          .y((d) => y(d[dataKey]));
  
        const color = d3.scaleOrdinal(d3.schemeCategory10);
  
        // tooltip for hovering
        const tooltip = d3
          .select('body')
          .append('div')
          .attr('class', 'tooltip bg-white border border-gray-800 rounded p-2 text-sm hidden absolute');
  
        //draw
        data.forEach((region, i) => {
          svg
            .append('path')
            .datum(region.time_series)
            .attr('fill', 'none')
            .attr('stroke', color(i))
            .attr('stroke-width', 2.5)
            .attr('d', line)
            .on('mouseover', () => {
              tooltip
                .classed('hidden', false)
                .html(`<strong>${region.region}</strong>`);
            })
            .on('mousemove', (event) => {
              tooltip
                .style('top', `${event.pageY - 30}px`)
                .style('left', `${event.pageX + 10}px`);
            })
            .on('mouseout', () => {
              tooltip.classed('hidden', true);
            });
        });
  
        // X-axis
        svg
          .append('g')
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%b %Y')))
          .selectAll('text')
          .attr('transform', 'rotate(-45)')
          .style('text-anchor', 'end');
  
        // Y-axis
        svg
          .append('g')
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).tickFormat((d) => (useKSuffix ? `${d.toLocaleString()}k` : d.toLocaleString())));
  
        // X-axis label
        svg
          .append('text')
          .attr('x', width / 2)
          .attr('y', height - 20)
          .attr('text-anchor', 'middle')
          .attr('class', 'text-sm text-gray-700')
          .text('Date');
  
        // Y-axis label
        svg
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -(height / 2))
          .attr('y', margin.left - 50)
          .attr('text-anchor', 'middle')
          .attr('class', 'text-sm text-gray-700')
          .text(yLabel);
  
          // Legend
          const legend = svg
            .append('g')
            .attr('class', 'legend')
            .attr(
              'transform',
              `translate(${width - margin.right + 10}, ${margin.top})` 
            );

          data.forEach((region, i) => {
            const legendRow = legend
              .append('g')
              .attr('transform', `translate(0, ${i * 20})`);

            legendRow
              .append('rect')
              .attr('width', 15)
              .attr('height', 15)
              .attr('fill', color(i));

            // 
            legendRow
              .append('text')
              .attr('x', 20) 
              .attr('y', 12) 
              .attr('class', 'text-sm text-gray-700')
              .text(region.region);
          });


        // Title
        svg
          .append('text')
          .attr('x', width / 2)
          .attr('y', margin.top / 2)
          .attr('text-anchor', 'middle')
          .attr('class', 'text-lg font-bold text-gray-800')
          .text(title);
      })
      .catch((error) => console.error(`Error loading ${title} data:`, error));
  };  
  
  const createNationalChart = (chartId, dataKey, title, yLabel) => {
    d3.json('/housing_metrics.json')
      .then((data) => {
        const container = d3.select(`#${chartId}`).node();
        const containerWidth = container?.getBoundingClientRect()?.width || 800; // Fallback width
        const width = containerWidth > 950 ? 950 : containerWidth; // Max width for big screen
        const height = width / 1.5; // Maintain 3:2 aspect ratio
        const margin = { top: 50, right: 225, bottom: 80, left: 80 };
  
        const lineWidth = width / 400; 
  
        const svg = d3
          .select(`#${chartId}`)
          .append('svg')
          .attr('viewBox', `0 0 ${width} ${height}`)
          .classed('svg-content-responsive', true);
  
        const x = d3
          .scaleTime()
          .domain(d3.extent(data[0].time_series, (d) => new Date(d.date)))
          .range([margin.left, width - margin.right]);
  
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(data[0].time_series, (d) => d[dataKey])])
          .nice()
          .range([height - margin.bottom, margin.top]);
  
        const line = d3
          .line()
          .x((d) => x(new Date(d.date)))
          .y((d) => y(d[dataKey]));
  
        svg
          .append('path')
          .datum(data[0].time_series)
          .attr('fill', 'none')
          .attr('stroke', 'teal')
          .attr('stroke-width', lineWidth) // Dynamically scaled
          .attr('d', line);
  
          svg
          .append('g')
          .attr('transform', `translate(0,${height - margin.bottom})`)
          .call(d3.axisBottom(x).tickFormat(d3.timeFormat('%b %Y')))
          .selectAll('text')
          .attr('transform', 'rotate(-45)')
          .style('text-anchor', 'end');

  
        svg
          .append('g')
          .attr('transform', `translate(${margin.left},0)`)
          .call(d3.axisLeft(y).tickFormat((d) => `${d.toLocaleString()}`));
  
        svg
          .append('text')
          .attr('x', width / 2)
          .attr('y', height - 20)
          .attr('text-anchor', 'middle')
          .attr('class', 'text-sm text-gray-700')
          .text('Date');
  
        svg
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('x', -(height / 2))
          .attr('y', margin.left - 50)
          .attr('text-anchor', 'middle')
          .attr('class', 'text-sm text-gray-700')
          .text(yLabel);
  
        svg
          .append('text')
          .attr('x', width / 2)
          .attr('y', margin.top / 2)
          .attr('text-anchor', 'middle')
          .attr('class', 'text-lg font-bold text-gray-800')
          .text(title);
  
        const legendX = width > 600 ? width - margin.right - 20 : width - 150; // Adjust dynamically
        const legend = svg
          .append('g')
          .attr('class', 'legend')
          .attr('transform', `translate(${legendX}, ${margin.top})`);
  
        legend
          .append('rect')
          .attr('width', 15)
          .attr('height', 15)
          .attr('fill', 'teal');
  
        legend
          .append('text')
          .attr('x', 20)
          .attr('y', 12)
          .text('National')
          .attr('class', 'text-sm text-gray-700');
      })
      .catch((error) => console.error(`Error loading ${title} data:`, error));
  };
  
  
  
//i got rid of chart1 at sme point
  useEffect(() => {
    createMetroChart('chart2', 'median_price', 'Median Sale Price Over Time', 'Median Sale Price ($)', true); // add the k
    createMetroChart('chart5', 'days_on_market', 'Days Listed Over Time', 'Days Listed', false); // false means dont add the k to x axis points
    createNationalChart('chart3', 'homes_sold', 'Homes Sold Over Time', 'Homes Sold');
    createNationalChart('chart4', 'new_listings', 'New Listings Over Time', 'New Listings');
  }, []);

  return (
    <div>
      <div>
    <section className="py-12 bg-green-700">
      <div className="container mx-auto px-6">
        {/* Title: Centered */}
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-white leading-tight">
            Housing Market Trends Over Time
          </h2>
        </div>
        <div className="text-left max-w-2xl mx-auto">
          <p className="text-lg text-white leading-relaxed">
            Explore an overview of the latest trends in the housing market, including median sale prices, days listed, homes sold, and new listings.
            These graphs are powered by insights from{' '}
            <a
              href="https://www.redfin.com/news/data-center/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline hover:text-gray-300"
            >
              Redfin
            </a>
            , a national real estate brokerage. Use this data to analyze housing trends over time and make informed decisions.
          </p>
        </div>
      </div>
    </section>
</div>
    <div className="flex flex-col items-center p-6 space-y-10">
        <div id="chart2" className="chart-container w-full max-w-5xl mx-auto p-4 border rounded-lg shadow-md bg-white"/>
        <div id="chart5" className="chart-container w-full max-w-5xl mx-auto p-4 border rounded-lg shadow-md bg-white"/>
        <div id="chart3" className="chart-container w-full max-w-5xl mx-auto p-4 border rounded-lg shadow-md bg-white"/>
        <div id="chart4" className="chart-container w-full max-w-5xl mx-auto p-4 border rounded-lg shadow-md bg-white"/>
      </div>
      <Footer />
    </div>
  );
};

export default MarketPage;
