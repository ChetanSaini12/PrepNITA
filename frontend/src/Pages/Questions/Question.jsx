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


const Question = () => {
    const { isLoading } = useSelector((state) => state.user);
    const [ERROR, setError] = useState(null);
    const [tempQ, setTempQ] = useState(null);
    const [data, setData] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const dispatch = useDispatch();

    const [getQuestions] = useMutation(GET_ALL_QUESTIONS, {
        onError: (error) => {
            console.log("error from getQuestions ", error);
            return setError(error);
            // toast.error("Error fetching questions");
            // setError(error.message);
        }
    });

    const [changeStatus] = useMutation(CHANGE_APPROVE_STATUS_OF_QUE, {
        onError: (error) => {
            console.log("error from changeStatus ", error);
            // toast.error(error.message || error);
            return setError(error);
        }
    });

    const [downVote] = useMutation(DOWN_VOTE_QUESTION, {
        onError: (error) => {
            console.log("error from downVote ", error);
            // toast.error(error.message);
            return setError(error.message);
        }
    });
    const [upVote] = useMutation(UP_VOTE_QUESTION, {
        onError: (error) => {
            console.log("error from downVote ", error);
            // toast.error(error.message);
            return setError(error.message);
        }
    });

    console.log("data from questions page ", data);
    const updateQuestionStatus = (Q_id) => {
        changeStatus({
            variables: {
                QuestionId: Q_id,
            },
            // Headers:{
            //     authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTcwNzg1ODIyMywiZXhwIjoxNzE2NDk4MjIzfQ.m7vATj6uzD6Id0LaGhlYCf-MKAsaKakBLphwlfNdQdY"
            // }
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
                const { data, errors } = await getQuestions();
                console.log("res from getQuestions ", data);
                if (errors) {
                    console.log("error in fetching question ", errors);
                    dispatch(setLoading(false));
                   return  setError(errors);
                }
                else {
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



    if(ERROR){
        console.log("error from question page ", ERROR);
        toast.error(ERROR.message?ERROR.message : "Error fetching questions");
    };
    return (
        <div className='min-h-screen table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500' >
            {isLoading && <Loader />}
            {data && (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Question ID</Table.HeadCell>
                            {/* <Table.HeadCell>Title</Table.HeadCell> */}
                            {/* <Table.HeadCell>Description</Table.HeadCell> */}
                            {/* <Table.HeadCell>Answer</Table.HeadCell> */}
                            <Table.HeadCell>Upvotes</Table.HeadCell>
                            <Table.HeadCell>Downvotes</Table.HeadCell>
                            <Table.HeadCell>Author</Table.HeadCell>
                            <Table.HeadCell>Approved</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Question Link</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {data.map((question) => (
                            <Table.Body className='divide-y' key={question.id}>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        {question?.id}
                                    </Table.Cell>

                                    {/* <Table.Cell>
                                    <Link className='font-medium text-gray-900 dark:text-white'>
                                {question?.links?.title}
                                    </Link>
                                </Table.Cell> */}
                                    {/* <Table.Cell>
                                <Link className='font-medium text-gray-900 dark:text-white'>

                                {question.description}
                                </Link>
                                </Table.Cell> */}
                                    {/* <Table.Cell>
                                {question.answer}
                                </Table.Cell> */}
                                    <Table.Cell className='text-teal-600'>
                                        {question.upvotes}
                                    </Table.Cell>
                                    <Table.Cell className='text-red-500'>
                                        {question.downvotes}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className='font-medium text-gray-900 dark:text-white'>
                                            {question.createdBy}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {question.isApproved ? (<FaCheck className='text-teal-500'></FaCheck>) : (<FaTimes className='text-red-500'></FaTimes>)}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/questions/${question?.id}`} className='text-teal-500 hover:underline'>
                                            <span>View </span>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                            // <div key={question.id}>
                            //     <div>TITLE : {question?.links?.title}</div>
                            //     <div>QUESTION : {question.description}</div>
                            //     <div>ANS : {question.answer}</div>
                            //     <div>UpVotes : {question.upvotes}</div>
                            //     <div>DownVotes : {question.downvotes}</div>
                            //     <div>Approved : {question.isApproved ? "YES" : "NO"}</div>
                            //     <div>Author : {question.createdBy}</div>
                            //     <Button onClick={() => { setRefresh(!refresh); updateQuestionStatus(question.id) }} gradientDuoTone="purpleToPink" className='mb-2' >
                            //         Update status
                            //     </Button>
                            //     <Button onClick={() => { setRefresh(!refresh); upVoteQuestion(question.id) }} gradientDuoTone="purpleToPink" className='mb-2' >
                            //         Upvote
                            //     </Button>
                            //     <Button onClick={() => { setRefresh(!refresh); downVoteQuestion(question.id) }} gradientDuoTone="purpleToPink" className='mb-2'>
                            //         DownVote
                            //     </Button>
                            //     {/* <Button onClick={()=>{setTempQ(data.tempQueQr)}}  gradientDuoTone="purpleToPink" className='mb-2'>
                            //         Get temp questio 
                            //     </Button> */}
                            //     {/* {
                            //         tempQ && (
                            //             <div>
                            //                 <h1>Your temp quesiton </h1>
                            //                 {tempQ.tempQueQr.question}
                            //             </div>
                            //         )
                            //     } */}
                            // </div>
                        ))}
                    </Table>
                </>
            )}

        </div>

    )
}

export default Question;