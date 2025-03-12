// src/app/components/calculators/ResultsSummary.js

'use client';

import React from 'react';

export default function ResultsSummary({
  results,
  schema,
  calculatorType,
  onExportPDF,
  onSubmitToHubspot,
  onReset,
}) {
  if (!results) {
    return <div className="loading-results">Loading results...</div>;
  }

  // Format currency
  const formatCurrency = (amount) => {
    return `£${amount.toFixed(2)}`;
  };

  // Render a feature item
  const renderFeatureItem = (feature, index) => {
    if (Array.isArray(feature)) {
      // Feature is [key, value] pair
      return (
        <div key={index} className="summary-item blue">
          <span className="summary-item-title">
            {feature[0]}: {feature[1]}
          </span>
        </div>
      );
    } else if (typeof feature === 'object') {
      // Feature is object with name/value
      return (
        <div key={index} className="summary-item blue">
          <span className="summary-item-title">
            {feature.name || 'Feature'}: {feature.value || 'Yes'}
          </span>
        </div>
      );
    } else {
      // Feature is string
      return (
        <div key={index} className="summary-item green">
          <span className="summary-item-title">{feature}</span>
        </div>
      );
    }
  };

  return (
    <div className="results-summary">
      <h2 className="results-title">
        {schema.resultsTitle || 'Your Results'}
      </h2>

      {results.summary && results.summary.tier && (
        <div className="tier-section">
          <h3 className="tier-title">Tier {results.summary.tier}</h3>
          <p className="tier-description">
            {results.summary.tier === 1 &&
              'Basic tier - Minimal complexity.'}
            {results.summary.tier === 2 &&
              'Intermediate tier - Moderate complexity.'}
            {results.summary.tier === 3 &&
              'Advanced tier - High complexity.'}
          </p>
        </div>
      )}

      {/* Features Section */}
      {results.features && results.features.length > 0 && (
        <div className="features-section">
          <h3 className="section-title">Features</h3>
          <div className="features-list">
            {results.features.map((feature, index) =>
              renderFeatureItem(feature, index)
            )}
          </div>
        </div>
      )}

      {/* Commission Items Section */}
      {results.commissionItems &&
        results.commissionItems.length > 0 && (
          <div className="commission-section">
            <h3 className="section-title">Commission Items</h3>
            <div className="commission-list">
              <ul>
                {results.commissionItems.map((item, index) => (
                  <li key={index}>
                    {typeof item === 'object'
                      ? item.name || item.description
                      : item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      {/* Pricing Section */}
      {results.pricing && schema.showPrice !== false && (
        <div className="pricing-section">
          <h3 className="section-title">Pricing</h3>

          <div className="price-item">
            <span className="price-label">Base Price:</span>
            <span className="price-value">
              {formatCurrency(results.pricing.basePrice || 0)}
            </span>
          </div>

          {results.pricing.additionalCosts &&
            Object.keys(results.pricing.additionalCosts).length >
              0 && (
              <div className="additional-costs">
                {Object.entries(results.pricing.additionalCosts).map(
                  ([name, cost], index) => (
                    <div key={index} className="price-item">
                      <span className="price-label">{name}:</span>
                      <span className="price-value">
                        {formatCurrency(cost)}
                      </span>
                    </div>
                  )
                )}
              </div>
            )}

          {typeof results.pricing.totalPrice === 'number' && (
            <div className="total-price">
              <span className="price-label">Total:</span>
              <span className="price-value total">
                {formatCurrency(results.pricing.totalPrice)}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="results-actions">
        <button className="secondary-button" onClick={onReset}>
          Start Over
        </button>

        <button className="secondary-button" onClick={onExportPDF}>
          Export PDF
        </button>

        {onSubmitToHubspot && (
          <button
            className="primary-button"
            onClick={onSubmitToHubspot}
          >
            Submit to Voyager
          </button>
        )}
      </div>

      {/* Add any custom content from schema */}
      {schema.resultsFooter && (
        <div
          className="results-footer"
          dangerouslySetInnerHTML={{ __html: schema.resultsFooter }}
        />
      )}
    </div>
  );
}
