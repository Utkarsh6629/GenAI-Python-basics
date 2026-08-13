import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

export const QuizCard = ({ quiz, index, lessonId, selectedOption, onSelectOption }) => {
  const isAnswered = selectedOption !== null && selectedOption !== undefined;

  return (
    <div className="quiz-card">
      <div className="quiz-question">
        <span style={{ color: '#3b82f6', marginRight: '8px' }}>Q{index + 1}.</span>
        {quiz.question}
      </div>

      <div className="quiz-options">
        {quiz.options.map((option, idx) => {
          let stateClass = '';
          if (isAnswered) {
            if (idx === quiz.answer) stateClass = 'correct';
            else if (idx === selectedOption) stateClass = 'wrong';
          }

          return (
            <button
              key={idx}
              className={`quiz-option-btn ${stateClass}`}
              onClick={() => {
                if (!isAnswered && onSelectOption) {
                  onSelectOption(quiz.id || `q${index}`, idx, idx === quiz.answer);
                }
              }}
            >
              <span>{option}</span>
              {isAnswered && idx === quiz.answer && (
                <CheckCircle2 size={18} color="#34d399" />
              )}
              {isAnswered && idx === selectedOption && idx !== quiz.answer && (
                <XCircle size={18} color="#fca5a5" />
              )}
            </button>
          );
        })}
      </div>

      {isAnswered && (
        <div className="quiz-explanation">
          <strong>Explanation: </strong> {quiz.explanation}
        </div>
      )}
    </div>
  );
};
