// src/utils/calculatorEngine.js

/**
 * Calculator Engine
 *
 * This utility provides functions for processing calculator schemas,
 * managing calculator state, and performing calculations.
 *
 * It's designed to work with any calculator schema that follows our format.
 */

/**
 * Process answers against a schema to calculate results
 *
 * @param {Object} schema - The calculator schema containing calculation rules
 * @param {Object} answers - User's answers to calculator questions
 * @param {Object} options - Additional options for calculation
 * @returns {Object} Calculation results including features, price, etc.
 */
export function calculateResults(schema, answers, options = {}) {
  // Default result structure
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
      type: schema.type || 'Unknown',
      totalFeatures: 0,
      requiresCommissionedWork: false,
    },
    recommendations: [],
  };

  try {
    // Process schema rules
    if (schema.calculations) {
      // Calculate base price (maybe from tier selection)
      if (schema.calculations.basePrice) {
        const basePriceCalc = executeCalculation(
          schema.calculations.basePrice,
          answers,
          options
        );
        results.pricing.basePrice = basePriceCalc;
      }

      // Calculate tier if defined
      if (schema.calculations.tier) {
        const tierCalc = executeCalculation(
          schema.calculations.tier,
          answers,
          options
        );
        results.summary.tier = tierCalc;
      }

      // Process features
      if (schema.calculations.features) {
        results.features = processFeatures(
          schema.calculations.features,
          answers,
          options
        );
      }

      // Process commission items
      if (schema.calculations.commissionItems) {
        results.commissionItems = processCommissionItems(
          schema.calculations.commissionItems,
          answers,
          options
        );
      }

      // Process additional costs
      if (schema.calculations.additionalCosts) {
        results.pricing.additionalCosts = processAdditionalCosts(
          schema.calculations.additionalCosts,
          answers,
          options
        );
      }

      // Process recommendations if available
      if (schema.calculations.recommendations) {
        results.recommendations = processRecommendations(
          schema.calculations.recommendations,
          answers,
          schema.recommendations || [],
          options
        );
      }
    }

    // Update summary information
    results.summary.totalFeatures = results.features.length;
    results.summary.requiresCommissionedWork =
      results.commissionItems.length > 0;

    // Calculate total price
    const additionalCostsTotal = Object.values(
      results.pricing.additionalCosts
    ).reduce((sum, cost) => sum + cost, 0);
    results.pricing.totalPrice =
      results.pricing.basePrice + additionalCostsTotal;

    return results;
  } catch (error) {
    console.error('Error in calculateResults:', error);
    return {
      ...results,
      error: error.message,
    };
  }
}

/**
 * Execute a calculation function or static value
 *
 * @param {Function|any} calculation - Function or static value
 * @param {Object} answers - User's answers
 * @param {Object} options - Additional options
 * @returns {any} Calculation result
 */
function executeCalculation(calculation, answers, options) {
  if (typeof calculation === 'function') {
    return calculation(answers, options);
  }
  return calculation;
}

/**
 * Process features based on answers
 *
 * @param {Array|Function} featureRules - Rules to determine features
 * @param {Object} answers - User's answers
 * @param {Object} options - Additional options
 * @returns {Array} List of features
 */
function processFeatures(featureRules, answers, options) {
  if (typeof featureRules === 'function') {
    return featureRules(answers, options);
  }

  const features = [];

  for (const rule of featureRules) {
    try {
      if (typeof rule === 'function') {
        const result = rule(answers, options);
        if (Array.isArray(result)) {
          features.push(...result);
        } else if (result) {
          features.push(result);
        }
      } else if (rule.condition) {
        // Rule with explicit condition
        const condition =
          typeof rule.condition === 'function'
            ? rule.condition(answers, options)
            : evaluateCondition(rule.condition, answers);

        if (condition) {
          const feature = rule.value;
          if (typeof feature === 'function') {
            const result = feature(answers, options);
            features.push(result);
          } else {
            features.push(feature);
          }
        }
      }
    } catch (error) {
      console.error('Error processing feature rule:', error);
    }
  }

  return features;
}

