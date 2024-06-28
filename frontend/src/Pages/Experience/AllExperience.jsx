import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_EXPERIENCE } from '../../gqlOperatons/Experience/mutations';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import toast from 'react-hot-toast';
import { BiUpvote, BiDownvote } from "react-icons/bi";

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
                    "creatorUsername": null,
                    "createdAt": "2024-06-23T07:50:19.906Z",
                    "upvotes": 0,
                    "downvotes": 0,
                    "anonymous": false
                },
                {
                    "id": 2,
                    "company": "Google",
                    "role": "SDE",
                    "description": "Reject kr diya ;( hdehlfdh kfdjkdi idjdsjia amdsjdjdidjdj jd jdj dji dmdijd  jddjidd  djdjdj ",
                    "createdBy": 16,
                    "creatorName": null,
                    "creatorUsername": null,
                    "createdAt": "2024-06-23T07:59:50.948Z",
                    "upvotes": 0,
                    "downvotes": 0,
                    "anonymous": false
                },
                {
                    "id": 3,
                    "company": "Google",
                    "role": "SDE",
                    "description": "Reject kr diya ;( hdehlfdh kfdjkdi idjdsjia amdsjdjdidjdj jd jdj dji dmdijd  jddjidd  djdjdj ",
                    "createdBy": 16,
                    "creatorName": null,
                    "creatorUsername": null,
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
                    "anonymous": false
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
                    "anonymous": false
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



    if (isLoading || !ready) {
        return <Loader />;
    }
    if (ERROR) {
        console.log("error at fetch exp ", ERROR);
        toast.error(ERROR.message ? ERROR.message : "Something went wrong");
    }

    return (
        <div className='flex flex-col items-center mb-5 mx-1 gap-5 min-w-screen max-w-screen min-h-screen' >
            <h1 className='text-3xl font-bold'>All Experiences</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 text-wrap'>
                {ready && experienceData?.length === 0 && <h1 className='text-2xl font-semibold'>No experiences to show</h1>}
                {experienceData && experienceData?.map((exp, index) => {
                    return (
                        <div key={experienceData?.id} className="mx-2 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md py-3 px-5 md:px-6 md:py-4 hover:shadow-lg hover:bg-gray-300
                        dark:hover:bg-gray-700 transition duration-300 min-w-72 md:min-w-80  min-h-36">
                            <h1 className='text-lg sm:text-2xl font-semibold'>{exp.company}</h1>
                            <h2 className='text-md sm:text-lg '> Role: {exp.role}</h2>
                            <p className='text-base '>{exp.description}</p>
                            <div className=' mt-5 flex flex-wrap justify-start gap-5'>
                                <button className='hover:text-red-500'>
                                    <BiUpvote size={20} />
                                </button>
                                <h3>{exp.upvotes - exp.downvotes}</h3>
                                <button className='hover:text-red-500'>
                                    <BiDownvote size={20}  />
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
