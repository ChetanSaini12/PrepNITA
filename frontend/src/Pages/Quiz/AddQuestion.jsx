import { useMutation } from '@apollo/client';
import { Button, Select, Textarea } from 'flowbite-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { ADD_QUESTION_TO_QUIZ } from '../../gqlOperatons/Quiz/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';

export const AddQuestion = ({ handleCancel, quizId }) => {

    const { isLoading } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [ERROR, setError] = useState(null);
    const [tempQuestion, setTempQuestion] = useState({
        description: "",
        options: ["", "", "", ""],
        correctOption: "",
    });

    const [AddQuestion] = useMutation(ADD_QUESTION_TO_QUIZ, {
        onError: (error) => {
            console.log("on error at add question ", error);
            dispatch(setLoading(false));
            return setError(error);
        }
    });

    const handleChangeDescription = (e) => {
        if (e.target.id === "description")
            setTempQuestion({ ...tempQuestion, description: e.target.value });
        else {//change correct option 
            setTempQuestion({ ...tempQuestion, correctOption: e.target.value });
        }
        // console.log("tempQuestion", tempQuestion);
    };
    const handleChangeOptions = (e, index) => {
        const value = e.target.value;
        // console.log("->", index, value);
        const newOpt = [...tempQuestion.options];
        newOpt[index] = value;
        setTempQuestion({ ...tempQuestion, options: newOpt });
    };
    const handleSave = async (e) => {
        e.preventDefault();

        tempQuestion.description = tempQuestion.description.trim();
        tempQuestion.options = tempQuestion.options.map((opt) => opt.trim());
        tempQuestion.correctOption = tempQuestion.correctOption.trim();
        setTempQuestion(tempQuestion);
        if (tempQuestion.description === "" || tempQuestion.correctOption === "" || tempQuestion.options.map(opt => opt.trim()).includes("")) {
            toast.error("Please fill all the fields");
            return;
        }
        dispatch(setLoading(true));
        try {
            const { data, errors } = await AddQuestion({
                variables: {
                    question: {
                        quizId: quizId,
                        description: tempQuestion.description,
                        options: tempQuestion.options,
                        correctOption: parseInt(tempQuestion.correctOption)
                    }
                }
            });
            if (errors) {
                // console.log("error at add question ", errors);
                dispatch(setLoading(false));
                return setError(errors);
            }
            else if (data) {
                // console.log("question added ", data);
                toast.success("Question added successfully");
                setTempQuestion({
                    description: "",
                    options: ["", "", "", ""],
                    correctOption: "",
                });
                dispatch(setLoading(false));
            }
        }
        catch (error) {
            // console.log("error at add question ", error);
            dispatch(setLoading(false));
            return setError(error);
        }

        // console.log("tempQuestions", tempQuestions);
    };

    if (isLoading) { <Loader /> }
    if (ERROR) { toast.error(ERROR.message ? ERROR.message : ERROR || "something went wrong"); }

    return (
        <>

            {/* <div className='min-w-screen flex flex-col items-center'> */}
            <div className=' bg-gray-200 dark:bg-gray-800  w-screen md:w-3/4 pt-5 pb-8 px-5 mt-5 mb-5  rounded-md
             flex flex-col gap-5 '>

                <span onClick={handleCancel} className='-mt-4 flex justify-end'><button className=' font-semibold sm:text-lg hover:text-xl
                  hover:text-red-500'>X</button></span>
                <h2 className='text-xl sm:text-lg -mt-4 -mb-2 mx-5'>You can add multiple questions one by one .</h2>
                <form onSubmit={handleSave} className='flex flex-col gap-4 border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3 '>
                    <div >
                        <h1 className="text-xl mb-1.5 mx-2">Description : </h1>
                        <Textarea
                            required
                            placeholder='Description of the quiz'
                            id="description"
                            value={tempQuestion.description}
                            onChange={handleChangeDescription}
                        />
                    </div>
                    <div>
                        <h1 className="text-xl mb-1.5 mx-2">Options : </h1>
                        <div className='flex flex-col gap-2'>
                            {tempQuestion.options.map((option, index) => (
                                <Textarea required value={option} onChange={(e) => handleChangeOptions(e, index)} id={(index + 1)} placeholder={"option " + ((index + 1))} />

                            ))}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl mb-1.5 mx-2">Correct Option : </h1>
                        <Select id='correctOption' onChange={handleChangeDescription}>
                            <option selected value=''>Select correct option</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </Select>
                    </div>

                    <Button type='submit' color='cyan' className='mt-5 mb-3'>Save question </Button>
                </form>

            </div>
            {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 text-wrap'>
                {tempQuestions.length > 0 && tempQuestions.map
                    ((question, index) =>
                        <div key={index} className='bg-gray-200 dark:bg-gray-800 min-w-72 md:min-w-80  min-h-36 p-5'>
                            <h1 className='text-xl'>Question {index + 1}</h1>
                            <h2 className='text-lg'>{question.description}</h2>
                        </div>
                    )
                }
                
            </div> */}
        </>
    )
}
