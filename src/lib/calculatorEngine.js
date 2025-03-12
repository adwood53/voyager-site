// src/lib/calculatorEngine.js additions

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
  const questions = schema.sections
    ? schema.sections.flatMap((section) => section.questions || [])
    : schema.questions || [];

  // Check required questions
  questions.forEach((question) => {
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
 * Calculate results based on answers and schema
 *
 * @param {Object} schema - Calculator schema
 * @param {Object} answers - User's answers
 * @param {Object} options - Additional options
 * @returns {Object} - Calculation results
 */
export function calculateResults(schema, answers, options = {}) {
  // Initialize results object
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
    },
    recommendations: [],
  };

  // Process sections
  if (schema.sections) {
    schema.sections.forEach((section) => {
      if (section.questions) {
        // Process each question's effects
        section.questions.forEach((question) => {
          const value = answers[question.id];

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
            // Skip if effect has a condition that isn't met
            if (effect.condition) {
              // Simple conditions
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
                results.features.push(effect.value);
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
                  }
                } else {
                  const name =
                    effect.name || `${question.label} Cost`;
                  results.pricing.additionalCosts[name] =
                    effect.value;
                }
                break;

              case 'set-tier':
                results.summary.tier = effect.value;
                break;
            }
          });

          // For single-select questions, also add effects from the selected option
          if (question.type === 'single-select' && question.options) {
            const selectedOption = question.options.find(
              (opt) => opt.id === value
            );
            if (selectedOption && selectedOption.effects) {
              // Process option effects
              selectedOption.effects.forEach((effect) => {
                switch (effect.type) {
                  case 'add-feature':
                    results.features.push(effect.value);
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
                    break;
                }
              });
            }
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

            // If user's answer matches condition, add to score
            if (answers[questionId] === value) {
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
          });
        }
      });

      // Sort recommendations by score (highest first)
      results.recommendations.sort((a, b) => b.score - a.score);
    }
  }

  // Calculate total price
  const additionalCostsTotal = Object.values(
    results.pricing.additionalCosts
  ).reduce((sum, cost) => sum + cost, 0);

  results.pricing.totalPrice =
    results.pricing.basePrice + additionalCostsTotal;

  return results;
}
