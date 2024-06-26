import React from 'react';

export const QuizInstructions = () => {
    return (
        <div className='bg-gray-200 dark:bg-gray-800  w-full md:w-3/4 py-5 px-5 mb-3  rounded-md
            flex flex-col gap-5 '>
            <h2 className="text-2xl font-bold mb-4 ">Quiz Instructions</h2>
            <ol className="list-decimal list-inside space-y-4 text-gray-800 dark:text-gray-200">
                <li>
                    <strong>Multiple Choice Questions:</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>Each question will have several options.</li>
                        <li>Only one option is correct.</li>
                    </ul>
                </li>
                <li>
                    <strong>Single Correct Option:</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>Select the option you believe is the correct answer.</li>
                        <li>You can only choose one option per question.</li>
                    </ul>
                </li>
                <li>
                    <strong>Timed Questions:</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>You have <span className="font-bold">30 seconds</span> to answer each question.</li>
                        <li>If you do not answer within the time limit, the question will automatically be skipped.</li>
                        <li>You cannot attempt any other question until the 30 seconds for the current question have elapsed.</li>
                    </ul>
                </li>
                <li>
                    <strong>Scoring:</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>Correct answers: <span className="font-bold">+10 points</span></li>
                        <li>Incorrect answers: <span className="font-bold">-2 points</span></li>
                    </ul>
                </li>
                <li>
                    <strong>Submission:</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>Make sure to submit your quiz before exiting the application.</li>
                        <li>Unsubmitted quizzes will not be graded.</li>
                    </ul>
                </li>
                <li>
                    <strong>Quiz Flow:</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>Read each question carefully and choose your answer within 30 seconds.</li>
                        <li>Use the timer as a guide to manage your time effectively.</li>
                        <li>Once you answer or the time runs out, you will move to the next question.</li>
                    </ul>
                </li>
                <li>
                    <strong>Final Submission:</strong>
                    <ul className="list-disc list-inside ml-4">
                        <li>After answering all questions, click the <span className="font-bold">Submit</span> button to finalize your quiz.</li>
                        <li>Ensure all answers are selected as you want before submitting.</li>
                    </ul>
                </li>
            </ol>
        </div>
    );
};
