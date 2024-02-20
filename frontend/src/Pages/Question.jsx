import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_QUESTIONS, GET_TEMP_QUE } from '../gqlOperatons/Question/queries';
import { CHANGE_APPROVE_STATUS_OF_QUE, DOWN_VOTE_QUESTION, UP_VOTE_QUESTION } from '../gqlOperatons/Question/mutations';
import { Button } from 'flowbite-react';


const Question = () => {
    const [Error, setError] = useState(null);
    const [tempQ,setTempQ]=useState(null);
    const { data, loading: queryLoading, error: queryError } = useQuery(GET_ALL_QUESTIONS);
    if (queryError) {
        setError(queryError.message);
    }
    // const { data2, loading: queryLoading2, error: queryError2 } = useQuery(GET_TEMP_QUE);
    // if (queryError2) {
    //     setError(queryError2.message);
    // }
    const [changeStatus] = useMutation(CHANGE_APPROVE_STATUS_OF_QUE, {
        onError: (error) => {
            console.log("error from changeStatus ", error);
            setError(error.message);
        }
    });

    const [downVote] = useMutation(DOWN_VOTE_QUESTION, {
        onError: (error) => {
            console.log("error from downVote ", error);
            setError(error.message);
        }
    });
    const [upVote] = useMutation(UP_VOTE_QUESTION, {
        onError: (error) => {
            console.log("error from downVote ", error);
            setError(error.message);
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
    


    return (
        <div className=' w-screen h-screen border-spacing-0 text-white' >
            <h1 className='text-4xl mb-4'> QUESTIONS PAGE </h1>
            {data && (
                <>
                    {data.getQuestions.map((question) => (
                        <div key={question.id}>
                            <div>TITLE : {question.title}</div>
                            <div>QUESTION : {question.description}</div>
                            <div>ANS : {question.answer}</div>
                            <div>UpVotes : {question.upvotes}</div>
                            <div>DownVotes : {question.downvotes}</div>
                            <div>Approved : {question.isApproved ? "YES" : "NO"}</div>
                            <div>Author : {question.postedBy}</div>
                            <Button onClick={() => { updateQuestionStatus(question.id) }} gradientDuoTone="purpleToPink" className='mb-2' >
                                Update status
                            </Button>
                            <Button onClick={() => { upVoteQuestion(question.id) }} gradientDuoTone="purpleToPink"className='mb-2' >
                                Upvote
                            </Button>
                            <Button onClick={() => { downVoteQuestion(question.id) }} gradientDuoTone="purpleToPink" className='mb-2'>
                                DownVote
                            </Button>
                            {/* <Button onClick={()=>{setTempQ(data.tempQueQr)}}  gradientDuoTone="purpleToPink" className='mb-2'>
                                Get temp questio 
                            </Button> */}
                            {/* {
                                tempQ && (
                                    <div>
                                        <h1>Your temp quesiton </h1>
                                        {tempQ.tempQueQr.question}
                                    </div>
                                )
                            } */}
                        </div>
                    ))}
                </>
            )}
            {queryLoading && <div>Loading...</div>}
            {Error && <div>{Error}</div>}

        </div>

    )
}

export default Question;