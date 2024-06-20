import React, { useEffect, useState } from 'react';
import { Button } from 'flowbite-react';
import { Loader } from '../Loader';
import { useSelector } from 'react-redux';

export const FinishScreen = ({ score, quizQuestions, userQuizResponse }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(null);

  const questionSize = quizQuestions.length;

  const correctOptionClass = `bg-green-500`;
  const wrongOptionClass = `bg-red-500`;

  useEffect(() => {
    if (quizQuestions.length && userQuizResponse.length) {
      setSelectedOptionIndex(userQuizResponse[currentQuestionIndex]);
      setCorrectOptionIndex(quizQuestions[currentQuestionIndex].correctOption);
    }
  }, [currentQuestionIndex, quizQuestions, userQuizResponse]);

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < questionSize - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  if (!quizQuestions.length || !userQuizResponse.length) return <Loader />;

  return (
    <div className='min-h-screen flex flex-col gap-4 bg-gray-200 dark:bg-gray-800'>
      <>
        <div className='flex flex-col items-center py-2 font-semibold'>
          <h1>You have already attempted this quiz</h1>
          <h1> Your score: {score}/{questionSize * 10}</h1>

        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 border-t border-b border-gray-400 dark:border-gray-500'>
          <div className='flex flex-col gap-3 p-3 bg-gray-300 dark:bg-gray-900'>
            <h1>Question {currentQuestionIndex + 1}</h1>
            <h2>{quizQuestions[currentQuestionIndex].description}</h2>
          </div>
          <div className='flex flex-col gap-3 p-3 bg-gray-200 dark:bg-gray-800'>
            <h2>Answer:</h2>
            <div className='flex flex-col items-start gap-3'>
              {quizQuestions[currentQuestionIndex]?.options.map((option, index) => (
                <div
                  key={index}
                  className={`w-full 
                   ${(index + 1 === selectedOptionIndex && selectedOptionIndex === correctOptionIndex) ? correctOptionClass : ''}
                   ${(index + 1 === selectedOptionIndex && selectedOptionIndex !== correctOptionIndex) ? wrongOptionClass : ''}
                   ${index + 1 === correctOptionIndex ? correctOptionClass : ''}`
                  }>
                  <div className='flex gap-2 border border-gray-500 dark:border-gray-100 rounded-md'>
                    <input
                      className='m-2'
                      type="radio"
                      name="option"
                      checked={index + 1 === selectedOptionIndex}
                      readOnly
                    />
                    <div className='p-2'>
                      {option}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-center p-3 gap-5'>
          <button className='px-2 py-1 hover:underline underline-offset-1' onClick={handlePreviousClick}>
            Previous
          </button>
          <button className='px-2 py-1 hover:underline underline-offset-1' onClick={handleNextClick}>
            Next
          </button>
        </div>
        <div>
          <QuestionsSequence size={questionSize} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} />
        </div>
      </>
    </div>
  );
};

const QuestionsSequence = ({ size, currentQuestionIndex, setCurrentQuestionIndex }) => {
  return (
    <div className='max-h-40 overflow-y-scroll p-4 flex flex-wrap gap-3'>
      {Array.from({ length: size }, (_, i) => i).map((index) => (
        <button
          key={index}
          onClick={() => setCurrentQuestionIndex(index)}
          className={`px-3 py-1 rounded-md text-center border border-gray-400 dark:border-gray-400 ${index === currentQuestionIndex ? 'bg-blue-500' : ''}`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
