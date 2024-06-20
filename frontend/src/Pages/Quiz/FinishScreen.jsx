import { Button } from 'flowbite-react';
import React, { useState } from 'react'

export const FinishScreen = ({ score, quizQuestions, userQuizResponse }) => {

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(1);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  console.log("questions", quizQuestions);
  score=1;
  console.log("score",score);


  const size = quizQuestions.length;


  const correctOptionClass = `bg-green-500`;
  const wrongOptionClass = `bg-red-500`;

  const handlePreviousClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    else return;
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < size - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    else return;
  };

  return (
    <div className='min-h-screen flex flex-col gap-4  bg-gray-200 dark:bg-gray-800 '>
      <>
      <div className='flex justify-center py-2 font-semibold'>Your score: {score}/{size}</div>
        <div className='  grid grid-cols-1 sm:grid-cols-2  border-t border-b border-gray-400 dark:border-gray-500  '>

          {/* <h1>Quiz</h1> */} 
          <div className='flex flex-col   gap-3   p-3 bg-gray-300 dark:bg-gray-900'>
            <h1>Question {currentQuestionIndex + 1}</h1>
            <h2>{quizQuestions[currentQuestionIndex].description}</h2>
          </div>
          <div className='flex flex-col  gap-3   p-3 bg-gray-200 dark:bg-gray-800'>
            <h2>Answer:</h2>
            <div className='flex flex-col items-start gap-3'>
              {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                <div
                  // className='w-full'>
                  className={`w-full  ${(index === selectedOptionIndex && selectedOptionIndex === correctOptionIndex) ? correctOptionClass : ''}
                  ${(index === selectedOptionIndex && selectedOptionIndex !== correctOptionIndex) ? wrongOptionClass : ''}
                  ${index === correctOptionIndex ? correctOptionClass : ''} `}>
                  <div key={index} className='flex gap-2  border border-gray-500 dark:border-gray-100 rounded-md'>
                    <input className='m-2'
                      type="radio"
                      name="option"
                      checked={selectedOptionIndex === index}
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
          <button className=' px-2 py-1 hover:underline underline-offset-1'
            onClick={handlePreviousClick}  >Previous</button>
          <button className=' px-2 py-1 hover:underline underline-offset-1'
            onClick={handleNextClick}  >Next</button>
        </div>

        <div className=''>
          <QuestionsSequence size={size} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} />
        </div>


      </>
      {/* <ToastContainer /> */}
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
          className={`px-3 py-1 rounded-md text-center border border-gray-400 dark:border-gray-400 ${index === currentQuestionIndex ? 'bg-blue-500' : ''} `}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};
