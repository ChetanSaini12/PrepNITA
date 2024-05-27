import React, { useState } from 'react';
import TimerComponent from './TimerComponent';
import toast from 'react-hot-toast';
import { Button} from 'flowbite-react';

// Dummy data for questions
const quizQuestions = [
    {
        description: "What is the capital of France?",
        options: ["Berlin", "Madridsjdlk djdjjjjjjjjjjjj c+jajindnfl jdfjdkljkl  jdkjl   c=== disnks isi dsfdskmdkmsfisdkkms i      fidkn (inti i=jjJ++)jdk jdksjkdjdjkdj    djdjkjskjf    djkdjfkdj   ", "Paris", "Rome"],
        correctOptionIndex: 2,
    },
    {
        description: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctOptionIndex: 1,
    },
    {
        description: "What is the color of the sky?",
        options: ["Blue", "Green", "Red", "Yellow"],
        correctOptionIndex: 0,
    },
];

const ParticipateQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleOptionClick = (index) => {
        setSelectedOptionIndex(index);
    };

    const handleNextQuestion = () => {
        if (selectedOptionIndex === null) {
            toast.error("Please select an option");
            return;
        }

        if (selectedOptionIndex === quizQuestions[currentQuestionIndex].correctOptionIndex) {
            setScore(score + 1);
        }

        setSelectedOptionIndex(null);

        if (currentQuestionIndex + 1 < quizQuestions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleTimeUp = () => {
        setQuizCompleted(true);
    };

    return (
        <div className='min-h-screen flex flex-col gap-4  bg-gray-200 dark:bg-gray-800 '>
            <div className='px-5 py-3 flex justify-end'>
                <TimerComponent initialTime={30} onTimeUp={handleTimeUp} />
            </div>
            {!quizCompleted ? (
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
                                <button onClick={() => handleOptionClick(index)}
                                    // className='w-full'>
                                    className={`w-full  ${selectedOptionIndex === index ? 'bg-gray-300' : ''} dark:${selectedOptionIndex === index ? 'bg-gray-900' : ''}`}>
                                    <div key={index} className='flex gap-2  border border-gray-500 dark:border-gray-100 rounded-md'>
                                        <input className='m-2'
                                            type="radio"
                                            name="option"
                                            checked={selectedOptionIndex === index}
                                            onChange={() => handleOptionClick(index)}
                                        />
                                        <div className='p-2'>
                                            {option}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                    </div>



                </div>
            ) : (
                <div>
                    <h1>Quiz Completed</h1>
                    <p>Your score: {score} / {quizQuestions.length}</p>
                </div>
            )}
            <div className='p-3'>
                here will be question sequence
            </div>
            <div className='flex flex-wrap justify-between p-3'>
                <Button color='red' size={"xs"} className='h-6 sm:h-10  px-0 sm:px-3 '>Finish</Button>
                <div className='flex gap-3 sm:gap-5'>
                    <button > {"< Previous"}</button>
                    <button onClick={handleNextQuestion} >{"Next >"}</button>
                </div>
                <Button onClick={handleNextQuestion} color='green' size={"xs"} className='h-6 sm:h-10 px-0 sm:px-3' >Submit</Button>
            </div>


            {/* <ToastContainer /> */}
        </div>
    );
};

export default ParticipateQuiz;
