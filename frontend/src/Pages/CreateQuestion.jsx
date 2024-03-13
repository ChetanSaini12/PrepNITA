import { useMutation } from '@apollo/client';
import { Button, TextInput, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react';
import { CREATE_QUESTION } from '../gqlOperatons/Question/mutations';
import toast from 'react-hot-toast';


const CreateQuestion = () => {

    const [formData, setFormData] = useState({});
    const [refresh, setRefresh] = useState(false);

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
            return toast.error(error.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data : ", formData);
        createQuestion({
            variables: {
                Question: {
                    title: formData.title,
                    description: formData.description,
                    answer: formData.answer,
                    tags: formData.tags,
                    links: [
                        {
                            "title": "url title 1",
                            "url": "url1"
                        }
                    ],

                }
            },
        }).then((res) => {
            console.log("res", res);
            if (!res.data) {

            } else
                toast.success("Question created successfully ")

            setRefresh(!refresh);
        })
            .catch((err) => {
                console.log("errr", err);
                setRefresh(!refresh);
                return toast.error(err.message);
            });
        setFormData({});
        document.getElementById('questionForm').reset();
    };

    // useEffect(() => {

    // }, [refresh]);


    return (
        <>
            <div className="data-area">
                <div className="question_container">
                    <form id='questionForm' onSubmit={handleSubmit} className="question_details_area">

                        <div id="question_area_section">
                            <h1 className="text-2xl">Title : </h1>

                            <Textarea
                                required
                                placeholder='Title of the question'
                                id="title"
                                onChange={handleChange}
                            />
                        </div>

                        <div id="question_area_section">
                            <h1 className="text-2xl">Description : </h1>
                            <Textarea
                                required
                                placeholder='Description of the question'
                                id="description"
                                onChange={handleChange}
                            />
                        </div>
                        <div id="question_area_section">
                            <h1 className="text-2xl">Answer : </h1>
                            <Textarea
                                required
                                placeholder='Answer of the question'
                                id="answer"
                                onChange={handleChange}
                            />
                        </div>

                        <div id="question_area_section">
                            <h1 className="text-2xl">Tags : </h1>
                            <Textarea
                                placeholder='os,dbms,linus,java'
                                id="tags"
                                onChange={handleChange}
                            />
                        </div>
                        <Button type='submit' className='my-5'>Create</Button>
                    </form>
                    <div classNamme="">
                        <h1 className='text-3xl'>Preview of the Question </h1>

                        <div className="preview-content">
                            <h1 className='text-xl'>Title: {formData.title}</h1>
                            <div>
                                Description : 
                                <br></br>
                                {formData.description}
                            </div>
                            <div>
                                Answer :
                                <br></br>
                                {formData.answer}
                            </div>
                            <div>
                                Tags :
                                {"  "+ formData?.tags?.map((tag)=>tag+"  ")}
                            </div>

                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default CreateQuestion