import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_TEMP_QUE } from '../gqlOperatons/Question/queries';
import { CHANGE_APPROVE_STATUS_OF_QUE, DOWN_VOTE_QUESTION, GET_ALL_QUESTIONS, UP_VOTE_QUESTION } from '../gqlOperatons/Question/mutations';
import { Button, Table, TableRow } from 'flowbite-react';
import { Loader } from '../Pages/Loader';
import { toast } from 'react-hot-toast';


const Question = () => {
    const [Error, setError] = useState(null);
    const [tempQ, setTempQ] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const [getQuestions] = useMutation(GET_ALL_QUESTIONS, {
        onError: (error) => {
            console.log("error from getQuestions ", error);
            return toast.error("Error fetching questions");
            // toast.error("Error fetching questions");
            // setError(error.message);
        }
    });

    const [changeStatus] = useMutation(CHANGE_APPROVE_STATUS_OF_QUE, {
        onError: (error) => {
            console.log("error from changeStatus ", error);
            toast.error(error.message || error);
            // setError(error.message);
        }
    });

    const [downVote] = useMutation(DOWN_VOTE_QUESTION, {
        onError: (error) => {
            console.log("error from downVote ", error);
            toast.error(error.message);
            // setError(error.message);
        }
    });
    const [upVote] = useMutation(UP_VOTE_QUESTION, {
        onError: (error) => {
            console.log("error from downVote ", error);
            toast.error(error.message);
            // setError(error.message);
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
        setLoading(true);
        getQuestions().then((res) => {
            console.log("res from getQuestions ", res);
            
            setData(res.data.getQuestions)
            setLoading(false);
            // setData(res.data);
        }).catch((err) => {
            setLoading(false);
            toast.error(err.message);
            console.log("err from getQuestions ", err);
        });
    }, []);
    
    useEffect(() => {
        setLoading(true);
        setData(data);
        setLoading(false);
    }, [refresh]);




    return (
        <div className=' w-screen h-screen border-spacing-0 text-white' >
            {loading && <Loader />}
            <h1 className='text-4xl mb-4'> QUESTIONS PAGE </h1>
            {data && (
                <>
                    <Table hoverable className='shadow-md'>
                    <Table.Head>
                        <Table.HeadCell>Question ID</Table.HeadCell>
                        <Table.HeadCell>Title</Table.HeadCell>
                        <Table.HeadCell>Upvotes</Table.HeadCell>
                        <Table.HeadCell>Downvotes</Table.HeadCell>
                        <Table.HeadCell>Author</Table.HeadCell>
                        <Table.HeadCell>Approved</Table.HeadCell>
                        <Table.HeadCell>
                        <span>Edit</span>
                        </Table.HeadCell>
                    </Table.Head>
                    {data.map((question) => (
                        <Table.Body className='divide-y' key={question.id}>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>
                                {question?.id}
                                </Table.Cell>
                                <Table.Cell>
                                {question?.links?.title}
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