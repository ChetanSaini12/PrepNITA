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
import { GET_QUIZ_BY_ID, GET_QUIZ_BY_ID_with_Q, GET_QUIZ_BY_ID_without_Q, QUIZ_RESPONSE, SET_QUIZ_RESPONSE } from '../../gqlOperatons/Quiz/mutations';
import { useNavigate, useParams } from 'react-router-dom';
import { FinishScreen } from './FinishScreen';
import { setDefaultLocale } from 'react-datepicker';


const ParticipateQuiz = () => {

    const { isLoading, id, ready, loggedIn } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [ERROR, setError] = useState(null);
    const [alreadyAttempted, setAlreadyAttempted] = useState(false);
    const [quizQuestions, setQuizQuestions] = useState(null);
    const [userQuizResponse, setUserQuizResponse] = useState(null);
    const [score, setScore] = useState(0);
    const [fetchingDone1, setFetchingDone1] = useState(false);
    const [fetchingDone2,setFetchingDone2]=useState(false);

    const timePerQuestion = 20;
    const [time, setTime] = useState(timePerQuestion);

    let quizId = params.id;
    if (isNaN(quizId)) {
        navigate('/notFound');
    }
    quizId = parseInt(params.id);
    const userId = parseInt(id);


    const [getQuiz] = useMutation(GET_QUIZ_BY_ID_with_Q, {
        onError: (error) => {
            console.log("Error from query 1", error);
            return setError(error);
        },
    });

    const [setResponse] = useMutation(SET_QUIZ_RESPONSE, {
        onError: (error) => {
            console.log("Error from query 1", error);
            return setError(error);
        },
    });

    const [quizResponse] = useMutation(QUIZ_RESPONSE, {
        onError: (error) => {
            console.log("Error from query 1", error);
            return setError(error);
        },
    });


    // to check if the quiz is already attempted or not 
    useEffect(() => {
        if (!ready) return;
        console.log("enter in the hook");
        (async () => {
            try {
                const { data, errors } = await quizResponse({
                    variables: {
                        quizId: quizId,
                        userId: userId,
                    }
                });
                if (errors) {
                    console.log("error quiz res 1", errors);
                    return setError(errors);
                }
                else if (data) {
                    console.log("quiz response data at participate page 1", data);
                    // console.log(data.getQuizResponseForUser===null);
                    if (!data || data.getQuizResponseForUser === null) {
                        setAlreadyAttempted(false);
                        console.log("data nhi hai participate page ");
                    }
                    else {
                        console.log("data hai participate page");
                        setAlreadyAttempted(true);
                        setUserQuizResponse(data.getQuizResponseForUser.response);
                        setScore(data.getQuizResponseForUser.score);
                    }
                }
                else {
                    console.log("kuchh nhi mila");
                }
            } catch (error) {
                console.log("error quiz res 2 ", error);
                return setError(error);
            }
            finally {
                dispatch(setLoading(false));
                setFetchingDone1(true);
            }
        })();
    }, [ready]);


    // to fetch the quiz data
    useEffect(() => {
        if (!ready||!fetchingDone1) return;
        (
            async () => {
                dispatch(setLoading(true));
                try {
                    const { data, errors } = await getQuiz({
                        variables: {
                            QuizId: quizId,
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
                        if (moment(startTime).isAfter(currentTime)) {
                            dispatch(setLoading(false));
                            navigate(`/quiz/id/${quizId}`);
                            return null;
                        }

                        setQuizQuestions(data.getQuizById.questions);
                        console.log('quiz questions  ', data.getQuizById.questions);
                        if (alreadyAttempted === false) {
                            console.log("enter in zone ", userQuizResponse, score);
                            const tempArray = new Array(data.getQuizById.questions.length).fill(-1);
                            setUserQuizResponse(tempArray);
                        }
                    }

                } catch (error) {
                    console.log('error 4', error);
                    return setError(error);
                }
                finally {
                    dispatch(setLoading(false));
                    setFetchingDone2(true);
                }

            })
            ();

    }, [ready,fetchingDone1]);



    const handleOptionClick = (index) => {
        setSelectedOptionIndex(index);
        setUserQuizResponse((prev) => {
            const temp = [...prev];
            temp[currentQuestionIndex] = index + 1;
            return temp;
        });
    };

    const handleNextQuestion = async () => {
        if (selectedOptionIndex === null) {
            toast.error("Please select an option");
            return;
        }
        // console.log("Selected option index", selectedOptionIndex);
        // console.log("Correct option index", quizQuestions[currentQuestionIndex].correctOption);
        setSelectedOptionIndex(null);

        if (currentQuestionIndex + 1 < quizQuestions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTime(timePerQuestion);
        } else {
            handleFinishLogic();
            setTime(0);
        }
    };

    const handleTimeUp = async () => {
        // console.log("Time up", currentQuestionIndex, quizQuestions.length);
        setSelectedOptionIndex(null);
        if (currentQuestionIndex + 1 < quizQuestions.length) {
            console.log("dd", selectedOptionIndex, quizQuestions[currentQuestionIndex].correctOption);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTime(timePerQuestion);
        } else {
            handleFinishLogic();
            setTime(0);
        }

    };

    const handleFinishButton = async (e) => {
        e.preventDefault();

        const response = await UserConfirmation("Are you sure to finish the quiz ?");
        console.log("Response from UserConfirmation", response);
        if (response) {
            handleFinishLogic();
            setSelectedOptionIndex(null);
            setTime(0);

        }
        else return;

    }

    const handleFinishLogic = async () => {
        dispatch(setLoading(true));
        try {
            const { data, errors } = await setResponse({
                variables: {
                    quizId: quizId,
                    response: userQuizResponse,
                }
            });
            if (errors) {
                console.log("error in set response 2", errors);
                setError(errors);
            }
            else if (data) {
                console.log("quiz submition data", data);
                toast.success("Quiz submitted successfully");
                setScore(data.setResponse.score);
                setUserQuizResponse(data.setResponse.response);
                setQuizCompleted(true);
            }
        } catch (error) {
            console.log("error in set response 3", error);
            setError(error);
        }
        finally {
            dispatch(setLoading(false));
        }
    };

    if (isLoading || !ready) return <Loader />;
    if (ready && (loggedIn === false)) {
        return navigate('/register');
    }
    if (ERROR) {
        return toast.error(ERROR.message ? ERROR.message : ERROR || "something went wrong ");
    }

    if (ready && fetchingDone2 && alreadyAttempted) {
        return (
            <FinishScreen score={score} quizQuestions={quizQuestions} userQuizResponse={userQuizResponse} />
        );
    }
    if (quizCompleted) return <FinishScreen score={score} quizQuestions={quizQuestions} userQuizResponse={userQuizResponse} />;
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
            {!quizCompleted && quizQuestions?.length===0 && (
                <div className='flex justify-center items-center h-screen'>
                    <h1 className='text-2xl'>No questions in this quiz</h1>
                </div>
            )}

            {/* <ToastContainer /> */}
        </div>
    );
};

export default ParticipateQuiz;


