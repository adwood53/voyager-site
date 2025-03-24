// src/lib/calculatorEngine.js
/**
 * Calculate results based on answers and schema
 *
 * @param {Object} schema - Calculator schema
 * @param {Object} answers - User's answers
 * @param {Object} options - Additional options
 * @returns {Object} - Calculation results
 */

/**
 * Initialize answers with default values from schema
 *
 * @param {Object} schema - Calculator schema
 * @returns {Object} - Initial answers object
 */
export function initializeAnswers(schema) {
  const answers = {};

  // Iterate through all sections and questions
  if (schema.sections) {
    schema.sections.forEach((section) => {
      if (section.questions) {
        section.questions.forEach((question) => {
          if (question.defaultValue !== undefined) {
            answers[question.id] = question.defaultValue;
          }
        });
      }
    });
  }

  return answers;
}

/**
 * Check if a section should be shown based on dependencies
 *
 * @param {Object} section - Section to check
 * @param {Object} answers - User's answers
 * @returns {boolean} - Whether section should be shown
 */
export function shouldShowSection(section, answers) {
  if (!section.dependsOn) return true;

  const { questionId, value } = section.dependsOn;

  // Check for array values in multi-select questions
  if (Array.isArray(answers[questionId])) {
    return answers[questionId].includes(value);
  }

  return answers[questionId] === value;
}

/**
 * Validate answers against schema requirements
 *
 * @param {Object} schema - Calculator schema
 * @param {Object} answers - User's answers
 * @returns {Object} - Validation result { valid, errors }
 */
