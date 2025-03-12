// src/utils/hubspot.js

/**
 * HubSpot Integration Utility
 *
 * This utility provides functions for interacting with HubSpot API,
 * including creating contacts and deals.
 */

/**
 * Create a deal in HubSpot with contact association
 *
 * @param {Object} contactDetails - Contact information
 * @param {Object} calculatorResults - Results from calculator
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} API response
 */
export async function createDeal(
  contactDetails,
  calculatorResults,
  options = {}
) {
  try {
    const response = await fetch('/api/hubspot/create-deal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contactDetails,
        configurationData: calculatorResults,
        calculatorType: options.calculatorType || 'generic',
        salesPersonId: options.salesPersonId,
        organizationId: options.organizationId,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create deal');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating HubSpot deal:', error);
    throw error;
  }
}

/**
 * Format calculator results for HubSpot API
 *
 * @param {Object} results - Calculator results
 * @param {string} calculatorType - Type of calculator
 * @returns {Object} Formatted data for HubSpot
 */
export function formatResultsForHubspot(
  results,
  calculatorType = 'generic'
) {
  // Convert features to string
  const featureString = results.features
    .map((feature) => {
      if (Array.isArray(feature)) {
        return `${feature[0]}: ${feature[1]}`;
      } else if (typeof feature === 'object') {
        return `${feature.name || 'Feature'}: ${feature.value || 'Yes'}`;
      } else {
        return feature;
      }
    })
    .join('\n');

  // Convert commission items to string
  const commissionString =
    results.commissionItems.length > 0
      ? results.commissionItems.join('\n')
      : 'None';

  return {
    summary: {
      type: calculatorType,
      tier: results.summary.tier || 1,
      projectDetails: results.summary.projectDetails || '',
      totalFeatures: results.features.length,
    },
    features: featureString,
    commissionItems: commissionString,
    pricing: results.pricing,
    immersionLink: results.immersionLink || '',
  };
}
