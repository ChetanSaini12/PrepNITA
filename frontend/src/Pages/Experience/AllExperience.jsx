import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_EXPERIENCE } from '../../gqlOperatons/Experience/mutations';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import toast from 'react-hot-toast';
import { BiUpvote, BiDownvote, BiShare } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { LiaCommentSolid } from "react-icons/lia";
import { AiTwotoneLike } from "react-icons/ai";
import moment from 'moment';

export const AllExperience = () => {


    const data = {
        "data": {
            "getAllExperience": [
                {
                    "id": 1,
                    "company": "Google",
                    "role": "SDE",
                    "description": "Reject kr diya ;( hdehlfdh kfdjkdi idjdsjia amdsjdjdidjdj jd jdj dji dmdijd  jddjidd  djdjdj ",
                    "createdBy": 16,
                    "creatorName": null,
                    "creatorUsername": "Chandan_dey5378",
                    "createdAt": "2024-06-23T07:50:19.906Z",
                    "upvotes": 0,
                    "downvotes": 0,
                    "anonymous": false,
                    "comments": [
                        { "id": 1 },
                        { "id": 2 },
                        { "id": 2 },
                    ],
                },
                {
                    "id": 2,
                    "company": "Google",
                    "role": "SDE",
                    "description": "Reject kr diya ;( hdehlfdh kfdjkdi idjdsjia amdsjdjdidjdj jd jdj dji dmdijd  jddjidd  djdjdj ",
                    "createdBy": 16,
                    "creatorName": null,
                    "creatorUsername": "Vikram_saini",
                    "createdAt": "2024-06-23T07:59:50.948Z",
                    "upvotes": 0,
                    "downvotes": 0,
                    "anonymous": false,
                    "comments": [
                        { "id": 1 },
                        { "id": 2 },
                        { "id": 2 },
                        { "id": 2 },
                    ],
                },
                {
                    "id": 3,
                    "company": "Google",
                    "role": "SDE",
                    "description": "Reject kr diya ;( hdehlfdh kfdjkdi idjdsjia amdsjdjdidjdj jd jdj dji dmdijd  jddjidd  djdjdj ",
                    "createdBy": 16,
                    "creatorName": null,
                    "creatorUsername": "Chetan_saini",
                    "createdAt": "2024-06-23T08:00:34.614Z",
                    "upvotes": 0,
                    "downvotes": 0,
                    "anonymous": false
                },
                {
                    "id": 8,
                    "company": "Amazon",
                    "role": "Application Engineer",
                    "description": "Reject kr diya ;( hdehlfdh kfdjkdi idjdsjia amdsjdjdidjdj jd jdj dji dmdijd  jddjidd  djdjdj ",
                    "createdBy": 1,
                    "creatorName": "Chandan Dey",
                    "creatorUsername": "chandan_1357",
                    "createdAt": "2024-06-26T00:05:10.285Z",
                    "upvotes": 0,
                    "downvotes": 0,
                    "anonymous": false,
                    "comments": [
                        { "id": 1 },
                        { "id": 2 },
                        { "id": 2 },
                        { "id": 2 },
                        { "id": 2 },
                    ],
                },
                {
                    "id": 5,
                    "company": "Google",
                    "role": "CEO",
                    "description": "Reject kr diya ;( hdehlfdh kfdjkdi idjdsjia amdsjdjdidjdj jd jdj dji dmdijd  jddjidd  djdjdj ",
                    "createdBy": 1,
                    "creatorName": "Chandan Dey",
                    "creatorUsername": "chandan_1357",
                    "createdAt": "2024-06-23T08:20:48.475Z",
                    "upvotes": 1,
                    "downvotes": 1,
                    "anonymous": true
                },
                {
                    "id": 6,
                    "company": "Cisco",
                    "role": "Cloud Engineer",
                    "description": "Reject kr diya ;( hdehlfdh kfdjkdi idjdsjia amdsjdjdidjdj jd jdj dji dmdijd  jddjidd  djdjdj ",
                    "createdBy": 1,
                    "creatorName": "Chandan Dey",
                    "creatorUsername": "chandan_1357",
                    "createdAt": "2024-06-25T23:45:07.606Z",
                    "upvotes": 0,
                    "downvotes": 0,
                    "anonymous": false
                },
                {
                    "id": 7,
                    "company": "Cisco",
                    "role": "Application Engineer",
                    "description": "Reject kr diya ;( hdehlfdh kfdjkdi idjdsjia amdsjdjdidjdj jd jdj dji dmdijd  jddjidd  djdjdj ",
                    "createdBy": 1,
                    "creatorName": "Chandan Dey",
                    "creatorUsername": "chandan_1357",
                    "createdAt": "2024-06-26T00:04:21.146Z",
                    "upvotes": 0,
                    "downvotes": 0,
                    "anonymous": false,
                    "comments": [
                        { "id": 1 },
                        { "id": 2 },
                        { "id": 2 },
                    ],
                }
            ]
        }
    }


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, loggedIn, ready } = useSelector((state) => state.user);

    const [ERROR, setError] = useState(null);
    const [experienceData, setExperienceData] = useState(null);


    const [getAllExperience] = useMutation(GET_ALL_EXPERIENCE, {
        onError: (error) => {
            return setError(error);
        },
    });

    useEffect(() => {
        setExperienceData(data.data.getAllExperience);
        dispatch(setLoading(false));
    }, [ready]);


    // useEffect(() => {
    //     const fetchAllExperience = async () => {
    //         dispatch(setLoading(true));
    //         try {
    //             const { data, errors } = await getAllExperience();
    //             if (errors) {
    //                 return setError(errors);
    //             }
    //             else if (data) {
    //                 console.log("experience data ", data);
    //                 setExperienceData(data.getAllExperience);
    //             }
    //             else{
    //                 ; // do nothing
    //             }
    //         } catch (error) {
    //             return setError(error);
    //         } finally {
    //             dispatch(setLoading(false));
    //         }
    //     };

    //     fetchAllExperience();
    // }, [ready]);


    const truncatedDescription = (description, wordLimit) => {
        const words = description.split(' ');
        return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
    };

    if (isLoading || !ready) {
        return <Loader />;
    }
    if (ERROR) {
        console.log("error at fetch exp ", ERROR);
        toast.error(ERROR.message ? ERROR.message : "Something went wrong");
    }

    return (
        <div className='flex flex-col items-center py-0.5 gap-5 min-w-screen max-w-screen min-h-screen' >
            {/* <h1 className='text-3xl font-bold'>All Experiences</h1> */}
            <div className='flex flex-col w-full'>
                {ready && experienceData?.length === 0 && <h1 className='text-2xl font-semibold'>No experiences to show</h1>}
                {experienceData && experienceData?.map((exp, index) => {
                    return (
                        <div key={index} className=" flex flex-col bg-gray-200 dark:bg-gray-800 dark:opacity-75 rounded shadow-md py-4 px-2 md:px-6  hover:shadow-lg hover:bg-gray-300
                         dark:hover:bg-gray-700 transition duration-300  mb-2">
                            <div className='flex justify-between items-center gap-1'>
                                <div>
                                    <div className='mb-1 flex gap-1 items-center'>
                                        <FaUserCircle />
                                        <h2 className='text-xs'>{exp.anonymous ? "Anonymous user" : exp.creatorUsername}</h2>
                                    </div>
                                    <div className='flex gap-1 items-center'>
                                        <h1 className='text-md sm:text-lg font-semibold'>{exp.company}</h1>
                                        <h2 className='font-semibold'> | {exp.role}</h2>
                                    </div>
                                    <div className='text-pretty leading-relaxed'>
                                        {truncatedDescription(exp.description, 10)}
                                    </div>
                                    <div className=' mt-3 text-xs flex flex-wrap justify-start gap-2'>
                                        <h2>{moment(exp.createdAt).format('DD MMMM')}</h2>
                                        <div className='flex gap-1 items-center '>
                                            <AiTwotoneLike size={13} />
                                            <h3 className=''>{exp.upvotes - exp.downvotes}</h3>
                                        </div>
                                        <div className='flex gap-1 items-center '>
                                            <LiaCommentSolid />
                                            <h3 className=''>{exp.comments?.length ? exp.comments.length : "0"}</h3>
                                        </div>
                                    </div>
                                </div>
                                <img src="https://t4.ftcdn.net/jpg/02/84/25/75/240_F_284257577_cSLO6IMF6Zcm9EQwdYSONsttvGgRzv8R.jpg" alt="Company image"
                                    className='h-14 sm:h-24 object-cover rounded sm:mr-5'
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
