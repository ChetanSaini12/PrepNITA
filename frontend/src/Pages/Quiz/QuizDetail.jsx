import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DELETE_QUIZ, GET_QUIZ_BY_ID, UPDATE_QUIZ } from '../../gqlOperatons/Quiz/mutations';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import { useMutation } from '@apollo/client';
import { GET_USER_BY_ID2 } from '../../gqlOperatons/mutations';
import moment from 'moment';
import { Button, Textarea } from 'flowbite-react';
import DateTimePicker from '../../Components/DatePicker';
import toast from 'react-hot-toast';
// import {favicon} from '../../../public/favicon.ico'

const QuizDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.user);

    const [quiz, setQuiz] = useState(null);
    const [tempQuiz, setTempQuiz] = useState({})
    const [createdBy, setCreatedBy] = useState({});
    const [ERROR, setError] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [active, setActive] = useState(true);
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());

    const imagePath = '/logo192.png';//for logo of the quiz


    const [getQuizById] = useMutation(GET_QUIZ_BY_ID, {
        onError: (error) => {
            console.log("on error at get quiz by id", error);
            return setError(error);
        }
    });

    const [getUserById] = useMutation(GET_USER_BY_ID2, {
        onError: (error) => {
            console.log("on error at get user by id", error);
            return setError(error);
        }
    });

    const [updateQuiz] = useMutation(UPDATE_QUIZ, {
        onError: (error) => {
            console.log("on error at update quiz", error);
            return setError(error);
        }
    });

    const [deleteQuiz] = useMutation(DELETE_QUIZ, {
        onError: (error) => {
            console.log("on error at delete quiz", error);
            return setError(error);
        }
    });



    const id = parseInt(useParams().id);

    useEffect(() => {
        (
            isNaN(id) ? navigate("/*") :
                async () => {
                    dispatch(setLoading(true));
                    try {
                        const { data, errors } = await getQuizById(
                            {
                                variables: {
                                    QuizId: id
                                }
                            }
                        );
                        if (errors) {
                            dispatch(setLoading(false));
                            return setError(errors);
                        }
                        else if (data) {
                            //to get user who created this quiz by ID
                            const { data: res, errors: err } = await getUserById({
                                variables: {
                                    id: parseInt(data.getQuizById.createdBy)
                                }
                            });
                            if (err) {
                                dispatch(setLoading(false));
                                return setError(err);
                            }
                            else if (res) {
                                console.log("created by ", res);
                                setCreatedBy(res.getUserById.userInformation);
                            }

                            dispatch(setLoading(false));
                            console.log("data at quiz detail ", data);
                            setQuiz(data.getQuizById);
                            setTempQuiz(data.getQuizById);
                            setStartDateTime(moment(data.getQuizById.startTime));
                            setEndDateTime(moment(data.getQuizById.endTime));
                        }
                    } catch (error) {
                        dispatch(setLoading(false));
                        return setError(error);
                    }
                }
        )();

    }, [refresh]);

    const handleQuizEdit = (e) => {
        e.preventDefault();
        setActive(false);
        setShowEditMode(true);
    };
    const handleCancel = (e) => {
        e.preventDefault();
        setActive(true);
        setShowEditMode(false);
        setTempQuiz(quiz);
    };

    const handleChange = (e) => {
        setTempQuiz({
            ...tempQuiz,
            [e.target.id]: e.target.value
        });
        // console.log("temp quiz ", tempQuiz);
        // console.log("date time ", startDateTime.toISOString());
    };

    const handleUpdateQuiz = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const { data, errors } = await updateQuiz({
                variables: {
                    quizId: id,
                    Quiz: {
                        title: tempQuiz.title,
                        description: tempQuiz.description,
                        startTime: startDateTime.toISOString(),
                        endTime: endDateTime.toISOString(),
                    }
                }
            });
            if (errors) {
                dispatch(setLoading(false));
                return setError(errors);
            }
            else if (data) {
                dispatch(setLoading(false));
                // console.log("updated quiz ", data);
                setRefresh(!refresh);
                setActive(true);
                setShowEditMode(false);
                toast.success(" Quiz is updated successfully ! ")
            }
        } catch (error) {
            dispatch(setLoading(false));
            return setError(error);
        }


    };

    const handleDeleteQuiz = async (e) => {
        e.preventDefault();
        const userConfirmation = window.confirm("You are deleting this quiz ");
        if (!userConfirmation) return;
        dispatch(setLoading(true));
        try {
            const { data, errors } = await deleteQuiz({
                variables: {
                    QuizId: id,
                }
            });
            if (errors) {
                dispatch(setLoading(false));
                return setError(errors);
            }
            else if (data) {
                dispatch(setLoading(false));
                // console.log("updated quiz ", data);
                setActive(true);
                setShowEditMode(false);
                toast.success(" Quiz is deleted successfully ! ")
                navigate('/quizes');
            }
        } catch (error) {
            dispatch(setLoading(false));
            return setError(error);
        }
    };



    if (isLoading) return <Loader />;
    if (ERROR) {
        toast.error(ERROR.message ? ERROR.message : ERROR || "something went wrong ");
    }


    return (
        <div className=' flex flex-col w-screen min-h-screen items-center gap-2'>
            {quiz && active && (
                // <>
                <div className=' bg-gray-200 dark:bg-gray-800  w-full md:w-3/4 py-8 px-5 mt-5 mb-5  rounded-md
                  flex flex-col gap-5 '>
                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-5 '>
                            <img src={imagePath} alt="logoImage" className='w-32 h-32 md:w-32 object-cover border border-gray-100 dark:border-gray-700  rounded-md ' />
                            <div className='flex flex-col gap-2 mt-1'>
                                <div className='font-semibold text-lg md:text-xl lg:text-2xl '>{quiz.title}</div>
                                <span>
                                    <Link className='hover:text-blue-500 dark:hover:text-blue-300' to={`/profile/${parseInt(quiz.createdBy)}`}>✍🏼 {createdBy.name}</Link>
                                </span>
                                <div className='flex  flex-wrap gap-2 md:gap-3 lg:gap-5 mt-1 '>
                                    {/* <div className='flex text-blue-500 dark:text-blue-300 gap-5'> */}
                                    <div className='bg-gray-300  dark:bg-gray-700 rounded-xl text-center px-4'>#Dcc</div>
                                    <div className='bg-gray-300 dark:bg-gray-700 rounded-xl tex-sm text-center pb-1 px-4'>#Coding</div>
                                    <div className='bg-gray-300 dark:bg-gray-700 rounded-xl tex-sm text-center pb-1 px-4'>#Quiz</div>
                                    <div className='bg-gray-300 dark:bg-gray-700 rounded-xl tex-sm text-center pb-1 px-4'>#Challenge</div>
                                </div>

                            </div>

                        </div>
                        <div className='flex justify-between'>
                            {/* <img className='  w-5 object-cove  rounded-md' src='/location.png'></img> */}
                            <div className='flex gap-3'>
                                <img className="dark:white-image w-5 object-cover rounded-md" src="/location.png" alt="Location">
                                </img>
                                <div>Online</div>
                            </div>
                            <div className='flex gap-3'>
                                <button onClick={handleQuizEdit} className='border border-gray-300 dark:border-gray-700 
                                 hover:border-red-500 dark:hover:border-red-400 px-2 rounded-lg'>Edit </button>
                                <button onClick={handleDeleteQuiz} className='border border-gray-300 dark:border-gray-700 
                                 hover:border-red-500 dark:hover:border-red-400 px-2 rounded-lg'>Delete</button>
                            </div>
                        </div>
                    </div>
                    <div className='border border-gray-400 '></div>

                    <div className='flex justify-between mt-5'>
                        <div className='flex flex-col text-sm sm:text-md md:text-lg gap-1'>
                            <div className='font-semibold text-center' >Duration</div>
                            <div>
                                {(() => {
                                    const days = moment(quiz.endTime).diff(moment(quiz.startTime), 'days');
                                    const hours = moment(quiz.endTime).diff(moment(quiz.startTime), 'hours') % 24;
                                    const minutes = moment(quiz.endTime).diff(moment(quiz.startTime), 'minutes') % 60;
                                    const seconds = moment(quiz.endTime).diff(moment(quiz.startTime), 'seconds') % 60;

                                    return `${days ? days + " Days " : ""}${hours ? hours + " Hours " : ""}${minutes ? minutes + " Minutes " : ""}${seconds ? seconds + " Seconds" : ""}`;
                                })()}
                            </div>
                        </div>

                        <div className='flex flex-col  text-sm sm:text-md md:text-lg'>
                            <div className='font-semibold text-center'>Quiz Timing </div>
                            {moment(quiz.endTime) < moment() && (
                                <div className='text-red-400'>Quiz ended</div>
                            )}
                            {moment(quiz.endTime) > moment() && (
                                <div className='flex  justify-between gap-1 md:gap-2'>
                                    <div className=''>
                                        <span className='text-xl sm:text-3xl'>📅</span> <span>{moment(quiz.startTime).format('DD MMMM YY')}</span>
                                    </div>
                                    <div className=''>
                                        <span className='text-xl sm:text-3xl'>🕗</span> <span>{moment(quiz.startTime).format('HH:mm:ss')} IST</span></div>
                                </div>
                            )
                            }
                        </div>
                    </div>

                    {moment(quiz.startTime) > moment() && (
                        <div className='flex justify-between gap-1'>
                            <div>Once the quiz starts you can enter the quiz </div>
                            <Button disabled size={"sm"} className='px-2 py-0 sm:px-5 md:px-6 mr-2 sm:mr-5 md:mr-12'>Enter</Button>
                        </div>
                    )}
                    {moment(quiz.startTime) <= moment() && moment(quiz.endTime) > moment() && (
                        <div className='flex justify-between gap-1'>
                            <div>Quiz is running, You can participate in the quiz. </div>
                            <Button size={"sm"} className='px-2 py-0 sm:px-5 md:px-6 mr-2 sm:mr-5 md:mr-12'>Enter</Button>
                        </div>
                    )}
                    {moment(quiz.endTime) < moment() && (
                        <div className='flex justify-between gap-1'>
                            <div>The quiz is over, you can practice the quiz . </div>
                            <Button size={"sm"} className=' px-1 py-0 sm:px-5 md:px-6 '>Practice</Button>
                        </div>
                    )}

                    {/* <div>yha par contest start krne ka button aayega</div> */}

                </div>

                // </>

            )}

            {quiz && active && (
                <div className='bg-gray-200 dark:bg-gray-800  w-full md:w-3/4 py-5 px-5 mb-3  rounded-md
            flex flex-col gap-5 '>
                    <div className='text-lg sm:text-xl font-semibold'>About the quiz </div>
                    <div className='font-semibold -mb-2'>{quiz.title}</div>
                    <div>{quiz.description}</div>

                </div>
            )}
            {quiz && !active && (
                <div className=' bg-gray-200 dark:bg-gray-800  w-full md:w-3/4 pt-5 pb-8 px-5 mt-5 mb-5  rounded-md
                flex flex-col gap-5 '>
                    <span onClick={handleCancel} className='flex justify-end'><button className=' font-semibold sm:text-lg hover:text-xl
                     hover:text-red-500'>X</button></span>
                    <form onSubmit={handleUpdateQuiz} className='flex flex-col gap-4 border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3 '>
                        <div >
                            <h1 className="text-xl mb-1.5 mx-2">Title : </h1>
                            <Textarea
                                required
                                placeholder='Title of the quiz'
                                id="title"
                                value={tempQuiz.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div >
                            <h1 className="text-xl mb-1.5 mx-2">Description : </h1>
                            <Textarea
                                required
                                placeholder='Description of the quiz'
                                id="description"
                                value={tempQuiz.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex flex-col sm:flex-row justify-between'>
                            <DateTimePicker required setDateTime={setStartDateTime} text='Start date and time ' />
                            <DateTimePicker required setDateTime={setEndDateTime} text='End date and time ' />
                        </div>
                        <Button type='submit' className='my-5'>Update Quiz </Button>
                    </form>
                </div>
            )}
        </div>


    )
}

export default QuizDetail