/**
 * Process commission items based on answers
 *
 * @param {Array|Function} commissionRules - Rules to determine commission items
 * @param {Object} answers - User's answers
 * @param {Object} options - Additional options
 * @returns {Array} List of commission items
 */
function processCommissionItems(commissionRules, answers, options) {
  if (typeof commissionRules === 'function') {
    return commissionRules(answers, options);
  }

  const commissionItems = [];

  for (const rule of commissionRules) {
    try {
      if (typeof rule === 'function') {
        const result = rule(answers, options);
        if (Array.isArray(result)) {
          commissionItems.push(...result);
        } else if (result) {
          commissionItems.push(result);
        }
      } else if (rule.condition) {
        // Rule with explicit condition
        const condition =
          typeof rule.condition === 'function'
            ? rule.condition(answers, options)
            : evaluateCondition(rule.condition, answers);

        if (condition) {
          const item = rule.value;
          if (typeof item === 'function') {
            const result = item(answers, options);
            commissionItems.push(result);
          } else {
            commissionItems.push(item);
          }
        }
      }
    } catch (error) {
      console.error('Error processing commission rule:', error);
    }
  }

  return commissionItems;
}

/**
 * Process additional costs based on answers
 *
 * @param {Object|Function} costRules - Rules to determine additional costs
 * @param {Object} answers - User's answers
 * @param {Object} options - Additional options
 * @returns {Object} Map of additional costs
 */
function processAdditionalCosts(costRules, answers, options) {
  if (typeof costRules === 'function') {
    return costRules(answers, options);
  }

  const additionalCosts = {};

  for (const [costName, rule] of Object.entries(costRules)) {
    try {
      if (typeof rule === 'function') {
        additionalCosts[costName] = rule(answers, options);
      } else if (rule.condition && rule.value) {
        const condition =
          typeof rule.condition === 'function'
            ? rule.condition(answers, options)
            : evaluateCondition(rule.condition, answers);

        if (condition) {
          const cost =
            typeof rule.value === 'function'
              ? rule.value(answers, options)
              : rule.value;

          additionalCosts[costName] = cost;
        }
      } else {
        additionalCosts[costName] = rule;
      }
    } catch (error) {
      console.error(
        `Error processing cost rule for ${costName}:`,
        error
      );
    }
  }

  return additionalCosts;
}

/**
 * Process recommendations based on answers
 *
 * @param {Array|Function} recommendationRules - Rules to determine recommendations
 * @param {Object} answers - User's answers
 * @param {Array} availableRecommendations - List of available recommendations
 * @param {Object} options - Additional options
 * @returns {Array} List of recommendations
 */
function processRecommendations(
  recommendationRules,
  answers,
  availableRecommendations,
  options
) {
  if (typeof recommendationRules === 'function') {
    return recommendationRules(
      answers,
      availableRecommendations,
      options
    );
  }

  const recommendations = [];

  for (const rule of recommendationRules) {
    try {
      if (typeof rule === 'function') {
        const result = rule(
          answers,
          availableRecommendations,
          options
        );
        if (Array.isArray(result)) {
          recommendations.push(...result);
        } else if (result) {
          recommendations.push(result);
        }
      } else if (rule.condition) {
        // Rule with explicit condition
        const condition =
          typeof rule.condition === 'function'
            ? rule.condition(answers, options)
            : evaluateCondition(rule.condition, answers);

        if (condition) {
          if (typeof rule.recommendationId === 'string') {
            const recommendation = availableRecommendations.find(
              (r) => r.id === rule.recommendationId
            );
            if (recommendation) {
              recommendations.push(recommendation);
            }
          } else if (typeof rule.value === 'function') {
            const result = rule.value(
              answers,
              availableRecommendations,
              options
            );
            if (result) recommendations.push(result);
          }
        }
      }
    } catch (error) {
      console.error('Error processing recommendation rule:', error);
    }
  }

  return recommendations;
}

