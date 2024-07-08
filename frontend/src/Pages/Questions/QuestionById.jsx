import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CHANGE_APPROVE_STATUS_OF_QUE, CHANGE_VISIBILIY_STATUS_OF_QUE, DOWN_VOTE_QUESTION, GET_QUESTION_BY_ID, UP_VOTE_QUESTION } from '../../gqlOperatons/Question/mutations';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import { Button } from 'flowbite-react';
import { BiUpvote, BiDownvote, BiShare } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosHeart } from "react-icons/io";
import { LiaCommentSolid } from "react-icons/lia";
import { CiHeart } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaUserPen } from "react-icons/fa6";
import { LinearLoader } from '../../Components/LinearLoader';

const QuestionById = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  let id = parseInt(params.id);

  const { isLoading, loggedIn, ready, role, id: userId } = useSelector((state) => state.user);
  const [ERROR, setError] = useState(null);
  const [question, setQuestion] = useState(null);
  const [smallLoading, setSmallLoading] = useState(false);


  const [getQuestion] = useMutation(GET_QUESTION_BY_ID);
  const [upVote] = useMutation(UP_VOTE_QUESTION);
  const [downVote] = useMutation(DOWN_VOTE_QUESTION);
  const [updateAproveStatus] = useMutation(CHANGE_APPROVE_STATUS_OF_QUE);
  const [updateVisibilityStatus] = useMutation(CHANGE_VISIBILIY_STATUS_OF_QUE);


  useEffect(() => {
    dispatch(setLoading(true));
    (async () => {
      try {
        const { data } = await getQuestion({ variables: { QuestionId: id } });
        console.log("response of question by id ", data);
        if (data) {
          setQuestion(data.getQuestionById);
        }
      } catch (error) {
        dispatch(setLoading(false));
        setError(error);
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [id]);

  const handleUpVote = async (questionId) => {
    setSmallLoading(true);
    try {
      const { data } = await upVote({
        variables: { QuestionId: questionId }
      });
      if (data) {
        setQuestion({
          ...question,
          upvotes: data.upVoteQuestion.upvotes,
          downvotes: data.upVoteQuestion.downvotes,
          isLiked: data.upVoteQuestion.isLiked,
          isDisliked: data.upVoteQuestion.isDisliked,
        })
      }
    } catch (error) {
      setError(error);
    } finally {
      setSmallLoading(false);
    }
  };
  const handleDownVote = async (questionId) => {
    setSmallLoading(true);
    try {
      const { data } = await downVote({
        variables: { QuestionId: questionId }
      });
      if (data) {
        setQuestion({
          ...question,
          upvotes: data.downVoteQuestion.upvotes,
          downvotes: data.downVoteQuestion.downvotes,
          isLiked: data.downVoteQuestion.isLiked,
          isDisliked: data.downVoteQuestion.isDisliked,
        })

      }
    } catch (error) {
      setError(error);
    } finally {
      setSmallLoading(false);
    }
  };
  const handleQuestionAproveStatus = async (questionId) => {
    setSmallLoading(true);
    try {
      const { data } = await updateAproveStatus({
        variables: { QuestionId: questionId }
      });
      if (data) {
        // console.log("data of approve stt ", data);
        setQuestion({
          ...question,
          isApproved: data.changeApproveStatusOfQue.isApproved,
        });
        if (data.changeApproveStatusOfQue.isApproved)
          toast.success("Now this question is approved");
        else {
          toast.success("Now this question is private");
        }

      }
    } catch (error) {
      setError(error);
    } finally {
      setSmallLoading(false);
    }
  };
  const handleQuestionVisibilityStatus = async (questionId) => {
    setSmallLoading(true);
    try {
      const { data } = await updateVisibilityStatus({
        variables: { QuestionId: questionId }
      });
      if (data) {
        // console.log("data.changeAproveStatusOfQue.isVisible", data)
        setQuestion({
          ...question,
          isVisible: data.changeVisibleStatusOfQue.isVisible,
        });
        if (data.changeVisibleStatusOfQue.isVisible) {
          toast.success("visibility status changed to public");
        }
        else {
          toast.success("visibility status changed to private");
        }

      }
    } catch (error) {
      setError(error);
    } finally {
      setSmallLoading(false);
    }
  };

  const likedClass = "text-green-500";
  const disLikedClass = "text-red-500";
  const notAllowedToSeeApproveButton = ["USER", "ADMIN"];

  if (isLoading || !ready) return <Loader />;
  if (ERROR) {
    console.log("Error in Question by id ", ERROR);
    toast.error(ERROR.message ? ERROR.message : "Something went wrong")
    setTimeout(() => {
      setError(null);
    }, 2000);
  }
  return (
    <>
      <div className=' w-full'>
        {smallLoading && (
          <LinearLoader />
        )}
      </div>
      {question ?
        (
          <div className={`${smallLoading ? 'screenInActive' : ""} min-w-screen min-h-screen py-2 px-4 `} >
            <div className="flex justify-between items-center gap-2 mb-4">
              {/* <h2 className="text-2xl font-bold">{question.title}</h2> */}
              <Link to={'/questions'} className='flex items-center justify-start gap-1 hover:text-red-500'>
                <IoIosArrowBack className='mt-0.5' />
                <h3>Back</h3>
              </Link>
              <div className="flex  gap-2 items-center ">
                <button
                  className={`${question.isLiked ? likedClass : ""
                    } flex justify-center p-1 rounded-md hover:text-red-500 bg-gray-300 dark:bg-gray-700`}
                  onClick={() => handleUpVote(question.id)}
                >
                  <BiUpvote size={18} />
                </button>
                <h3 className="flex justify-center">
                  {question.upvotes - question.downvotes}
                </h3>
                <button
                  className={`${question.isDisliked ? disLikedClass : ""
                    } flex justify-center p-1 rounded-md hover:text-red-500 bg-gray-300 dark:bg-gray-700`}
                  onClick={() => handleDownVote(question.id)}
                >
                  <BiDownvote size={18} />
                </button>
              </div>
            </div>
            <div className=" flex flex-col gap-1 mb-4">
              <div className='pl-0.5'>
                <div className='text-xs flex gap-2 items-center'>
                  <FaUserPen size={25} />
                  <Link to={`/profile/${question.createrUserName}`} className='pt-1.5 underline-offset-1 hover:underline'>
                    {question.createrName || "Dummy Name"}</Link>
                </div>

              </div>
              {/* Question description */}
              <p className='text-lg sm:text-2xl font-semibold' dangerouslySetInnerHTML={{ __html: question.description }} />
            </div>
            <div className=" mb-4 flex flex-col gap-1">
              <h2>Tags:</h2>
              <div className='flex gap-4 flex-wrap '>
                {question.tags?.map((tag, index) => (
                  <div key={index} className=" bg-gray-200 dark:bg-gray-600 rounded-md px-2 py-1 text-xs font-semibold"
                    style={{ wordWrap: 'break-word', wordBreak: 'break-all', whiteSpace: 'normal' }}
                    dangerouslySetInnerHTML={{ __html: tag }} />
                ))}
              </div>
              <div className='text-sm flex gap-2 ml-0.5 mt-4'>
                <button onClick={() => handleQuestionAproveStatus(question.id)} className={`${notAllowedToSeeApproveButton.map((val) => val === role) ? 'disabledButton' : ""} border border-gray-300 dark:border-gray-700 
                hover:border-red-500 dark:hover:border-red-400 py-0.5 px-2 rounded-lg`}>Approved {question.isApproved ? "✅" : "❌"} </button>
                <button onClick={() => handleQuestionVisibilityStatus(question.id)} className={`${userId !== question.createdBy ? `disabledButton` : ""} border border-gray-300 dark:border-gray-700 
                hover:border-red-500 dark:hover:border-red-400 py-0.5 px-2 rounded-lg`}>Visibility {question.isVisible ? "✅" : "❌"} </button>
                {/* <button onClick={handleQuizEdit} className={`${!isOwner ? `disabledButton` : ""} border border-gray-300 dark:border-gray-700 
                hover:border-red-500 dark:hover:border-red-400 px-2 rounded-lg`}>Edit </button>
                <button onClick={handleDeleteQuiz} className={`${!isOwner ? `disabledButton` : ""} border border-gray-300 dark:border-gray-700 
                hover:border-red-500 dark:hover:border-red-400 px-2 rounded-lg`}>Delete</button> */}

              </div>
              <div className='mt-4 border-b border-gray-300 dark:border-gray-700'></div>
            </div>
            <div className="flex flex-col gap-2">
              {/* Answer Description */}
              <h3 className="text-lg sm:text-xl font-bold text-green-500">Answer:</h3>
              <p className='text-pretty leading-relaxed tracking-wide ' dangerouslySetInnerHTML={{ __html: question.answer }} />
            </div>

          </div >
        ) :
        (<div className='w-screen min-h-screen shadow-md rounded-md p-6'>
          <h1 className='text-xl md:text-3xl flex justify-center'>Wait... </h1>
        </div>)
      }
    </>
  )
}

export default QuestionById;