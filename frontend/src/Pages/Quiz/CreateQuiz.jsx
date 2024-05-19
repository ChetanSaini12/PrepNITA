import { Button, Label, Textarea } from 'flowbite-react';
import React, { useState } from 'react'
import { CREATE_QUIZ } from '../../gqlOperatons/Quiz/mutations';
import { from, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../app/user/userSlice';
import toast from 'react-hot-toast';
import DateTimePicker from '../../Components/DatePicker';
import { Loader } from '../Loader';

export const CreateQuiz = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({});
    const [ERROR, setError] = useState(null);
    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());


    const handleChange = ((e) => {
        if (e.target.id === "tags") {
            setFormData({
                ...formData,
                tags: e.target.value.split(',').map(str => str.trim())
            });
        }
        else
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            });
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("form submitted");
    }

    const [createQuiz] = useMutation(CREATE_QUIZ, {
        onError: (error) => {
            console.log("on erro at createQuiz", error);
            return setError(error);
        }

    });

    const handleCreateQuiz = async (e) => {
        e.preventDefault();
        const userConfirmation = window.confirm("Are you sure you want to create this quiz? ");
        if (!userConfirmation) return;
        dispatch(setLoading(true));
        try {
            const { data, errors } = await createQuiz({
                variables: {
                    Quiz: {
                        title: formData.title,
                        description: formData.description,
                        startTime: startDateTime.toISOString(),
                        endTime: endDateTime.toISOString(),
                        // endTime: new Date().toISOString() + `T23:59:59.999Z`,
                    }
                },
            });
            if (errors) {
                dispatch(setLoading(false));
                return setError(errors);
            }
            else if (data) {
                console.log("data at create quiz ", data);
                toast.success("Quiz created successfully");
                setFormData({});
                dispatch(setLoading(false));
            }
        } catch (error) {
            dispatch(setLoading(false));
            return setError(error);
        }
    };

    if (isLoading) {
        return <Loader />
    }
    if (ERROR) {
     toast.error(ERROR.message ? ERROR.message : ERROR || "something went wrong ");
    }

    return (
        // <div className='flex flex-col items-center my-5 mx-1 gap-5 w-screen min-h-screen' >

        //     CreateQuiz</div>
        <>
            <div className='p-3 max-w-3xl mx-auto min-h-screen  mt-2 mb-5'>
                <h1 className='text-center text-lg md:text-2xl my-4 font-semibold'>
                    Create a Quiz</h1>
                <div className="question_container">
                    <form id='questionForm' onSubmit={handleCreateQuiz} className='flex flex-col gap-4 border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3 '>
                        <div >
                            <h1 className="text-xl mb-1.5 mx-2">Title : </h1>
                            <Textarea
                                required
                                placeholder='Title of the quiz'
                                id="title"
                                onChange={handleChange}
                            />
                        </div>

                        <div >
                            <h1 className="text-xl mb-1.5 mx-2">Description : </h1>
                            <Textarea
                                required
                                placeholder='Description of the quiz'
                                id="description"
                                onChange={handleChange}
                            />
                        </div>

                        <div className='flex justify-between'>

                            <DateTimePicker required setDateTime={setStartDateTime} text='Start date and time ' />
                            <DateTimePicker required setDateTime={setEndDateTime} text='End date and time ' />

                        </div>


                        <Button type='submit' className='my-5'>Create</Button>
                    </form>

                </div>
            </div></>
    )
}
