// src/app/components/dashboard/calculator/index.js
// Export all calculator components for easy imports

import './calculator.css';

export { default as CalculatorContainer } from './CalculatorContainer';
export { default as QuestionRenderer } from './QuestionRenderer';
export { default as ResultsSummary } from './ResultsSummary';
export { default as DealForm } from './DealForm';

// Export question components
export { default as TextQuestion } from './questions/TextQuestion';
export { default as NumericQuestion } from './questions/NumericQuestion';
export { default as SingleSelectQuestion } from './questions/SingleSelectQuestion';
export { default as YesNoQuestion } from './questions/YesNoQuestion';
export { default as MultiSelectQuestion } from './questions/MultiSelectQuestion';
