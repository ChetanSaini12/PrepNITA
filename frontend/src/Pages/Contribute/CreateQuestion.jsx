import { useMutation } from '@apollo/client';
import { Button, TextInput, Textarea } from 'flowbite-react'
import React, { useEffect, useState } from 'react';
import { CREATE_QUESTION } from '../../gqlOperatons/Question/mutations';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader.jsx';
import { useNavigate } from 'react-router-dom';
import TextEditor from '../../Components/sampleTextEditor.jsx';



const CreateQuestion = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loggedIn, isLoading } = useSelector((state) => state.user);
    const theme = useSelector((state) => state.theme);

    // const [formData, setFormData] = useState({});
    const [refresh, setRefresh] = useState(false);
    const [ERROR, setError] = useState(null);
    const [ready, setReady] = useState(false);
    const [description, setDescription] = useState("HEllo");
    const [answer, setAnswer] = useState("Because light attracts bugs!");
    const [tags, setTags] = useState(["DarkMode", "Bugs"]);
    const [textEditor, setTextEditor] = useState(0);

    dispatch(setLoading(false));

    useEffect(() => {
        console.log("state",loggedIn);

        setReady(true);
    },[]);

    // const handleChange = ((e) => {
    //     if (e.target.id === "tags") {
    //         setFormData({
    //             ...formData,
    //             tags: e.target.value.split(',').map(str => str.trim())
    //         });
    //     }
    //     else
    //         setFormData({
    //             ...formData,
    //             [e.target.id]: e.target.value
    //         });
    // });

    const [createQuestion] = useMutation(CREATE_QUESTION, {
        onError: (error) => {
            console.log("mutation error at create question ", error);
            return setError(error);
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        // console.log("Form Data : ", formData);
        try {
            const { data, errors } = await createQuestion({
                variables: {
                    Question: {
                        description,
                        answer,
                        tags,
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
                setDescription();
                setAnswer();
                setTags();
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
            <div className='p-3 mx-auto min-h-screen mt-2 mb-4'>
                <h1 className='text-center text-2xl md:text-2xl my-4 font-semibold'>
                    Create a Question</h1>
                <div className="question_container">
                    <div className='flex flex-col gap-4 border border-teal-500 rounded-tl-3xl rounded-br-3xl p-3 '>
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
                            <div className='flex flex-row w-full'>
                            <h1 className="">Question : </h1>
                                { textEditor == 0 && <div><button onClick={() => setTextEditor(1)} >(Open Editor)</button></div>}
                                { textEditor == 1 && <div><button onClick={() => setTextEditor(0)} >(Close Editor)</button></div>}
                            </div>
                            { textEditor == 1 && <TextEditor data={description} setData={setDescription}></TextEditor>}
                            { textEditor != 1 && (<div className='bg-slate-800' dangerouslySetInnerHTML={{ __html: description }} />)}
                        </div>
                        <div id="question_area_section">
                            <div className='flex flex-row w-full'>
                            <h1 className="">Answer : </h1>
                                { textEditor == 0 && <div><button onClick={() => setTextEditor(2)} >(Open Editor)</button></div>}
                                { textEditor == 2 && <div><button onClick={() => setTextEditor(0)} >(Close Editor)</button></div>}
                            </div>
                            { textEditor == 2 && <TextEditor data={answer} setData={setAnswer}></TextEditor>}
                            { textEditor != 2 && (<div className='bg-slate-800' dangerouslySetInnerHTML={{ __html: answer }} />)}
                        </div>
                        <div id="question_area_section">
                            <div className='flex flex-row w-full'>
                            <h1 className="">Tags : </h1>
                                { textEditor == 0 && <div><button onClick={() => setTextEditor(3)} >(Open Editor)</button></div>}
                                { textEditor == 3 && <div><button onClick={() => setTextEditor(0)} >(Close Editor)</button></div>}
                            </div>
                            { textEditor == 3 && <TextEditor data={tags} setData={setTags}></TextEditor>}
                            { textEditor != 3 && (<div className='bg-slate-800' dangerouslySetInnerHTML={{ __html: tags }} />)}
                        </div>
                        {/* <div id="question_area_section">
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
                        </div> */}
                        <Button onClick={handleSubmit} className='my-5'>Create</Button>
                    </div>

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