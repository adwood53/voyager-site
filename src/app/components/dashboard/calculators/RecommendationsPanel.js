// src/app/components/dashboard/calculators/RecommendationsPanel.js

'use client';

import React, { useState } from 'react';

export default function RecommendationsPanel({
  recommendations,
  onBackToResults,
  onReset,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Group recommendations by category if they have one
  const groupedRecommendations = recommendations.reduce(
    (groups, recommendation) => {
      const category = recommendation.category || 'General';
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(recommendation);
      return groups;
    },
    {}
  );

  // Get all categories
  const categories = Object.keys(groupedRecommendations);

  // If no categories, just use a flat array
  const displayRecommendations =
    categories.length > 0
      ? Object.values(groupedRecommendations).flat()
      : recommendations;

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev < displayRecommendations.length - 1 ? prev + 1 : prev
    );
  };

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // If no recommendations, show a message
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="recommendations-panel empty">
        <h2>No Recommendations Available</h2>
        <p>
          Based on your answers, we don't have specific
          recommendations. Please review your results.
        </p>
        <div className="recommendations-actions">
          <button
            className="primary-button"
            onClick={onBackToResults}
          >
            View Results
          </button>
          <button className="secondary-button" onClick={onReset}>
            Start Over
          </button>
        </div>
      </div>
    );
  }

  // Get current recommendation
  const currentRecommendation = displayRecommendations[selectedIndex];

  return (
    <div className="recommendations-panel">
      <h2 className="recommendations-title">Recommended Solution</h2>

      {/* Recommendation display */}
      <div className="recommendation-card">
        <h3 className="recommendation-name">
          {currentRecommendation.title ||
            currentRecommendation.name ||
            'Recommendation'}
        </h3>

        {currentRecommendation.category && (
          <div className="recommendation-category">
            {currentRecommendation.category}
          </div>
        )}

        <div className="recommendation-description">
          {currentRecommendation.description ||
            'No description available.'}
        </div>

        {/* Features or specifications */}
        {currentRecommendation.features && (
          <div className="recommendation-features">
            <h4>Key Features</h4>
            <ul>
              {currentRecommendation.features.map(
                (feature, index) => (
                  <li key={index}>{feature}</li>
                )
              )}
            </ul>
          </div>
        )}

        {/* Custom fields in recommendation */}
        {Object.entries(currentRecommendation)
          .filter(
            ([key]) =>
              ![
                'title',
                'name',
                'description',
                'category',
                'features',
                'id',
              ].includes(key)
          )
          .map(
            ([key, value]) =>
              typeof value === 'string' && (
                <div key={key} className="recommendation-detail">
                  <strong>
                    {key
                      .replace(/([A-Z])/g, ' $1')
                      .replace(/^./, (str) => str.toUpperCase())}
                    :
                  </strong>{' '}
                  {value}
                </div>
              )
          )}
      </div>

      {/* Navigation */}
      <div className="recommendation-navigation">
        <button
          className="secondary-button"
          onClick={handlePrevious}
          disabled={selectedIndex === 0}
        >
          Previous
        </button>

        <div className="recommendation-counter">
          {selectedIndex + 1} of {displayRecommendations.length}
        </div>

        <button
          className="secondary-button"
          onClick={handleNext}
          disabled={
            selectedIndex >= displayRecommendations.length - 1
          }
        >
          Next
        </button>
      </div>

      {/* Actions */}
      <div className="recommendations-actions">
        <button className="primary-button" onClick={onBackToResults}>
          View Detailed Results
        </button>
        <button className="secondary-button" onClick={onReset}>
          Start Over
        </button>
      </div>
    </div>
  );
}
