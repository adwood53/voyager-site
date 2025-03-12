// src/app/components/dashboard/calculators/QuestionRenderer.js
import YesNoQuestion from './questions/YesNoQuestion';
import SingleSelectQuestion from './questions/SingleSelectQuestion';
import NumericQuestion from './questions/NumericQuestion';
import TextQuestion from './questions/TextQuestion';

export default function QuestionRenderer({
  question,
  value,
  onChange,
  errors,
}) {
  switch (question.type) {
    case 'yes-no':
      return (
        <YesNoQuestion
          question={question}
          value={value}
          onChange={onChange}
          errors={errors}
        />
      );

    case 'single-select':
      return (
        <SingleSelectQuestion
          question={question}
          value={value}
          onChange={onChange}
          errors={errors}
        />
      );

    case 'numeric':
      return (
        <NumericQuestion
          question={question}
          value={value}
          onChange={onChange}
          errors={errors}
        />
      );

    case 'text':
      return (
        <TextQuestion
          question={question}
          value={value}
          onChange={onChange}
          errors={errors}
        />
      );

    default:
      return (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-md">
          Unknown question type: {question.type}
        </div>
      );
  }
}
