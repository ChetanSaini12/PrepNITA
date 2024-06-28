import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import toast from 'react-hot-toast';
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";


export const ExperienceById = () => {


    const data = {
        "id": 1,
        "company": "Google",
        "role": "SDE",
        "location": "Banglore",
        "description": "Process:A recruiter reached out to me through mail and asked if I was interested in the Software Engineer (University Graduate) role. Phone Screen(September 2020):A straightforward LC medium qestion based on Trees and DFS. (LINK)I was well versed with Trees.Quickly came up with the optimal solution, explained the time and space complexities, and coded the proposed solution.Interviewer was satisfied with my solution and we finished this round in less than 30 minutes.Onsites(March 2021):There was a 6 month gap between my Phone Screen and Onsites.My recruiter explained that Onsites will be split into(3+ 2) interviews.They'll review the feedback after the first 3 DSA interviews and will schedule another 2 interviews (1 DSA, 1 Googlyness) only if the feedback is positive in the initial 3 DSA interviews.Round 1: LC Hard DP question. (LINK)I quickly came with up the recursive solution but struggled to convert the recursive solution into a DP based solution.This was my worst round.Round 2: LC Medium Sliding Window question. (LINK)Quickly explained the optimal solution, Time and space complexities and coded the solution.Interviewer was satisfied and came up with a follow up question that involved DP.I used memoization to solve the follow up question.Provided optimal solution and coded it.This was my best round.Round 3: A question based on the intersection of intervals. (I had forgotten that question.)In this round, I got into tunnel vision and just wasn't able to come up with a more efficient solution. I was livid with myself since I had solved numerous interval intersection problems on Leetcode.Result: Recruiter contacted me after 3 - 4 days and informed me that they won't be scheduling the next 2 rounds since I got mixed feedback in the first set of 3 DSA interviews. Recruiter didn't provide feedback specific to each round.My thoughts:Don't have any weak areas while interviewing with Google. I covered pretty much all topics in-depth, except for DP. DP was my slightly weaker area as compared to the other topics. As it turned out, 2 out of my 3 Onsite interviews had a DP question. All hail Murphy's Law:Leetcode's Google frequent questions list does help. A total of 3 questions I faced in the Google interviews are in the top 20 of LC's Google questions(sorted by frequency) Solved 465 LC problems - 166 Easy, 258 Medium, 41 HardI hope it will help you all.",
        "createdBy": 16,
        "creatorName": "Vikram Saini",
        "creatorUsername": null,
        "createdAt": "2024-06-23T07:50:19.906Z",
        "upvotes": 0,
        "downvotes": 0,
        "anonymous": false
    }


    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLoading, loggedIn, ready } = useSelector((state) => state.user);

    const [ERROR, setError] = useState(null);
    const [experienceData, setExperienceData] = useState(null);


    useEffect(() => {
        setExperienceData(data);
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
        console.log("error at fetch experienceById ", ERROR);
        toast.error(ERROR.message ? ERROR.message : "Something went wrong");
    }

    return (
        <div className='flex flex-col items-center mb-5 dark:mt-0.5 mx-1 gap-5 min-w-screen max-w-screen min-h-screen bg-gray-200 dark:bg-gray-800' >
            {/* <h1 className='text-3xl font-bold'>All Experiences</h1> */}
            {experienceData && (
                <div className=' flex gap-2 sm:gap-4 justify-start w-full '>
                    <div className='max-w-40 mt-3  border-red-400 px-1 sm:px-4 '>
                        <button className='flex justify-center items-center gap-1'>
                            <IoIosArrowBack />
                            <h2>Back</h2>
                        </button>
                        <div className=' mt-8 flex flex-col gap-2 '>
                            <button className='flex justify-center p-1 rounded-md hover:text-red-500 bg-gray-300 dark:bg-gray-700'>
                                <BiUpvote size={20} />
                            </button>
                            <h3 className='flex justify-center'>{experienceData.upvotes - experienceData.downvotes}</h3>
                            <button className='flex justify-center p-1 rounded-md hover:text-red-500 bg-gray-300 dark:bg-gray-700'>
                                <BiDownvote size={20} />
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col gap-3 w-full py-2 mb-5 pr-2'>
                        <div className='flex flex-wrap gap-1 justify-start items-start '>
                            <h1 className='text-lg sm:text-xl -mt-1 sm:mt-0 font-semibold'> {experienceData.company}</h1>
                            <h3 className='text-md sm:text-lg font-semibold'>| {experienceData.role}</h3>
                            {experienceData.location && (
                                <h3 className='text-md sm:text-lg font-semibold'>| {experienceData.location}</h3>
                            )}
                        </div>
                        <div className=' border-t border-gray-300 dark:border-gray-700'></div>
                        <div className='flex gap-2'>
                            <div>
                                <FaUserCircle size={30} />
                            </div>
                            {experienceData.anonymous && (
                                <h3 className=' flex items-center'>Anonymous User</h3>
                            )}
                            {!experienceData.anonymous && (
                                <button className='text-md sm:lg hover:underline'>
                                    {experienceData.creatorName}
                                </button>
                            )}
                        </div>
                        <div>
                            <div className='flex flex-wrap'>{experienceData.description}</div>
                        </div>
                    </div>
                </div >
            )}

        </div >
    )
}
