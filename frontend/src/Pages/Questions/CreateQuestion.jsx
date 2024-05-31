import { useMutation } from '@apollo/client';
import { Button, TextInput, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react';
import { CREATE_QUESTION } from '../../gqlOperatons/Question/mutations';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader.jsx';
import { useNavigate } from 'react-router-dom';



const CreateQuestion = ({ handleCancel }) => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loggedIn, isLoading } = useSelector((state) => state.user);
    const theme = useSelector((state) => state.theme);

    const [formData, setFormData] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [ERROR, setError] = useState(null);
    const [ready, setReady] = useState(false);

    dispatch(setLoading(false));

    useEffect(() => {
        console.log("state",loggedIn);

        setReady(true);
    },[]);

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

    const [createQuestion] = useMutation(CREATE_QUESTION, {
        onError: (error) => {
            console.log("mutation error at create question ", error);
            return setError(error);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        console.log("Form Data : ", formData);
        try {
            const { data, errors } = await createQuestion({
                variables: {
                    Question: {
                        description: formData.description,
                        answer: formData.answer,
                        tags: formData.tags,
                        // links: [
                        //     {
                        //         "title": formData.title,
                        //         "url": "url1"
                        //     }
                        // ],

                    }
                },
            });
            console.log("res", data, errors);
            if (errors) {
                console.log("error in creating question", errors);
                dispatch(setLoading(false));
                return setError(errors);
            } else if (data) {
                dispatch(setLoading(false));
                toast.success("Question created successfully with id : " + data.createQuestion.id);
                // document.getElementById('questionForm').reset();
                setFormData({});
            }
            else dispatch(setLoading(false));
            setRefresh(!refresh);

        } catch (err) {
            console.log("errr", err);
            dispatch(setLoading(false));
            setRefresh(!refresh);
            return setError(err);
        }

    };

    if (ERROR) {
        toast.error(ERROR.message ? ERROR.message : "Something went wrong");
        setError(null);
    }
    if (isLoading) return <Loader />;
    if (ready&&loggedIn==false) navigate('/register');
    return (
        <>
            <div className='p-3 max-w-3xl mx-auto min-h-screen mt-2 mb-4'>
                <div className='flex justify-end'><button onClick={handleCancel} className='text-lg sm:text-xl hover:text-red-500' >X</button></div>
                <h1 className='text-center text-lg:md:text-2xl my-4 font-semibold'>
                    Create a Question</h1>
                <div className="question_container">
                    <form id='questionForm' onSubmit={handleSubmit} className='flex flex-col gap-4 border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3 '>
                        {/* <div id="question_area_section">
                            <h1 className="text-2xl">Title : </h1>
                            <Textarea
                                required
                                placeholder='Title of the question'
                                id="title"
                                onChange={handleChange}
                            />
                        </div> */}

                        <div id="question_area_section">
                            <h1 className="text-xl mb-1.5 mx-2">Description : </h1>
                            <Textarea
                                required
                                placeholder='Description of the question'
                                id="description"
                                onChange={handleChange}
                            />
                        </div>
                        <div id="question_area_section">
                            <h1 className="text-xl mb-1.5 mx-2">Answer : </h1>
                            <Textarea
                                required
                                placeholder='Answer of the question'
                                id="answer"
                                onChange={handleChange}
                            />
                        </div>

                        <div id="question_area_section">
                            <h1 className="text-xl mb-1.5 mx-2">Tags : </h1>
                            <Textarea
                                placeholder='os,dbms,linus,java'
                                id="tags"
                                onChange={handleChange}
                            />
                        </div>
                        <Button type='submit' className='my-5'>Create</Button>
                    </form>

                    {/* //....................PREVIEW OF THE QUESTION..................................                     */}
                    {/* <div classNamme="">
                        <h1 className='my-5 text-3xl text-teal-400'>Preview of the Question </h1>

                        <div className="preview-content flex flex-col gap-3">
                            <div>
                                <span className='text-xl'>Title :</span> {formData.title}
                            </div>
                            <div>
                                <span className='text-xl'>Description :</span>
                                <br></br>
                                {formData.description}
                            </div>
                            <div>
                                <span className='text-xl'> Answer :</span>
                                <br></br>
                                {formData.answer}
                            </div>
                            <div>
                                <span className='text-xl'>Tags :</span>
                                {"  " + formData?.tags?.map((tag) => tag + "  ")}
                            </div>

                        </div>
                    </div> */}
                </div>
            </div></>
    )
}

export default CreateQuestion;