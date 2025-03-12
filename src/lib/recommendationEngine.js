// src/utils/recommendationEngine.js

/**
 * Recommendation Engine
 *
 * This utility provides functions for generating recommendations
 * based on calculator answers and predefined recommendation templates.
 */

/**
 * Generate recommendations based on calculator answers
 *
 * @param {Object} answers - User's answers to calculator questions
 * @param {Array} availableRecommendations - List of available recommendation templates
 * @param {Object} options - Additional options
 * @returns {Array} List of recommendations
 */
export function generateRecommendations(
  answers,
  availableRecommendations,
  options = {}
) {
  const recommendations = [];

  // If no recommendations available, return empty array
  if (
    !availableRecommendations ||
    !Array.isArray(availableRecommendations)
  ) {
    return recommendations;
  }

  try {
    // Filter recommendations based on conditions
    for (const recommendation of availableRecommendations) {
      if (
        shouldShowRecommendation(recommendation, answers, options)
      ) {
        recommendations.push(
          processRecommendation(recommendation, answers, options)
        );
      }
    }

    // Sort recommendations by priority if specified
    if (options.sortByPriority) {
      recommendations.sort(
        (a, b) => (b.priority || 0) - (a.priority || 0)
      );
    }

    // Limit to max recommendations if specified
    if (
      options.maxRecommendations &&
      typeof options.maxRecommendations === 'number'
    ) {
      return recommendations.slice(0, options.maxRecommendations);
    }

    return recommendations;
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return [];
  }
}

/**
 * Determine if a recommendation should be shown based on conditions
 *
 * @param {Object} recommendation - Recommendation template
 * @param {Object} answers - User's answers
 * @param {Object} options - Additional options
 * @returns {boolean} Whether to show the recommendation
 */
function shouldShowRecommendation(recommendation, answers, options) {
  // Always show if no conditions
  if (!recommendation.conditions) {
    return true;
  }

  // Function-based condition
  if (typeof recommendation.conditions === 'function') {
    return recommendation.conditions(answers, options);
  }

  // Array of conditions (AND)
  if (Array.isArray(recommendation.conditions)) {
    return recommendation.conditions.every((condition) => {
      return evaluateCondition(condition, answers, options);
    });
  }

  // Single condition object
  return evaluateCondition(
    recommendation.conditions,
    answers,
    options
  );
}

/**
 * Evaluate a single condition against answers
 *
 * @param {Object|Function} condition - Condition to evaluate
 * @param {Object} answers - User's answers
 * @param {Object} options - Additional options
 * @returns {boolean} Whether condition is met
 */
function evaluateCondition(condition, answers, options) {
  // Function-based condition
  if (typeof condition === 'function') {
    return condition(answers, options);
  }

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
      evaluateCondition(subCond, answers, options)
    );
  }

  if (condition.OR) {
    return condition.OR.some((subCond) =>
      evaluateCondition(subCond, answers, options)
    );
  }

  // Default (should not reach here if condition is well-formed)
  return false;
}

/**
 * Process a recommendation template with user's answers
 *
 * @param {Object} recommendation - Recommendation template
 * @param {Object} answers - User's answers
 * @param {Object} options - Additional options
 * @returns {Object} Processed recommendation
 */
function processRecommendation(recommendation, answers, options) {
  const processedRecommendation = { ...recommendation };

  // Replace template values in title
  if (
    recommendation.title &&
    typeof recommendation.title === 'string'
  ) {
    processedRecommendation.title = replaceTemplateValues(
      recommendation.title,
      answers
    );
  }

  // Replace template values in description
  if (
    recommendation.description &&
    typeof recommendation.description === 'string'
  ) {
    processedRecommendation.description = replaceTemplateValues(
      recommendation.description,
      answers
    );
  }

  // Replace template values in any other string properties
  for (const [key, value] of Object.entries(recommendation)) {
    if (
      typeof value === 'string' &&
      key !== 'title' &&
      key !== 'description'
    ) {
      processedRecommendation[key] = replaceTemplateValues(
        value,
        answers
      );
    }
  }

  return processedRecommendation;
}

/**
 * Replace template values in a string with actual values from answers
 *
 * @param {string} text - Text with template placeholders
 * @param {Object} answers - User's answers
 * @returns {string} Text with placeholders replaced
 */
function replaceTemplateValues(text, answers) {
  return text.replace(/\{\{([^}]+)\}\}/g, (match, path) => {
    const value = getValueByPath(answers, path.trim());
    return value !== undefined ? value : match;
  });
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
 * Group recommendations by category
 *
 * @param {Array} recommendations - List of recommendations
 * @returns {Object} Recommendations grouped by category
 */
export function groupRecommendationsByCategory(recommendations) {
  const grouped = {};

  for (const recommendation of recommendations) {
    const category = recommendation.category || 'default';

    if (!grouped[category]) {
      grouped[category] = [];
    }

    grouped[category].push(recommendation);
  }

  return grouped;
}
