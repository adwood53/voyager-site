// src/app/components/calculators/RecommendationsPanel.js

'use client';

import React, { useState } from 'react';
import { groupRecommendationsByCategory } from '@/utils/recommendationEngine';

export default function RecommendationsPanel({
  recommendations,
  onBackToResults,
  onReset,
}) {
  const [activeCategory, setActiveCategory] = useState(null);

  // Group recommendations by category
  const groupedRecommendations =
    groupRecommendationsByCategory(recommendations);

  // Get all categories
  const categories = Object.keys(groupedRecommendations);

  // Set default active category if none selected
  if (categories.length > 0 && !activeCategory) {
    setActiveCategory(categories[0]);
  }

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Get recommendations for active category
  const getCategoryRecommendations = () => {
    return activeCategory
      ? groupedRecommendations[activeCategory] || []
      : [];
  };

  return (
    <div className="recommendations-panel">
      <h2 className="recommendations-title">Recommendations</h2>

      {categories.length > 1 && (
        <div className="categories-tabs">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
            >
              {category === 'default' ? 'General' : category}
            </button>
          ))}
        </div>
      )}

      <div className="recommendations-list">
        {getCategoryRecommendations().map((recommendation, index) => (
          <div key={index} className="recommendation-card">
            <h3 className="recommendation-title">
              {recommendation.title}
            </h3>

            {recommendation.description && (
              <p className="recommendation-description">
                {recommendation.description}
              </p>
            )}

            {recommendation.image && (
              <div className="recommendation-image">
                <img
                  src={recommendation.image}
                  alt={recommendation.title}
                />
              </div>
            )}

            {recommendation.link && (
              <a
                href={recommendation.link}
                target="_blank"
                rel="noopener noreferrer"
                className="recommendation-link"
              >
                {recommendation.linkText || 'Learn More'}
              </a>
            )}
          </div>
        ))}

        {getCategoryRecommendations().length === 0 && (
          <div className="no-recommendations">
            No recommendations available for this category.
          </div>
        )}
      </div>

      <div className="recommendations-actions">
        <button
          className="secondary-button"
          onClick={onBackToResults}
        >
          Back to Results
        </button>

        <button className="secondary-button" onClick={onReset}>
          Start Over
        </button>
      </div>
    </div>
  );
}
