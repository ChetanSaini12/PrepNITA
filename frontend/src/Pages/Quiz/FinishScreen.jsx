import React from 'react'

export const FinishScreen = ({score,quizQuestions}) => {
  return (
    <div className='flex flex-col items-center gap-5 p-5'>
        <h1>Quiz Completed</h1>
        <p>Your score: {score} / {quizQuestions.length}</p>
    </div>
)
}