/**
 * Evaluate a condition against answers
 *
 * @param {Object} condition - Condition object with path, operator, and value
 * @param {Object} answers - User's answers
 * @returns {boolean} Whether condition is met
 */
function evaluateCondition(condition, answers) {
  // Simple path-based condition
  if (condition.path && condition.operator) {
    const value = getValueByPath(answers, condition.path);

    switch (condition.operator) {
      case '==':
        return value === condition.value;
      case '!=':
        return value !== condition.value;
      case '>':
        return value > condition.value;
      case '>=':
        return value >= condition.value;
      case '<':
        return value < condition.value;
      case '<=':
        return value <= condition.value;
      case 'includes':
        return (
          Array.isArray(value) && value.includes(condition.value)
        );
      case 'notIncludes':
        return (
          !Array.isArray(value) || !value.includes(condition.value)
        );
      case 'isEmpty':
        return (
          value === undefined ||
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0)
        );
      case 'isNotEmpty':
        return (
          value !== undefined &&
          value !== null &&
          value !== '' &&
          (!Array.isArray(value) || value.length > 0)
        );
      default:
        return false;
    }
  }

  // Complex conditions with AND/OR
  if (condition.AND) {
    return condition.AND.every((subCond) =>
      evaluateCondition(subCond, answers)
    );
  }

  if (condition.OR) {
    return condition.OR.some((subCond) =>
      evaluateCondition(subCond, answers)
    );
  }

  // Default (should not reach here if condition is well-formed)
  return false;
}

/**
 * Get a value from an object by dot-notation path
 *
 * @param {Object} obj - Object to get value from
 * @param {string} path - Dot-notation path to value
 * @returns {any} Value at path
 */
function getValueByPath(obj, path) {
  return path.split('.').reduce((curr, key) => {
    return curr && curr[key] !== undefined ? curr[key] : undefined;
  }, obj);
}

/**
 * Validate if the answers meet all required fields
 *
 * @param {Object} schema - Calculator schema
 * @param {Object} answers - User's answers
 * @returns {Object} Validation result {valid, errors}
 */
export function validateAnswers(schema, answers) {
  const errors = [];

  if (!schema.questions) {
    return { valid: true, errors };
  }

  // Check each question
  for (const question of schema.questions) {
    // Skip non-required questions
    if (!question.required) continue;

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

    // Check conditional requirements
    if (question.conditionalRequired) {
      const isRequired = evaluateCondition(
        question.conditionalRequired,
        answers
      );
      if (
        isRequired &&
        (value === undefined || value === null || value === '')
      ) {
        errors.push({
          questionId: question.id,
          message: `${question.label || question.id} is required based on your other answers`,
        });
      }
    }

    // Check validators
    if (
      question.validators &&
      value !== undefined &&
      value !== null
    ) {
      for (const validator of question.validators) {
        if (typeof validator === 'function') {
          const result = validator(value, answers);
          if (result !== true && typeof result === 'string') {
            errors.push({
              questionId: question.id,
              message: result,
            });
          }
        } else if (
          validator.condition &&
          typeof validator.message === 'string'
        ) {
          const isInvalid = evaluateCondition(validator.condition, {
            ...answers,
            [question.id]: value,
          });

          if (isInvalid) {
            errors.push({
              questionId: question.id,
              message: validator.message,
            });
          }
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Initialize answers with default values from schema
 *
 * @param {Object} schema - Calculator schema
 * @returns {Object} Initial answers object
 */
export function initializeAnswers(schema) {
  const answers = {};

  if (!schema.questions) {
    return answers;
  }

  for (const question of schema.questions) {
    if (question.defaultValue !== undefined) {
      answers[question.id] = question.defaultValue;
    }
  }

  return answers;
}
