// src/lib/hubspot.js

/**
 * Formats calculator results for submission to HubSpot
 *
 * @param {Object} results - Calculator results object
 * @param {string} calculatorType - Type of calculator
 * @returns {Object} - Formatted data for HubSpot
 */
export function formatResultsForHubspot(
  results,
  calculatorType = 'generic'
) {
  // Format features into a string
  const featureString = Array.isArray(results.features)
    ? results.features
        .map((feature) => {
          if (Array.isArray(feature)) {
            return `${feature[0]}: ${feature[1]}`;
          } else if (typeof feature === 'object') {
            return `${feature.name || 'Feature'}: ${feature.value || 'Yes'}`;
          } else {
            return feature;
          }
        })
        .join('\n')
    : '';

  // Format commission items into a string
  const commissionString = Array.isArray(results.commissionItems)
    ? results.commissionItems
        .map((item) => {
          if (typeof item === 'object') {
            return item.name || item.description || 'Unknown item';
          } else {
            return item;
          }
        })
        .join('\n')
    : '';

  // Return the formatted data
  return {
    summary: {
      type: calculatorType,
      tier: results.summary?.tier || 1,
      projectDetails: results.summary?.projectDetails || '',
      totalFeatures: Array.isArray(results.features)
        ? results.features.length
        : 0,
    },
    features: featureString,
    commissionItems: commissionString || 'None',
    pricing: results.pricing || {
      basePrice: 0,
      totalPrice: 0,
    },
    immersionLink: results.immersionLink || '',
  };
}

/**
 * Creates a deal in HubSpot
 *
 * @param {Object} contactDetails - Customer contact information
 * @param {Object} configurationData - Calculator results
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} - API response
 */
export async function createDeal(
  contactDetails,
  configurationData,
  options = {}
) {
  try {
    // Make API request to HubSpot endpoint
    const response = await fetch('/api/hubspot/calculator-deal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactDetails,
        configurationData,
        calculatorType: options.calculatorType || 'generic',
        salesPersonId: options.salesPersonId,
        organizationId: options.organizationId,
      }),
    });

    // Check if request was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create deal');
    }

    // Return the response data
    return await response.json();
  } catch (error) {
    console.error('Error creating deal in HubSpot:', error);
    throw error;
  }
}
