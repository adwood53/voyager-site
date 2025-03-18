// src/app/components/dashboard/calculator/ResultsSummary.js
'use client';

import React from 'react';

export default function ResultsSummary({
  results,
  schema,
  calculatorType,
  onExportPDF,
  onSubmitToHubspot,
  onReset,
  partner,
}) {
  if (!results) {
    return <div className="loading-results">Loading results...</div>;
  }

  // Format currency
  const formatCurrency = (amount) => {
    return `£${amount.toFixed(2)}`;
  };

  // Categorize features for better display
  const categorizeFeatures = () => {
    const categories = {
      pricing: [],
      productType: [],
      quantities: [],
      other: [],
    };

    results.features.forEach((feature) => {
      const featureStr =
        typeof feature === 'string'
          ? feature
          : Array.isArray(feature)
            ? `${feature[0]}: ${feature[1]}`
            : feature.name
              ? `${feature.name}: ${feature.value}`
              : 'Unknown feature';

      // Categorize based on feature content
      if (
        featureStr.includes('Pricing Structure') ||
        featureStr.includes('price')
      ) {
        categories.pricing.push(feature);
      } else if (
        featureStr.includes('A1 Posters') ||
        featureStr.includes('A2 Posters') ||
        featureStr.includes('A3 Posters') ||
        featureStr.includes('Business Cards') ||
        featureStr.includes('Bundle')
      ) {
        categories.quantities.push(feature);
      } else if (
        featureStr.includes('Product Category') ||
        featureStr.includes('New Experience') ||
        featureStr.includes('New Scan Target') ||
        featureStr.includes('3D Logo')
      ) {
        categories.productType.push(feature);
      } else if (
        !featureStr.includes('Project') &&
        !featureStr.includes('Client')
      ) {
        // Add everything else except project and client info to 'other' category
        categories.other.push(feature);
      }
    });

    return categories;
  };

  // Render a feature item based on its type
  const renderFeatureItem = (feature, index) => {
    if (Array.isArray(feature)) {
      // Feature is [key, value] pair
      return (
        <div key={index} className="summary-item">
          <span className="summary-item-title">{feature[0]}:</span>{' '}
          {feature[1]}
        </div>
      );
    } else if (typeof feature === 'object' && feature !== null) {
      // Feature is object with name/value
      return (
        <div key={index} className="summary-item">
          <span className="summary-item-title">
            {feature.name || 'Feature'}:
          </span>{' '}
          {feature.value || 'Yes'}
        </div>
      );
    } else {
      // Feature is string
      // Check for special merchandise features that should be highlighted
      const isMerchandiseQuantity =
        typeof feature === 'string' &&
        (feature.includes('Posters:') ||
          feature.includes('Business Cards:') ||
          feature.includes('Bundle:'));

      return (
        <div
          key={index}
          className={`summary-item ${isMerchandiseQuantity ? 'highlight-item' : ''}`}
        >
          {isMerchandiseQuantity ? (
            <span className="summary-item-title">{feature}</span>
          ) : (
            <span>{feature}</span>
          )}
        </div>
      );
    }
  };

  // Get all the categorized features
  const featureCategories = categorizeFeatures();

  return (
    <div className="results-summary">
      <h2 className="results-title">
        {schema.resultsTitle || 'Your Results'}
      </h2>

      {/* Product & Experience Type Section */}
      {featureCategories.productType.length > 0 && (
        <div className="features-section">
          <h3 className="section-title">Product Type</h3>
          <div className="features-list">
            {featureCategories.productType.map((feature, index) =>
              renderFeatureItem(feature, index)
            )}
          </div>
        </div>
      )}

      {/* Merchandise Quantities Section */}
      {featureCategories.quantities.length > 0 && (
        <div className="features-section">
          <h3 className="section-title">Selected Quantities</h3>
          <div className="features-list">
            {featureCategories.quantities.map((feature, index) =>
              renderFeatureItem(feature, index)
            )}
          </div>
        </div>
      )}

      {/* Other Features Section */}
      {featureCategories.other.length > 0 && (
        <div className="features-section">
          <h3 className="section-title">Additional Features</h3>
          <div className="features-list">
            {featureCategories.other.map((feature, index) =>
              renderFeatureItem(feature, index)
            )}
          </div>
        </div>
      )}

      {/* Commission Items Section */}
      {results.commissionItems &&
        results.commissionItems.length > 0 && (
          <div className="commission-section">
            <h3 className="section-title">
              Items to be Commissioned
            </h3>
            <div className="commission-list">
              <ul>
                {results.commissionItems
                  .filter((item) => {
                    // Filter out items that contain commission amounts for the salesperson
                    return !(
                      typeof item === 'string' &&
                      (item.includes('£') ||
                        item.includes('Commission'))
                    );
                  })
                  .map((item, index) => (
                    <li key={index} className="commission-item">
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
      {results.pricing && schema.actions?.showPrice !== false && (
        <div className="pricing-section">
          <h3 className="section-title">Pricing</h3>

          <div className="price-items">
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
                  {Object.entries(
                    results.pricing.additionalCosts
                  ).map(([name, cost], index) => (
                    <div key={index} className="price-item">
                      <span className="price-label">{name}:</span>
                      <span className="price-value">
                        {formatCurrency(cost)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

            {typeof results.pricing.totalPrice === 'number' && (
              <div className="total-price price-item">
                <span className="price-label">Total:</span>
                <span className="price-value total">
                  {formatCurrency(results.pricing.totalPrice)}
                </span>
              </div>
            )}

            {/* Add sales commission display in green */}
            {results.pricing.salesCommission > 0 &&
              results.summary.pricingStructure === 'partner' && (
                <div className="commission-price price-item">
                  <span className="price-label">
                    Partner Commission:
                  </span>
                  <span
                    className="price-value commission"
                    style={{ color: '#10b981' }}
                  >
                    {' '}
                    {/* Green color for commission */}
                    {formatCurrency(results.pricing.salesCommission)}
                  </span>
                </div>
              )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="results-actions">
        <button className="secondary-button" onClick={onReset}>
          Start Over
        </button>

        {onExportPDF && (
          <button className="secondary-button" onClick={onExportPDF}>
            Export PDF
          </button>
        )}

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
