// src/lib/calculatorEngine.js - Complete file
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

/**
 * Check if a section should be shown based on dependencies
 *
 * @param {Object} section - Section to check
 * @param {Object} answers - User's answers
 * @returns {boolean} - Whether section should be shown
 */
function shouldShowSection(section, answers) {
  if (!section.dependsOn) return true;

  const { questionId, value } = section.dependsOn;

  // Check for array values in multi-select questions
  if (Array.isArray(answers[questionId])) {
    return answers[questionId].includes(value);
  }

  return answers[questionId] === value;
}

/**
 * Calculate results based on answers and schema
 *
 * @param {Object} schema - Calculator schema
 * @param {Object} answers - User's answers
 * @param {Object} options - Additional options
 * @returns {Object} - Calculation results
 */
export function calculateResults(schema, answers, options = {}) {
  // Initialize results object with default values
  const results = {
    features: [],
    commissionItems: [],
    pricing: {
      basePrice: 0,
      additionalCosts: {},
      totalPrice: 0,
    },
    summary: {
      tier: 1,
      type: schema.id || 'generic',
      projectDetails: '',
      pricingStructure: answers.pricingType || 'partner', // Default to partner pricing
    },
    recommendations: [],
  };

  // Add the pricingStructure to options for effect conditions
  options.pricingStructure = answers.pricingType;

  // DEBUG: Log the initial state
  console.log('Calculator initial state:', {
    pricingType: answers.pricingType,
    options: options,
  });

  // Process single-select questions directly
  if (answers.pricingType) {
    console.log(
      'Pricing type found in answers:',
      answers.pricingType
    );
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
            console.log(
              'Updated pricing structure from question:',
              value
            );
          }

          // Skip if no value or no effects
          if (
            value === undefined ||
            value === null ||
            !question.effects
          ) {
            return;
          }

          // Process effects
          question.effects.forEach((effect) => {
            // Log effect for debugging
            if (
              effect.condition &&
              effect.condition.pricingStructure
            ) {
              console.log(
                'Processing effect with pricing condition:',
                {
                  effect,
                  currentPricingStructure: options.pricingStructure,
                  matches:
                    effect.condition.pricingStructure ===
                    options.pricingStructure,
                }
              );
            }

            // Skip if effect has a condition that isn't met
            if (effect.condition) {
              // Simple conditions
              if (
                effect.condition.answer !== undefined &&
                effect.condition.answer !== value
              ) {
                return;
              }

              // Pricing structure condition - with extra logging
              if (
                effect.condition.pricingStructure !== undefined &&
                effect.condition.pricingStructure !==
                  options.pricingStructure
              ) {
                console.log(
                  'Skipping effect due to pricing structure mismatch:',
                  {
                    effectCondition:
                      effect.condition.pricingStructure,
                    currentStructure: options.pricingStructure,
                  }
                );
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
                results.commissionItems.push(effect.value);
                break;

              case 'set-base-price':
                results.pricing.basePrice = effect.value;
                break;

              case 'add-price':
                // If multiplying by quantity
                if (
                  effect.multiplier &&
                  effect.multiplier in answers
                ) {
                  const quantity = Number(answers[effect.multiplier]);
                  if (!isNaN(quantity)) {
                    const name =
                      effect.name || `${question.label} Cost`;
                    results.pricing.additionalCosts[name] =
                      effect.value * quantity;
                    console.log(
                      `Added price with multiplier: ${name} = ${effect.value} * ${quantity}`
                    );
                  }
                } else {
                  const name =
                    effect.name || `${question.label} Cost`;
                  results.pricing.additionalCosts[name] =
                    effect.value;
                  console.log(
                    `Added price: ${name} = ${effect.value}`
                  );
                }
                break;

              case 'set-tier':
                results.summary.tier = effect.value;
                break;

              case 'set-project-details':
                results.summary.projectDetails =
                  answers[effect.value] || '';
                break;

              case 'set-pricing-structure':
                results.summary.pricingStructure = effect.value;
                break;
            }
          });

          // For single-select questions, also add effects from the selected option
          if (
            (question.type === 'single-select' ||
              question.type === 'radio') &&
            question.options
          ) {
            const selectedOption = question.options.find(
              (opt) => opt.id === value
            );
            if (selectedOption && selectedOption.effects) {
              // Process option effects
              selectedOption.effects.forEach((effect) => {
                // Check conditions
                if (effect.condition) {
                  // Pricing structure condition
                  if (
                    effect.condition.pricingStructure !== undefined &&
                    effect.condition.pricingStructure !==
                      options.pricingStructure
                  ) {
                    return;
                  }

                  // Simple conditions
                  if (
                    effect.condition.answer !== undefined &&
                    effect.condition.answer !== true
                  ) {
                    return;
                  }
                }

                switch (effect.type) {
                  case 'add-feature':
                    if (Array.isArray(effect.value)) {
                      results.features.push(...effect.value);
                    } else {
                      results.features.push(effect.value);
                    }
                    break;

                  case 'add-commission':
                    results.commissionItems.push(effect.value);
                    break;

                  case 'set-base-price':
                    results.pricing.basePrice = effect.value;
                    break;

                  case 'add-price':
                    const name =
                      effect.name || `${selectedOption.label} Cost`;
                    results.pricing.additionalCosts[name] =
                      effect.value;
                    console.log(
                      `Added price from option: ${name} = ${effect.value}`
                    );
                    break;

                  case 'set-tier':
                    results.summary.tier = effect.value;
                    break;

                  case 'set-pricing-structure':
                    results.summary.pricingStructure = effect.value;
                    break;
                }
              });
            }
          }

          // For multi-select questions, add effects from all selected options
          if (
            (question.type === 'multi-select' ||
              question.type === 'checkbox') &&
            question.options &&
            Array.isArray(value)
          ) {
            value.forEach((optionId) => {
              const selectedOption = question.options.find(
                (opt) => opt.id === optionId
              );
              if (selectedOption && selectedOption.effects) {
                // Process option effects
                selectedOption.effects.forEach((effect) => {
                  // Check conditions
                  if (effect.condition) {
                    // Pricing structure condition
                    if (
                      effect.condition.pricingStructure !==
                        undefined &&
                      effect.condition.pricingStructure !==
                        options.pricingStructure
                    ) {
                      return;
                    }
                  }

                  switch (effect.type) {
                    case 'add-feature':
                      if (Array.isArray(effect.value)) {
                        results.features.push(...effect.value);
                      } else {
                        results.features.push(effect.value);
                      }
                      break;

                    case 'add-commission':
                      results.commissionItems.push(effect.value);
                      break;

                    case 'set-base-price':
                      results.pricing.basePrice = effect.value;
                      break;

                    case 'add-price':
                      const name =
                        effect.name || `${selectedOption.label} Cost`;
                      results.pricing.additionalCosts[name] =
                        effect.value;
                      console.log(
                        `Added price from multi-select option: ${name} = ${effect.value}`
                      );
                      break;
                  }
                });
              }
            });
          }
        });
      }
    });
  }

  // Process recommendations if schema has them
  if (schema.recommendations) {
    const { recommendations, logic, products } =
      schema.recommendations;

    // Simple logic to select recommendations
    if (logic === 'score-based' && Array.isArray(products)) {
      products.forEach((product) => {
        // Calculate score for this product
        let score = 0;

        if (Array.isArray(product.conditions)) {
          product.conditions.forEach((condition) => {
            const { questionId, value, weight = 1 } = condition;

            // For multi-select questions
            if (Array.isArray(answers[questionId])) {
              if (answers[questionId].includes(value)) {
                score += weight;
              }
            }
            // For single-select and other question types
            else if (answers[questionId] === value) {
              score += weight;
            }
          });
        }

        // If score meets minimum, add to recommendations
        if (score >= (product.minScore || 1)) {
          // Determine tier based on score
          let tier = 1;

          if (product.tierMapping) {
            const thresholds = Object.values(
              product.tierMapping
            ).sort((a, b) => b.score - a.score);

            for (const threshold of thresholds) {
              if (score >= threshold.score) {
                tier = threshold.tier;
                break;
              }
            }
          }

          results.recommendations.push({
            id: product.id,
            title: product.name,
            description: product.description,
            tier,
            score,
            features: product.features || [],
          });
        }
      });

      // Sort recommendations by score (highest first)
      results.recommendations.sort((a, b) => b.score - a.score);
    }
  }

  // Handle project details from answers if applicable
  if (answers.projectDescription) {
    results.summary.projectDetails = answers.projectDescription;
  } else if (answers.additionalRequirements) {
    results.summary.projectDetails +=
      ' ' + answers.additionalRequirements;
  } else if (answers.projectDetails) {
    results.summary.projectDetails = answers.projectDetails;
  }

  // Calculate total price
  const additionalCostsTotal = Object.values(
    results.pricing.additionalCosts
  ).reduce((sum, cost) => sum + cost, 0);

  results.pricing.totalPrice =
    results.pricing.basePrice + additionalCostsTotal;

  // Add commission information for partner pricing
  if (answers.pricingType === 'partner') {
    // Calculate total commission based on commission items
    const totalCommission = results.commissionItems.reduce(
      (sum, item) => {
        // Extract commission amount from item text if possible
        const match = item.match(/£(\d+(\.\d+)?)/);
        if (match && match[1]) {
          return sum + parseFloat(match[1]);
        }
        return sum;
      },
      0
    );

    results.pricing.commission = totalCommission;
    results.summary.commission = totalCommission;
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
      results.pricing.commission =
        results.pricing.totalPrice * pricingConfig.commissionRate;
    }
  }

  // Log final price calculation
  console.log('Final price calculation:', {
    basePrice: results.pricing.basePrice,
    additionalCosts: results.pricing.additionalCosts,
    additionalCostsTotal,
    totalPrice: results.pricing.totalPrice,
    pricingStructure: options.pricingStructure,
  });

  return results;
}
