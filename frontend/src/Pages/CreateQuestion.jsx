import { useMutation } from '@apollo/client';
import { Button, TextInput, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react';
import { CREATE_QUESTION } from '../gqlOperatons/Question/mutations';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';



const CreateQuestion = () => {
    const [formData, setFormData] = useState({});
    const [refresh, setRefresh] = useState(false);
    const theme = useSelector((state) => state.theme);

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


    // return (
      //   <div className={`w-screen h-screen flex flex-col items-center bg-${theme.theme === 'light' ? 'white' : 'primary-color'} text-${theme.theme === 'light' ? 'black' : 'white'} mb-10`}>
      //     <div className="w-4/5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg p-6 rounded-lg mt-10">
      //       <h1 className="text-3xl mb-4 font-bold">Create Question</h1>
      //       <form id='questionForm' onSubmit={handleSubmit} className="question_details_area">
      //         <div className="question_area_section">
      //         <h1 className="text-2xl font-bold">Description :</h1>
      //           <Textarea
      //             required
      //             placeholder='Description of the question'
      //             id="description"
      //             onChange={handleChange}
      //             className={`w-full p-2 mt-1 rounded-md focus:outline-none focus:ring-${theme.theme === 'light' ? 'indigo' : 'pink'} focus:border-${theme.theme === 'light' ? 'indigo' : 'pink'} border border-gray-300`}
      //           />
      //         </div>
      //         <div className="question_area_section">
      //           <h1 className="text-2xl font-bold">Answer : </h1>
      //           <Textarea
      //             required
      //             placeholder='Answer of the question'
      //             id="answer"
      //             onChange={handleChange}
      //             className={`w-full p-2 mt-1 rounded-md focus:outline-none focus:ring-${theme.theme === 'light' ? 'indigo' : 'pink'} focus:border-${theme.theme === 'light' ? 'indigo' : 'pink'} border border-gray-300 `}
      //           />
      //         </div>
              
      //         <div className="question_area_section mb-8">
      //           <h1 className="text-2xl font-bold">Tags : </h1>
      //           <TextInput
      //             placeholder='os,dbms,linus,java'
      //             id="tags"
      //             onChange={handleChange}
      //             className={`w-full p-0 mt-1 rounded-md focus:outline-none focus:ring-${theme.theme === 'light' ? 'indigo' : 'pink'} focus:border-${theme.theme === 'light' ? 'indigo' : 'pink'} border ${theme.theme === 'light' ? 'border-transparent' : 'border-transparent'} `}
      //           />
      //         </div>
      //         <button type="submit" class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:text-white dark:border-gray-800 dark:hover:bg-gray-600 dark:hover:border-gray-600 dark:focus:ring-gray-700">
      //           Create
      //           </button>
      //       </form>
           
      //     </div>
      //     <div className="mt-5 w-4/5 bg-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  shadow-lg p-6 rounded-lg">
      //       <h1 className='text-3xl mb-4 font-bold'>Preview of the Question</h1>
      //       <div className="preview-content">
      //         <h1 className='text-xl font-bold mb-2'>Title: {formData.title}</h1>
      //         <div className="mb-2">
      //         <span className="font-bold">Description :</span>
      //           <br />
      //           {formData.description}
      //         </div>
      //         <div className="mb-2">
      //         <span className="font-bold">Answer :</span>
      //           <br />
      //           {formData.answer}
      //         </div>
      //         <div className="mb-2">
      //         <span className="font-bold">Tags :</span>
      //           {"  " + formData?.tags?.map((tag) => tag + "  ")}
      //         </div>
      //       </div>
      //     </div>
          
          
      //   </div>
        
      // )
    return (
        <>
            <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <h1 className='text-center text-3xl my-7 font-semibold'>
                Create a Question</h1>
                <div className="question_container">
                    <form id='questionForm' onSubmit={handleSubmit} className='flex flex-col gap-4 border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3 '>

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

export default CreateQuestion;