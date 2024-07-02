import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_EXPERIENCE } from '../../gqlOperatons/Experience/mutations';
import { Link, useNavigate } from 'react-router-dom';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import toast from 'react-hot-toast';
import { BiUpvote, BiDownvote, BiShare } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { LiaCommentSolid } from "react-icons/lia";
import { AiTwotoneLike } from "react-icons/ai";
import { PiHandsClappingLight } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa";
import moment from 'moment';

export const AllExperience = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, loggedIn, ready } = useSelector((state) => state.user);

    const [ERROR, setError] = useState(null);
    const [experienceData, setExperienceData] = useState(null);


    const [getAllExperience] = useMutation(GET_ALL_EXPERIENCE, {
        onError: (error) => {
            setError(error);
        },
    });


    useEffect(() => {
        if (!ready) return;
        const fetchAllExperience = async () => {
            dispatch(setLoading(true));
            try {
                const { data, errors } = await getAllExperience();
                if (errors) {
                    setError(errors);
                }
                else if (data) {
                    console.log("experience data ", data);
                    setExperienceData(data.getAllExperience);
                }
                else {
                    ; // do nothing
                }
            } catch (error) {
                setError(error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchAllExperience();
    }, [ready]);


    const truncatedDescription = (description, wordLimit) => {
        const words = description.split(' ');
        return words.slice(0, wordLimit).join(' ') + (words.length > wordLimit ? '...' : '');
    };

    if (isLoading || !ready) {
        return <Loader />;
    }
    if (ready && !loggedIn) {
        return navigate('/register');
    }
    if (ERROR) {
        console.log("error at fetch exp ", ERROR);
        toast.error(ERROR.message ? ERROR.message : "Something went wrong");
    }

    return (
        <div className='flex flex-col my-3 items-center py-0.5 gap-5 min-w-screen max-w-screen min-h-screen' >
            <h1 className='mx-1 w-full text-xl sm:text-3xl font-bold  text-center'>Explore Latest Companies Experiences</h1>
            <div className='flex flex-col w-full'>
                {ready && experienceData?.length === 0 && <h1 className='text-2xl font-semibold'>No experiences to show</h1>}
                {experienceData && experienceData?.map((exp, index) => {
                    return (
                        <div key={index} className="mx-5 sm:mx-20 flex flex-col bg-gray-200 dark:bg-gray-800 dark:opacity-75 rounded shadow-md py-4 px-4 md:px-6  hover:shadow-lg hover:bg-gray-300
                         dark:hover:bg-gray-700 transition duration-300  mb-2">
                            <Link to={`/experience/${exp.id}`}>
                                <div className='flex justify-between items-center gap-1'>
                                    <div>
                                        <div className='mb-1 flex gap-1 items-center'>
                                            <FaUserCircle />
                                            <h2 className='text-xs'>{(exp.anonymous || !exp.creatorUsername) ? "Anonymous user" : exp.creatorUsername}</h2>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <h1 className='text-md sm:text-lg font-semibold'>{exp.company} | {exp.role}</h1>
                                        </div>
                                        {/* EXP DESCRIPTION */}
                                        <div className='text-pretty text-xs text-slate-600 dark:text-slate-400 leading-relaxed' dangerouslySetInnerHTML={{ __html: truncatedDescription(exp.description, 20) }} />
                                        <div className=' mt-3 text-xs flex flex-wrap justify-start gap-2'>
                                            <h2>{moment(exp.createdAt).format('DD MMMM')}</h2>
                                            <div className='flex gap-1 items-center '>
                                                <PiHandsClappingLight size={13} />
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
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
