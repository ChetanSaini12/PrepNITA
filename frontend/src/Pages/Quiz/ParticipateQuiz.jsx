import React, { useEffect, useState } from 'react';
import TimerComponent from './TimerComponent';
import toast from 'react-hot-toast';
import { Button } from 'flowbite-react';
import moment, { duration } from 'moment';
import { UserConfirmation } from '../../Components/UserConfirmation';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_TRAINING_QUIZ } from '../../gqlOperatons/User/queries';
import MyApolloProvider from '../../index';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import { GET_QUIZ_BY_ID, GET_QUIZ_BY_ID_with_Q, GET_QUIZ_BY_ID_without_Q } from '../../gqlOperatons/Quiz/mutations';
import { useNavigate, useParams } from 'react-router-dom';
import { FinishScreen } from './FinishScreen';

// Dummy data for questions
// const quizQuestions = [
//     {
//         description: "What is the capital of France?",
//         options: ["Berlin", "Madridsjdlk djdjjjjjjjjjjjj c+jajindnfl jdfjdkljkl  jdkjl   c=== disnks isi dsfdskmdkmsfisdkkms i      fidkn (inti i=jjJ++)jdk jdksjkdjdjkdj    djdjkjskjf    djkdjfkdj   ", "Paris", "Rome"],
//         correctOptionIndex: 2,
//     },
//     {
//         description: "What is 2 + 2?",
//         options: ["3", "4", "5", "6"],
//         correctOptionIndex: 1,
//     },
//     {
//         description: "What is the color of the sky?",
//         options: ["Blue", "Green", "Red", "Yellow"],
//         correctOptionIndex: 0,
//     },
// ];

const ParticipateQuiz = () => {

    const { isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [ERROR, setError] = useState(null);
    const [alreadyAttempted, setAlreadyAttempted] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState(null);

    const timePerQuestion = 20;
    const [time, setTime] = useState(timePerQuestion);

    const id = params.id;
    if (isNaN(id)) {
        navigate('/notFound');
    }
    const ID = parseInt(id);


    const [getQuiz] = useMutation(GET_QUIZ_BY_ID_with_Q, {
        onError: (error) => {
            console.log("Error from query 1", error);
            return setError(error);
        },
    });

    useEffect(() => {
        (
            async () => {
                dispatch(setLoading(true));
                try {
                    const { data, errors } = await getQuiz({
                        variables: {
                            QuizId: ID,
                        }
                    });
                    if (errors) {
                        console.log('error 2', errors);
                        dispatch(setLoading(false));
                        return setError(errors);
                    }
                    else if (data) {
                        console.log("quiz data", data);
                        const startTime = moment(data.getQuizById.startTime);
                        const endTime = moment(data.getQuizById.endTime);
                        const currentTime = moment();
                        if (currentTime < startTime) {
                            dispatch(setLoading(false));
                            navigate(`/quiz/id/${ID}`);
                        }
                        const { data: res, errors: err } = await MyApolloProvider.client.query({
                            query: GET_USER_TRAINING_QUIZ,
                            onerror: (error) => {
                                // console.log("Error from query", error);
                                dispatch(setLoading(false));
                                return setError(error);
                            }
                        });
                        if (err) {
                            console.log("Errors from query 3", err);
                            dispatch(setLoading(false));
                            return setError(err);
                        }
                        else if (res) {
                            console.log("Training user result ", res);
                            res.getMe.userTraining.quizesAttended.map((quiz) => {
                                if (parseInt(quiz.quizId) === ID) {
                                    setScore(quiz.score);
                                    setAlreadyAttempted(true);
                                    return dispatch(setLoading(false));

                                }
                            })
                            setQuizQuestions(data.getQuizById.questions);
                            console.log('quiz question ', data.getQuizById.questions);
                            dispatch(setLoading(false));
                        }
                        else dispatch(setLoading(false));
                    }
                    else dispatch(setLoading(false));

                } catch (error) {
                    console.log('error 4', error);
                    dispatch(setLoading(false));
                    return setError(error);
                }

            })
            ();


    }, []);



    const handleOptionClick = (index) => {
        setSelectedOptionIndex(index);
    };

    const handleNextQuestion = () => {
        if (selectedOptionIndex === null) {
            toast.error("Please select an option");
            return;
        }
        // console.log("Selected option index", selectedOptionIndex);
        // console.log("Correct option index", quizQuestions[currentQuestionIndex].correctOption);

        if (selectedOptionIndex === quizQuestions[currentQuestionIndex].correctOption) {
            setScore(score + 1);
        }

        setSelectedOptionIndex(null);

        if (currentQuestionIndex + 1 < quizQuestions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTime(timePerQuestion);
        } else {
            setTime(0);
            setQuizCompleted(true);
        }
    };

    const handleTimeUp = () => {
        // console.log("Time up", currentQuestionIndex, quizQuestions.length);
        if (selectedOptionIndex !== null) {
            if (selectedOptionIndex === quizQuestions[currentQuestionIndex].correctOption) {
                setScore(score + 1);
            }
        }
        setSelectedOptionIndex(null);
        if (currentQuestionIndex + 1 < quizQuestions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTime(timePerQuestion);
        } else {
            setTime(0);
            setQuizCompleted(true);
        }

    };

    const handleFinishButton = async (e) => {
        e.preventDefault();

        const response = await UserConfirmation("Are you sure to finish the quiz ?");
        console.log("Response from UserConfirmation", response);
        if (response) {
            if (selectedOptionIndex !== null) {
                if (selectedOptionIndex === quizQuestions[currentQuestionIndex].correctOption) {
                    setScore(score + 1);
                }
            }
            setSelectedOptionIndex(null);
            setQuizCompleted(true);
        }
        else { };

    }
    if (isLoading) {
        return <Loader />;
    }
    if (ERROR) {
        console.log("error at participateQuiz page ", ERROR);
        return <div>Error</div>;
    }
    // if (alreadyAttempted) {
    //     return <FinishScreen />
    // }

    return (
        <div className='min-h-screen flex flex-col gap-4  bg-gray-200 dark:bg-gray-800 '>
            {!quizCompleted && quizQuestions?.length > 0 && (
                <>
                    <div className='px-5 py-3 flex justify-end'>
                        <TimerComponent onTimeUp={handleTimeUp} time={time} setTime={setTime} />
                    </div>
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

                    <div className='p-3'>
                        here will be question sequence
                    </div>
                    <div className='flex flex-wrap justify-between p-3'>
                        <Button color='red' size={"xs"} onClick={handleFinishButton} className='h-6 sm:h-10  px-0 sm:px-3 '>Finish</Button>
                        <div className='flex gap-3 sm:gap-5'>
                            <button disabled > Previous</button>
                            <button disabled onClick={handleNextQuestion} >Next</button>
                        </div>
                        <Button disabled={selectedOptionIndex === null} onClick={handleNextQuestion} color='green' size={"xs"} className='h-6 sm:h-10 px-0 sm:px-3' >Submit</Button>
                    </div>
                </>
                // {/* <div>hello</div> */}
            )}

            {alreadyAttempted && (
                <FinishScreen score={score} quizQuestions={quizQuestions} />
            )}

            {quizCompleted && (
                <FinishScreen score={score} quizQuestions={quizQuestions} />
            )}

            {/* <ToastContainer /> */}
        </div>
    );
};

export default ParticipateQuiz;


