import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_QUESTIONS } from '../gqlOperatons/Question/queries';


const Question = () => {

    const { data, loading: queryLoading, error: queryError } = useQuery(GET_ALL_QUESTIONS);
    console.log("data from questions page ", data);
    console.log("error ", queryError);

    return (
        <div className='bg-slate-600 w-screen h-screen border-spacing-0 text-white' >
            <h1> QUESTIONS PAGE </h1>
            {/* {data && (
                <>
                    {data.getAllQuestions.map((question) => (
                        <div key={question.id}>
                            <div>QUESTION : {question.question}</div>
                            <div>OPTION1 : {question.option1}</div>
                            <div>OPTION2 : {question.option2}</div>
                            <div>OPTION3 : {question.option3}</div>
                            <div>OPTION4 : {question.option4}</div>
                            <div>ANSWER : {question.answer}</div>
                        </div>
                    ))}
                </>
            )}
            {queryLoading && <div>Loading...</div>}
            {queryError && <div>{queryError.message}</div>} */}

        </div>

    )
}

export default Question;