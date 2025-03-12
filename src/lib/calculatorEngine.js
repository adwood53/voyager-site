// src/lib/calculatorEngine.js
/**
 * Calculator Engine
 *
 * Core logic for processing calculator schemas and generating results.
 */

/**
 * Process answers against a schema to generate results
 */
export function processResults(schema, answers) {
  const features = [];
  const commissionItems = [];
  let basePrice = 0;
  let additionalPrice = 0;

  // Process each section and its questions
  schema.sections.forEach((section) => {
    section.questions.forEach((question) => {
      const answer = answers[question.id];

      // Skip if no answer or dependencies not met
      if (
        answer === undefined ||
        answer === null ||
        !isDependencyMet(question, answers)
      ) {
        return;
      }

      // Find selected option for select-type questions
      const option = getSelectedOption(question, answer);

      // Process effects
      const effects = option?.effects || question.effects || [];
      effects.forEach((effect) => {
        // Apply effect if condition is met
        if (!isConditionMet(effect.condition, answer)) {
          return;
        }

        switch (effect.type) {
          case 'add-feature':
            features.push([
              question.label,
              effect.value || formatAnswer(answer),
            ]);
            break;
          case 'add-commission':
            commissionItems.push(
              effect.value ||
                `${question.label}: ${formatAnswer(answer)}`
            );
            break;
          case 'set-base-price':
            basePrice = effect.value;
            break;
          case 'add-price':
            additionalPrice += effect.value;
            break;
        }
      });
    });
  });

  // Create pricing and summary
  const pricing = {
    basePrice,
    additionalPrice,
    totalPrice: basePrice + additionalPrice,
  };

  const summary = {
    calculatorType: schema.id,
    title: schema.title,
    totalFeatures: features.length,
    requiresCommissionedWork: commissionItems.length > 0,
  };

  return {
    features,
    commissionItems,
    pricing,
    summary,
  };
}

/**
 * Check if a question's dependencies are met
 */
export function isDependencyMet(question, answers) {
  if (!question.dependsOn) {
    return true;
  }

  const dependency = question.dependsOn;
  const answer = answers[dependency.questionId];

  // If required question has no answer, dependency not met
  if (answer === undefined || answer === null) {
    return false;
  }

  if (Array.isArray(dependency.value)) {
    return dependency.value.includes(answer);
  } else if (dependency.value !== undefined) {
    return answer === dependency.value;
  } else if (dependency.exists !== undefined) {
    return (
      (answer !== undefined && answer !== null) === dependency.exists
    );
  }

  return true;
}

/**
 * Get selected option from a question based on the answer
 */
function getSelectedOption(question, answer) {
  if (!question.options || !Array.isArray(question.options)) {
    return null;
  }

  // For array answers (multi-select)
  if (Array.isArray(answer)) {
    return question.options.find((option) =>
      answer.includes(option.id)
    );
  }

  // For single value answers
  return question.options.find((option) => option.id === answer);
}

/**
 * Check if a condition is met by the given answer
 */
function isConditionMet(condition, answer) {
  if (!condition) {
    return true;
  }

  if (condition.answer !== undefined) {
    return answer === condition.answer;
  }

  if (
    condition.minValue !== undefined &&
    typeof answer === 'number'
  ) {
    return answer >= condition.minValue;
  }

  return true;
}

/**
 * Format an answer for display
 */
function formatAnswer(answer) {
  if (answer === true) return 'Yes';
  if (answer === false) return 'No';
  if (Array.isArray(answer)) return answer.join(', ');
  if (answer === null || answer === undefined) return 'N/A';
  return String(answer);
}

/**
 * Validate if a section is complete
 */
export function isSectionComplete(section, answers) {
  if (!section || !section.questions) return false;

  return section.questions.every((question) => {
    // Skip if dependencies not met
    if (!isDependencyMet(question, answers)) {
      return true;
    }

    // Check if question is required and has an answer
    if (question.required !== false) {
      const answer = answers[question.id];
      return answer !== undefined && answer !== null && answer !== '';
    }

    return true;
  });
}

/**
 * Validate if all required questions are answered
 */
export function validateAnswers(schema, answers) {
  if (!schema || !schema.sections) return false;

  return schema.sections.every((section) =>
    isSectionComplete(section, answers)
  );
}
