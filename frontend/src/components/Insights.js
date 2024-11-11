// frontend/src/components/Insights.js
import React from 'react';

const Insights = () => {
  const insights = [
    { title: 'Top Features', description: 'Spacious rooms, modern kitchen' },
    { title: 'Local Recommendations', description: 'Best restaurants and parks nearby' },
    { title: 'Community Insights', description: 'Friendly neighborhood, easy access to public transport' }
  ];

  return (
    <section className="insights" id="insights">
      <h2>Insights</h2>
      <div className="insights-grid">
        {insights.map((insight, index) => (
          <div key={index} className="insight-card">
            <h3>{insight.title}</h3>
            <p>{insight.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Insights;