export function validateAnswers(schema, answers) {
  const errors = [];

  // If schema doesn't have questions, return valid
  if (
    !schema.questions &&
    (!schema.sections || schema.sections.length === 0)
  ) {
    return { valid: true, errors };
  }

  // Get all questions from sections or directly from questions array
  const allQuestions = [];

  if (schema.sections) {
    schema.sections.forEach((section) => {
      if (section.questions) {
        // Check if the section should be shown based on dependencies
        if (shouldShowSection(section, answers)) {
          section.questions.forEach((question) => {
            allQuestions.push({ ...question, sectionId: section.id });
          });
        }
      }
    });
  } else if (schema.questions) {
    schema.questions.forEach((question) => {
      allQuestions.push({ ...question });
    });
  }

  // Check required questions
  allQuestions.forEach((question) => {
    // Skip if question shouldn't be displayed based on dependencies
    if (question.dependsOn) {
      const { questionId, value } = question.dependsOn;
      if (answers[questionId] !== value) {
        return;
      }
    }

    // Skip non-required questions
    if (question.required === false) {
      return;
    }

    const value = answers[question.id];

    // Check if value is empty
    if (
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0)
    ) {
      errors.push({
        questionId: question.id,
        message: `${question.label || question.id} is required`,
      });
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}

export function calculateResults(schema, answers, options = {}) {
  // Initialize results object with default values and Hubspot-compatible structure
  const results = {
    features: [],
    commissionItems: [],
    pricing: {
      basePrice: 0,
      additionalCosts: {},
      totalPrice: 0,
      salesCommission: 0, // Track sales commission separately
    },
    summary: {
      tier: 1, // Default to tier 1 for calculator
      type: schema.id || 'generic',
      projectDetails: '',
      pricingStructure: answers.pricingType || 'partner', // Default to partner pricing
      configurationType: 'New Target', // Default value, will be updated as needed
    },
  };

  // Add debugging for initial state
  console.log('Calculator initial state:', {
    answers,
    pricingType: answers.pricingType,
    options,
  });

  // Ensure pricingStructure is set in options for effect conditions
  options.pricingStructure =
    answers.pricingType || results.summary.pricingStructure;

  // Process single-select questions directly
  if (answers.pricingType) {
    // Ensure the pricingStructure is set correctly in both places
    results.summary.pricingStructure = answers.pricingType;
    options.pricingStructure = answers.pricingType;
  }

  // Process sections
  if (schema.sections) {
    schema.sections.forEach((section) => {
      // Skip sections that shouldn't be shown based on dependencies
      if (section.dependsOn) {
        const { questionId, value } = section.dependsOn;
        if (answers[questionId] !== value) {
          return;
        }
      }

      if (section.questions) {
        // Process each question's effects
        section.questions.forEach((question) => {
          const value = answers[question.id];

          // Handle specific case for pricing type
          if (question.id === 'pricingType' && value) {
            results.summary.pricingStructure = value;
            options.pricingStructure = value;
          }

          // Capture experience type for Hubspot
          if (question.id === 'experienceType' && value) {
            switch (value) {
              case 'new-experience':
                results.summary.configurationType = 'New Experience';
                break;
              case 'new-target':
                results.summary.configurationType = 'New Target';
                break;
              default:
                // Keep default
                break;
            }
          }

          // Process direct question effects if any
          if (
            value !== undefined &&
            value !== null &&
            question.effects
          ) {
            processEffects(
              question.effects,
              value,
              results,
              options,
              answers,
              question
            );
          }

          // Process effects from selected option for single-select questions
          if (
            question.type === 'single-select' &&
            value &&
            question.options
          ) {
            const selectedOption = question.options.find(
              (option) => option.id === value
            );

            if (selectedOption && selectedOption.effects) {
              processEffects(
                selectedOption.effects,
                value,
                results,
                options,
                answers,
                question,
                selectedOption
              );
            }
          }

          // Process effects from multiple selected options for multi-select questions
          if (
            question.type === 'multi-select' &&
            Array.isArray(value) &&
            question.options
          ) {
            value.forEach((optionId) => {
              const selectedOption = question.options.find(
                (option) => option.id === optionId
              );

              if (selectedOption && selectedOption.effects) {
                processEffects(
                  selectedOption.effects,
                  true,
                  results,
                  options,
                  answers,
                  question,
                  selectedOption
                );
              }
            });
          }
        });
      }
    });
  }

  // Calculate total price
  const additionalCostsTotal = Object.values(
    results.pricing.additionalCosts
  ).reduce((sum, cost) => sum + cost, 0);

  results.pricing.totalPrice =
    results.pricing.basePrice + additionalCostsTotal;

  // Handle project details from answers if applicable
  if (answers.projectDetails) {
    results.summary.projectDetails = answers.projectDetails;
  } else if (answers.projectDescription) {
    results.summary.projectDetails = answers.projectDescription;
  } else if (answers.additionalRequirements) {
    results.summary.projectDetails +=
      ' ' + answers.additionalRequirements;
  }

  // Add any partner-specific pricing adjustments
  if (
    options.partner &&
    options.partner.config &&
    options.partner.config.pricing
  ) {
    const pricingConfig = options.partner.config.pricing;

    // Apply pricing tiers based on schema tier
    if (results.summary.tier === 1 && pricingConfig.tier1) {
      results.pricing.tierPrice = pricingConfig.tier1;
    } else if (results.summary.tier === 2 && pricingConfig.tier2) {
      results.pricing.tierPrice = pricingConfig.tier2;
    } else if (results.summary.tier === 3 && pricingConfig.tier3) {
      results.pricing.tierPrice = pricingConfig.tier3;
    }

    // Apply referral commission if applicable
    if (
      options.partner.config.pricingType === 'referral' &&
      pricingConfig.commissionRate
    ) {
      results.pricing.salesCommission =
        results.pricing.totalPrice * pricingConfig.commissionRate;
    }
  }

  // Create formatted strings for Hubspot
  results.hubspotData = {
    dealname: `${options.user?.firstName || 'Customer'} ${options.user?.lastName || ''} - ${results.summary.type} Configuration`,
    pipeline: 'default',
    dealstage: 'appointmentscheduled',
    amount: results.pricing.totalPrice.toString(),
    configuration_tier: results.summary.tier.toString(),
    configuration_type__ar_vr_: results.summary.configurationType,
    configuration_features: results.features.join('\n'),
    items_to_be_commissioned: results.commissionItems.join('\n'),
    project_details: results.summary.projectDetails,
    project_link: '',
    brandsource: options.partner?.brandSource || 'voyager',
  };

  // Log final calculation results for debugging
  console.log('Final calculation results:', {
    pricingStructure: results.summary.pricingStructure,
    basePrice: results.pricing.basePrice,
    additionalCosts: results.pricing.additionalCosts,
    totalPrice: results.pricing.totalPrice,
    salesCommission: results.pricing.salesCommission,
    tier: results.summary.tier,
    features: results.features.length,
    commissionItems: results.commissionItems.length,
  });

  return results;
}

/**
 * Process a list of effects to update results
 *
 * @param {Array} effects - List of effects to process
 * @param {any} value - Answer value for the question
 * @param {Object} results - Results object to update
 * @param {Object} options - Global options
 * @param {Object} answers - All answers
 * @param {Object} question - Current question
 * @param {Object} option - Selected option (for single/multi-select questions)
 */
function processEffects(
  effects,
  value,
  results,
  options,
  answers,
  question,
  option = null
) {
  effects.forEach((effect) => {
    // Skip if effect has a condition that isn't met
    if (effect.condition) {
      // Check pricing structure condition
      if (effect.condition.pricingStructure !== undefined) {
        const currentStructure =
          options.pricingStructure ||
          results.summary.pricingStructure;

        if (effect.condition.pricingStructure !== currentStructure) {
          console.log(
            `Skipping effect due to pricing structure mismatch:`,
            {
              needed: effect.condition.pricingStructure,
              current: currentStructure,
              effect: effect,
            }
          );
          return; // Skip this effect
        }
      }

      // Simple boolean answer condition
      if (
        effect.condition.answer !== undefined &&
        effect.condition.answer !== value
      ) {
        return;
      }

      // Min value condition
      if (
        effect.condition.minValue !== undefined &&
        value < effect.condition.minValue
      ) {
        return;
      }

      // Max value condition
      if (
        effect.condition.maxValue !== undefined &&
        value > effect.condition.maxValue
      ) {
        return;
      }
    }

    // Process effect based on type
    switch (effect.type) {
      case 'add-feature':
        if (Array.isArray(effect.value)) {
          results.features.push(...effect.value);
        } else {
          results.features.push(effect.value);
        }
        break;

      case 'add-commission':
        // Just add the item to commissionItems list (no monetary value)
        results.commissionItems.push(effect.value);
        break;

      case 'add-sales-commission':
        // Add the commission amount to the pricing data
        if (typeof effect.value === 'number') {
          results.pricing.salesCommission =
            (results.pricing.salesCommission || 0) + effect.value;
        } else {
          // Try to parse a number if it's a string
          const commissionAmount = parseFloat(effect.value);
          if (!isNaN(commissionAmount)) {
            results.pricing.salesCommission =
              (results.pricing.salesCommission || 0) +
              commissionAmount;
          }
        }
        break;

      case 'set-base-price':
        results.pricing.basePrice = effect.value;
        break;

      case 'add-price':
        // If multiplying by quantity
        if (effect.multiplier && effect.multiplier in answers) {
          const quantity = Number(answers[effect.multiplier]);
          if (!isNaN(quantity)) {
            const name =
              effect.name ||
              `${option?.label || question.label} Cost`;
            results.pricing.additionalCosts[name] =
              effect.value * quantity;
            console.log(
              `Added price with multiplier: ${name} = ${effect.value} * ${quantity}`
            );
          }
        } else {
          const name =
            effect.name || `${option?.label || question.label} Cost`;
          results.pricing.additionalCosts[name] = effect.value;
          console.log(`Added price: ${name} = ${effect.value}`);
        }
        break;

      case 'set-tier':
        // Allow explicit tier setting for merchandise
        results.summary.tier = effect.value;
        console.log(`Set tier to: ${effect.value}`);
        break;

      case 'set-project-details':
        results.summary.projectDetails = answers[effect.value] || '';
        break;

      case 'set-pricing-structure':
        results.summary.pricingStructure = effect.value;
        options.pricingStructure = effect.value; // Update in both places
        console.log(`Set pricing structure to: ${effect.value}`);
        break;
    }
  });
}
