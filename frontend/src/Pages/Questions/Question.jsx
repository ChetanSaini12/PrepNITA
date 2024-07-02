import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TEMP_QUE } from '../../gqlOperatons/Question/queries';
import { CHANGE_APPROVE_STATUS_OF_QUE, DOWN_VOTE_QUESTION, GET_ALL_QUESTIONS, UP_VOTE_QUESTION } from '../../gqlOperatons/Question/mutations';
import { Button, Table, TableRow } from 'flowbite-react';
import { Loader } from '../Loader';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { PiHandsClappingLight } from "react-icons/pi";


const Question = () => {
    const dispatch = useDispatch();
    const { isLoading, ready, role, id: userId } = useSelector((state) => state.user);
    const { theme } = useSelector((state) => state.theme);

    console.log("userId", userId);

    const [ERROR, setError] = useState(null);
    const [tempQ, setTempQ] = useState(null);
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [showCreateQuestion, setShowCreateQuestion] = useState(false);
    const [selectedUserId,setSelectedUserId]=useState(0);


    const [getQuestions] = useMutation(GET_ALL_QUESTIONS);
    const [changeStatus] = useMutation(CHANGE_APPROVE_STATUS_OF_QUE);
    const [downVote] = useMutation(DOWN_VOTE_QUESTION);
    const [upVote] = useMutation(UP_VOTE_QUESTION);

    console.log("data from questions page ", data);
    const updateQuestionStatus = (Q_id) => {
        changeStatus({
            variables: {
                QuestionId: Q_id,
            },
        })
    };
    const downVoteQuestion = (Q_id) => {
        downVote({
            variables: {
                QuestionId: Q_id,
            },
        })

    };
    const upVoteQuestion = (Q_id) => {
        upVote({
            variables: {
                QuestionId: Q_id,
            },
        })
    };


    useEffect(() => {
        dispatch(setLoading(true));
        (async () => {
            try {
                const { data } = await getQuestions();
                console.log("res from getQuestions ", data);
                if (data) {
                    setData(data.getQuestions)
                    dispatch(setLoading(false));
                }
                // setData(res.data);
            } catch (error) {
                dispatch(setLoading(false));
                setError(error);
            }

        })();
    }, []);

    useEffect(() => {
        setLoading(true);
        setData(data);
        setLoading(false);
    }, [refresh]);

    const handelShowQuestion = (e) => {
        e.preventDefault();
        setShowCreateQuestion(true);
    };
    const handleCancel = (e) => {
        e.preventDefault();
        setShowCreateQuestion(false);
    };

    const truncatedDescription = (description, wordLimit) => {
        const words = description.split(' ');
        return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
    };


    if (isLoading || !ready) { return <Loader />; }
    if (ERROR) {
        console.log("error from question page ", ERROR);
        toast.error(ERROR.message ? ERROR.message : "Error fetching questions");
    };
    return (
        <div className='flex flex-col my-3 items-center py-0.5 gap-5 min-w-screen max-w-screen min-h-screen' >
            <h1 className='mx-1 w-full text-xl sm:text-3xl font-bold  text-center'>Explore the world </h1>
            <div className='flex flex-col w-full'>
                {ready && data?.length === 0 && <h1 className='text-2xl font-semibold'>No questions to show</h1>}
                {ready && data && data?.map((question, index) => {
                    return (
                        <div key={index} className="mx-5 sm:mx-20 flex flex-col bg-gray-200 dark:bg-gray-800 dark:opacity-75 rounded shadow-md py-3 px-4 md:px-6  hover:shadow-lg hover:bg-gray-400
                         dark:hover:bg-gray-700 transition duration-300  mb-2">
                            <Link to={`/questions/${question.id}`}>
                                <div className='flex justify-between items-center gap-1'>
                                    <div className='flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center w-full  '>

                                        {/* EXP DESCRIPTION */}
                                        <div className='flex gap-1 justify-start items-start'>
                                            <h3>{index + 1}.</h3>
                                            <div className='text-pretty text-base -mt-0.5 leading-relaxed text-slate-600 dark:text-slate-400' dangerouslySetInnerHTML={{ __html: truncatedDescription(question.description, 15) }} />
                                        </div>

                                        {/* TAGS , LIKES  */}
                                        <div className=' ml-3 text-xs flex flex-wrap justify-start gap-4'>
                                            <div className='flex gap-1 items-center '>
                                                <PiHandsClappingLight size={13} />
                                                <h3 className=''>{question.upvotes - question.downvotes}</h3>
                                            </div>
                                            <div className='flex gap-2 items-center'>
                                                {question.tags?.slice(0, 3).map((tag, index) => (
                                                    <div
                                                        key={index}
                                                        className=" bg-gray-300 dark:bg-gray-600  rounded-md px-1.5 py-1 text-xs break-word"
                                                        style={{ wordWrap: 'break-word', wordBreak: 'break-all', whiteSpace: 'normal' }}
                                                        dangerouslySetInnerHTML={{ __html: tag }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Question;