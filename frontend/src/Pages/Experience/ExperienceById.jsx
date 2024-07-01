import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { TextInput, Textarea } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import toast from 'react-hot-toast';
import { BiUpvote, BiDownvote, BiShare } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosHeart } from "react-icons/io";
import { LiaCommentSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment";
import { ADD_COMMENT_EXP, ADD_REPLY_TO_EXP_COMMENT, DELETE_EXP_COMMENT, DELETE_EXP_REPLY, DOWNVOTE_EXPERIENCE, GET_EXPERIENCE_BY_ID, LIKE_EXP_COMMENT, LIKE_EXP_COMMENT_REPLY, UPVOTE_EXPERIENCE } from '../../gqlOperatons/Experience/mutations';
import { Loader2 } from '../../Components/Loader2';



export const ExperienceById = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const { isLoading, loggedIn, ready, id: userId } = useSelector((state) => state.user);

    const [ERROR, setError] = useState(null);
    const [experienceData, setExperienceData] = useState(null);
    const [showReply, setShowReply] = useState({});
    const [userWantToReply, setUserWantToReply] = useState({});
    const [experienceId, setExperienceId] = useState(parseInt(params.id));
    const [smallLoading, setSmallLoading] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(0);

    //MUTATIONS
    const [getExperienceData] = useMutation(GET_EXPERIENCE_BY_ID);
    const [upVoteExp] = useMutation(UPVOTE_EXPERIENCE);
    const [downVoteExp] = useMutation(DOWNVOTE_EXPERIENCE);
    const [addComment] = useMutation(ADD_COMMENT_EXP);
    const [deleteComment] = useMutation(DELETE_EXP_COMMENT);
    const [deleteReply] = useMutation(DELETE_EXP_REPLY);
    const [addReply] = useMutation(ADD_REPLY_TO_EXP_COMMENT);
    const [likeComment] = useMutation(LIKE_EXP_COMMENT);
    const [likeCommentReply] = useMutation(LIKE_EXP_COMMENT_REPLY);


    useEffect(() => {
        if (isNaN(params.id)) {
            navigate('/notFound');
            return;
        }
        setExperienceId(parseInt(params.id));

    }, [ready]);


    useEffect(() => {
        if (!ready) return;
        const fetchExperience = async () => {
            dispatch(setLoading(true));
            try {
                const { data } = await getExperienceData({
                    variables: {
                        experienceId: experienceId,
                    }
                });
                if (data) {
                    console.log("experience by id  data ", data);
                    setExperienceData(data.getExperienceById);
                }
            } catch (error) {
                setError(error);
            } finally {
                dispatch(setLoading(false));
            }
        };

        fetchExperience();
    }, [ready, experienceId]);

    const handleShowReply = (id) => {
        // console.log("comment id ", id);
        setShowReply((prev) => (
            {
                ...prev,
                [id]: !prev[id],
            }
        ))
    };
    const handleUserWantToReply = (id) => {
        setUserWantToReply((prev) => (
            {
                ...prev,
                [id]: true,
            }
        ))
    };
    const handleCancelReplyInputBox = (setComment, id) => {
        setUserWantToReply((prev) => (
            {
                ...prev,
                [id]: false,
            }
        ));
        setComment("");

    };

    const handleAddCommentOrReplyFunction = async (comment, expId, expCommentId) => {
        expId = parseInt(expId);
        expCommentId = parseInt(expCommentId);
        const trimmedComment = comment.trim();
        if (trimmedComment === '') {
            console.error("Comment is empty after trimming");
            return;
        }

        const isComment = (expId !== 0);
        const variableName = isComment ? "Comment" : "Reply";
        const idVariableName = isComment ? "experienceId" : "expcommentId";
        const id = isComment ? expId : expCommentId;

        setSmallLoading(true);
        if (isComment) setLoadingLocation(2);
        else setLoadingLocation(4);
        try {
            const variables = {
                [variableName]: {
                    description: trimmedComment,
                    [idVariableName]: id,
                }
            };
            // console.log("Constructed variables:", expId, expCommentId, variables);
            const { data } = isComment ? await addComment({
                variables: variables,
            }) : await addReply({
                variables: variables,
            });

            if (data) {
                console.log("Comment/Reply added successfully", data);
                if (isComment) {
                    let prevComments = experienceData.comments;
                    prevComments?.push(data.addCommentExp);
                    setExperienceData({ ...experienceData, comments: prevComments });
                }
                else {
                    let prevComments = experienceData.comments;
                    let commentIndex = prevComments.findIndex((comment) => comment.id === data.addReplyToExpComment.expcommentId);
                    console.log("commentIndex", commentIndex);
                    console.log("coment", prevComments[commentIndex]);
                    prevComments[commentIndex]?.reply?.push(data.addReplyToExpComment);
                    setExperienceData({ ...experienceData, comments: prevComments });
                }

            } else {
                console.error("No data returned from mutation");
            }
        } catch (error) {
            console.error("Error adding comment", error);
            setError(error);
        } finally {
            if (!isComment) {
                setUserWantToReply((prev) => ({
                    ...prev,
                    [expCommentId]: false,

                }));
            }
            setSmallLoading(false);
            setLoadingLocation(0); // to remove loading indication
        }
    };

    const handleDeleteComment = async (commentId) => {
        setSmallLoading(true);
        setLoadingLocation(5);
        try {
            const { data } = await deleteComment({
                variables: {
                    commentId: commentId,
                }
            });
            if (data) {
                console.log("deleted comment successfullly", data);
                let prevComments = experienceData.comments;
                let commentIndex = prevComments.findIndex((comment) => comment.id === commentId);
                prevComments.splice(commentIndex, 1);
                setExperienceData({ ...experienceData, comments: prevComments });
            }
        } catch (error) {
            setError(error);
        } finally {
            setSmallLoading(false);
            setLoadingLocation(0);
        }
    };
    const handleDeleteReply = async (commentId, replyId) => {
        setSmallLoading(true);
        setLoadingLocation(5);
        try {
            const { data } = await deleteReply({
                variables: {
                    replyId: replyId,
                }
            });
            if (data) {
                console.log("deleted reply successfullly", data);
                let prevComments = experienceData.comments;
                let commentIndex = prevComments.findIndex((comment) => comment.id === commentId);
                let replyIndex = prevComments[commentIndex].reply.findIndex((reply) => reply.id === replyId);
                prevComments[commentIndex].reply.splice(replyIndex, 1);
                setExperienceData({ ...experienceData, comments: prevComments });
            }
        } catch (error) {
            setError(error);
        } finally {
            setSmallLoading(false);
            setLoadingLocation(0);
        }
    };

    const handleUpVoteExp = async (expId) => {
        setSmallLoading(true);
        setLoadingLocation(1);
        try {
            const { data } = await upVoteExp({
                variables: {
                    id: expId,
                }
            });
            if (data) {
                console.log("upvoted exp successfullly", data);

                setExperienceData({
                    ...experienceData,
                    upvotes: data.upvoteExperience.upvotes,
                    downvotes: data.upvoteExperience.downvotes,
                    isLiked: data.upvoteExperience.isLiked,
                    isDisliked: data.upvoteExperience.isDisliked
                });
                // experienceData.upvotes = data.upvoteExperience.upvotes;
            }
        } catch (error) {
            setError(error);
        } finally {
            setSmallLoading(false);
            setLoadingLocation(0);
        }
    };

    const handleDownVoteExp = async (expId) => {
        setSmallLoading(true);
        setLoadingLocation(1);
        try {
            const { data } = await downVoteExp({
                variables: {
                    id: expId,
                }
            });
            if (data) {
                console.log("downvoted exp successfullly", data);
                setExperienceData({
                    ...experienceData,
                    upvotes: data.downvoteExperience.upvotes,
                    downvotes: data.downvoteExperience.downvotes,
                    isLiked: data.downvoteExperience.isLiked,
                    isDisliked: data.downvoteExperience.isDisliked
                });
                // experienceData.downvotes = data.downvoteExperience.downvotes;
            }
        } catch (error) {
            setError(error);
        } finally {
            setSmallLoading(false);
            setLoadingLocation(0);
        }
    };

    const handleLikeComment = async (commentId) => {
        console.log("call hua hai ", commentId);
        commentId = parseInt(commentId);
        setSmallLoading(true);
        setLoadingLocation(3);
        try {
            const { data } = await likeComment({
                variables: {
                    commentId: commentId,
                }
            });
            if (data) {
                console.log("liked comment successfullly", data);
                let prevComments = experienceData.comments;
                let commentIndex = prevComments.findIndex((comment) => comment.id === commentId);
                prevComments[commentIndex].likes = data.likeExpComment.likes;
                prevComments[commentIndex].isLiked = data.likeExpComment.isLiked;
                prevComments[commentIndex].isDisliked = data.likeExpComment.isDisliked;
                setExperienceData({ ...experienceData, comments: prevComments });
            }
        } catch (error) {
            setError(error);
        } finally {
            setSmallLoading(false);
            setLoadingLocation(0);
        }
    };
    const handleLikeCommentReply = async (replyId, commentId) => {
        replyId = parseInt(replyId);
        commentId = parseInt(commentId);
        setSmallLoading(true);
        setLoadingLocation(5);
        try {
            const { data } = await likeCommentReply({
                variables: {
                    replyId: replyId,
                }
            });
            if (data) {
                console.log("liked comment reply successfullly", data);
                let prevComments = experienceData.comments;
                let commentIndex = prevComments.findIndex((comment) => comment.id === commentId);
                let replyIndex = prevComments[commentIndex].reply.findIndex((reply) => reply.id === replyId);
                prevComments[commentIndex].reply[replyIndex].likes = data.likeExpCommentReply.likes;
                prevComments[commentIndex].reply[replyIndex].isLiked = data.likeExpCommentReply.isLiked;
                prevComments[commentIndex].reply[replyIndex].isDisliked = data.likeExpCommentReply.isDisliked;
                setExperienceData({ ...experienceData, comments: prevComments });
            }
        } catch (error) {
            setError(error);
        } finally {
            setSmallLoading(false);
            setLoadingLocation(0);
        }
    };


    const calculateReadingTime = (text) => {
        if (typeof text !== 'string') {
            throw new Error('Input must be a string');
        }

        const wordsPerMinute = 200;
        const words = text?.split(/\s+/).length; // Split text by spaces to get word count
        const totalMinutes = words / wordsPerMinute;
        const minutes = Math.floor(totalMinutes);
        const seconds = Math.round((totalMinutes - minutes) * 60);

        // Round to the nearest minute
        const roundedMinutes = seconds <= 30 ? minutes : minutes + 1;

        return `${roundedMinutes} min read`;
    };

    const formatDate = (dateString) => {
        return moment(dateString).format('DD MMMM YYYY');
    };
    const likedClass = "text-green-500";
    const disLikedClass = "text-red-500";



    if (isLoading || !ready) {
        return <Loader />;
    }
    if (ready && !loggedIn) {
        return navigate('/register');
    }
    if (ERROR) {
        console.log("error at fetch experienceById ", ERROR);
        toast.error(ERROR.message ? ERROR.message : "Something went wrong");
        setTimeout(() => {
            setError(null);
        }, 2000);
    }

    return (
        <div className={`${smallLoading === true ? "screenInActive" : ""} flex flex-col items-center mb-5 dark:mt-0.5 mx-1 gap-5 min-w-screen max-w-screen min-h-screen bg-gray-200 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75`} >
            {experienceData && (
                <div className='w-full flex flex-col gap-5'>
                    {/* //Experience details */}
                    <div className=' flex flex-col sm:flex-row gap-2 sm:gap-2 justify-start w-full px-2 sm:px-0'>
                        {/* //left part upVote and down VOte  */}
                        <div className='sm:max-w-40 mt-3  sm:px-4  flex sm:flex-col gap-3 sm:gap-0 justify-between sm:justify-start items-center sm:items-start '>
                            <Link to={'/experience'} className='flex justify-center items-center gap-1 mr-2 sm:mr-0 hover:text-red-500'>
                                <IoIosArrowBack />
                                <h2 className='border-r border-gray-300 pr-1 '>Back</h2>
                            </Link>
                            {smallLoading && loadingLocation === 1 && <Loader2 />}
                            {loadingLocation !== 1 && (
                                <div className=' sm:mt-8 flex sm:flex-col gap-2 items-center '>
                                    <button className={`${experienceData.isLiked ? likedClass : ""} flex justify-center p-1 rounded-md hover:text-red-500 bg-gray-300 dark:bg-gray-700`}
                                        onClick={() => handleUpVoteExp(experienceData.id)}
                                    >

                                        <BiUpvote size={20} />
                                    </button>
                                    <h3 className='flex justify-center'>{experienceData.upvotes - experienceData.downvotes}</h3>
                                    <button className={`${experienceData.isDisliked ? disLikedClass : ""} flex justify-center p-1 rounded-md hover:text-red-500 bg-gray-300 dark:bg-gray-700`}
                                        onClick={() => handleDownVoteExp(experienceData.id)}
                                    >
                                        <BiDownvote size={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* // experience details */}
                        <div className='flex flex-col gap-3 w-full py-2 mb-5 pr-2'>
                            <div className='flex flex-wrap gap-1 justify-start items-start '>
                                <h1 className='text-lg sm:text-xl -mt-1 sm:mt-0 font-semibold'> {experienceData.company}</h1>
                                <h3 className='text-md sm:text-lg font-semibold'>| {experienceData.role}</h3>
                                {experienceData.location && (
                                    <h3 className='text-md sm:text-lg font-semibold'>| {experienceData.location}</h3>
                                )}
                            </div>
                            <div className=' border-t border-gray-300 dark:border-gray-700'></div>
                            {/* //User details */}
                            <div className='flex flex-row justify-between items-center'>
                                <div className='flex gap-2'>
                                    <div>
                                        <FaUserCircle size={30} />
                                    </div>
                                    {experienceData.anonymous && (
                                        <h3 className=' flex items-center'>Anonymous User</h3>
                                    )}

                                    {!experienceData.anonymous && (
                                        <Link to={`/profile/${experienceData.creatorUsername}`} className='text-md sm:lg hover:underline'>
                                            {experienceData.creatorName}
                                        </Link>
                                    )}
                                </div>
                                <div className='flex gap-2 text-slate-400'>
                                    <div>
                                        {calculateReadingTime(experienceData.description)} : {formatDate(experienceData.createdAt)}
                                    </div>
                                </div>
                            </div>
                            {/* //Description */}
                            <div className=''>
                                <div className=' flex flex-wrap text-pretty leading-relaxed sm:leading-loose' dangerouslySetInnerHTML={{ __html: experienceData.description }} />
                            </div>

                        </div>

                    </div >
                    {/* // COMMENTS PART */}

                    <div className='flex flex-col gap-5 my-5 '>
                        <div className='w-full py-3 pr-2 pl-4 flex gap-1 items-center bg-gray-300 dark:bg-gray-700 '>
                            <LiaCommentSolid size={15} />
                            <h2 className=' pl-1'>Comments</h2>
                            <h2>{experienceData.comments ? experienceData.comments.length : ""}</h2>
                        </div>

                        {/* {COMMENT INPUT BOX } */}
                        {smallLoading && loadingLocation === 2 && <Loader2 />}
                        {loadingLocation !== 2 && (
                            <InputBoxForComment
                                handleCancleFunction={handleCancelReplyInputBox}
                                handleSubmitFunction={handleAddCommentOrReplyFunction}
                                expId={experienceData.id}
                            />
                        )}
                        {/* USER COMMENTS */}
                        {experienceData.comments.map((comment, index) => (
                            <div key={index} className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-1 pl-4'>
                                    <div className='flex gap-3'>
                                        <div>
                                            <FaUserCircle size={20} />
                                        </div>
                                        <div className='flex flex-col gap-1'>
                                            <div className='text-xs flex gap-2'>
                                                <Link to={`/profile/${comment.commentorUserName}`} >{comment.commentorUserName}</Link>
                                            </div>
                                        </div>
                                    </div>
                                    {/* COMMENT descreption  */}
                                    <div className='pl-9  text-pretty'>
                                        {comment.description}
                                    </div>

                                    {/* // COMMENT FUNCTIONS (LIKE , REPLY , DELETE )    */}
                                    <div className='text-xs  pl-10 py-1 flex gap-5 items-center justify-start'>
                                        {smallLoading && loadingLocation === 3 && <Loader2 />}

                                        {/* LIKE COMMENT */}
                                        {loadingLocation !== 3 && comment.isLiked && (
                                            <div className='flex items-center gap-1'>
                                                <button className=' hover:text-gray-300' onClick={() => handleLikeComment(comment.id)}>
                                                    <IoIosHeart size={13} color='red' />
                                                </button>
                                                <h2>{comment.likes}</h2>
                                            </div>
                                        )}
                                        {loadingLocation !== 3 && !comment.isLiked && (
                                            <div className='flex items-center gap-1'>
                                                <button className='hover:text-red-500' onClick={() => handleLikeComment(comment.id)}>
                                                    <CiHeart size={13} />
                                                </button>
                                                <h2>
                                                    {comment.likes}
                                                </h2>
                                            </div>
                                        )}

                                        {/* //SHOW REPLY */}
                                        {comment.reply?.length > 0 && (
                                            <div>
                                                <button className='flex gap-1 items-center hover:text-red-500'
                                                    onClick={() => handleShowReply(comment.id)}
                                                >
                                                    <LiaCommentSolid size={13} className='' />
                                                    <h2>{!showReply[comment.id] ? `Show ${comment.reply?.length} reply` : "Hide reply"}</h2>
                                                </button>

                                            </div>
                                        )}

                                        {/* //DELETE COMMENT */}
                                        {comment.commentorId === userId && (
                                            <div>
                                                <button className='flex items-center gap-0.5 hover:text-red-500'
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                >
                                                    <MdDeleteOutline size={13} />
                                                    <h2>Delete</h2>
                                                </button>
                                            </div>

                                        )}
                                        {/* //REPLY TO A COMMENT BUTTON */}

                                        <div>
                                            <button className='flex items-center gap-1 hover:text-red-500'
                                                onClick={() => handleUserWantToReply(comment.id)}
                                            >
                                                <BiShare size={13} />
                                                <h2>Reply</h2>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* REPLY INPUT BOX */}
                                {userWantToReply[comment.id] && (
                                    <InputBoxForComment
                                        ml={12}
                                        mr={5}
                                        expCommentId={comment.id}

                                        handleCancleFunction={handleCancelReplyInputBox}
                                        handleSubmitFunction={handleAddCommentOrReplyFunction}
                                    />
                                )}
                                {smallLoading && loadingLocation === 4 && <Loader2 />}

                                {/* //COMMENT REPLY SECTION  */}
                                {showReply[comment.id] && (
                                    <div className='flex gap-3 pl-12 pt-1 pb-2'>
                                        <div className='flex flex-col gap-1'>
                                            {comment.reply.map((reply, index) => (
                                                <div key={index} className='flex flex-col gap-1'>
                                                    {/* REPLIER USER DETAILS */}
                                                    <div className='flex items-center gap-2'>
                                                        <FaUserCircle size={20} />
                                                        <h3 className='text-xs'> {reply.replierUserName}</h3>
                                                    </div>
                                                    {/* REPLY DESCRIPTION */}
                                                    <div className='ml-8 flex flex-col gap-1'>
                                                        <div className='flex flex-wrap'>{reply.description}</div>
                                                    </div>
                                                    {smallLoading && loadingLocation === 5 && <Loader2 />}
                                                    {/* REPLY FUNCTIONS (LIKE DELETE ) */}
                                                    {loadingLocation !== 5 && (
                                                        <div className='ml-9 -mt-0.5 text-xs flex gap-2 justify-start items-center'>
                                                            {reply.isLiked && (
                                                                <button className=' hover:text-gray-300' onClick={() => handleLikeCommentReply(reply.id, comment.id)}>
                                                                    <IoIosHeart size={13} color='red' />
                                                                </button>
                                                            )}
                                                            {reply.isLiked === false && (
                                                                <button className='hover:text-red-500' onClick={() => handleLikeCommentReply(reply.id, comment.id)}>
                                                                    <CiHeart size={13} />
                                                                </button>
                                                            )}
                                                            <h2 className='-ml-0.5 -mt-0.5'>{reply.likes}</h2>
                                                            {reply.replierId === userId && (
                                                                <div>
                                                                    <button className='flex items-center gap-0.5 hover:text-red-500'
                                                                        onClick={() => handleDeleteReply(comment.id, reply.id)}
                                                                    >
                                                                        <MdDeleteOutline size={13} />
                                                                        <h2>Delete</h2>
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                </div >
            )}

        </div >
    )
};

export const InputBoxForComment = ({ expId = 0, expCommentId = 0, handleCancleFunction, handleSubmitFunction, ml = 1, mr = 1 }) => {
    const [comment, setComment] = useState('');

    const handleChangeForCommentInput = (e) => {
        setComment(e.target.value);
    };

    const id = expId === 0 ? expCommentId : expId;
    return (
        <div className={`ml-${ml} mr-${mr}  min-w-3/4 rounded border border-gray-400`}>
            <Textarea
                required
                value={comment}
                onChange={handleChangeForCommentInput}
                placeholder='Type comment here...'
                className='w-full flex flex-wrap bg-gray-200 dark:bg-gray-800 outline-none border-none focus:ring-0'
            />
            <div className='flex items-stretch justify-end gap-1 h-full border-t border-gray-400'>
                <button
                    className='p-1  my-0 h-full border-l border-gray-400 hover:text-red-500'
                    onClick={(e) => handleCancleFunction(setComment, id)}
                >
                    Cancel
                </button>
                <button className='p-1 pl-2 border my-0 h-full text-gray-100 bg-gray-600 dark:bg-gray-400 hover:text-red-500'
                    onClick={() => handleSubmitFunction(comment, expId, expCommentId)}
                >
                    Post
                </button>
            </div>
        </div>
    );
};
