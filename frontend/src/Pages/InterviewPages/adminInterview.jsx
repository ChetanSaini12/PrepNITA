import React, { useEffect, useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { GET_INTERVIEW } from "../../gqlOperatons/Interview/mutations";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../app/user/userSlice";
import { useMutation } from "@apollo/client";
import { Loader } from "../Loader";
import moment from "moment";
import { Link } from "react-router-dom";


export default function AdminInterview() {

  const { loggedIn, isLoading, id } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [buttonIndex, setButtonIndex] = useState(0);
  const [ERROR, setError] = useState(false);
  const [interviews, setInterviews] = useState([]);





  const [getInterviews] = useMutation(GET_INTERVIEW, {
    onError: (error) => {
      console.log("error in getting interviews ", error);
      return setError(error);
    },
  });

  useEffect(() => {
    dispatch(setLoading(true));
    (
      async () => {
        try {
          const { data, errors } = await getInterviews();
          if (errors) {
            console.log("Error in getting interviews ", errors);
            dispatch(setLoading(false));
            return setError(errors);
          }
          else if (data) {
            setInterviews(data.getInterview);
            dispatch(setLoading(false));
          }
        } catch (error) {
          console.log("Error in getting interviews ", error);
          dispatch(setLoading(false));
          return setError(error);
        }
      }
    )();
  }, []);


  const HandleFilterCondition = (interview) => {
    if (buttonIndex === 0) {
      return (!interview.isCompleted && interview.interviewerId === null);
    }
    if (buttonIndex === 1) {
      return interview.interviewerId === parseInt(id);
    }
    if (buttonIndex === 2) {
      return interview.isCompleted;
    }
  };





  const baseButtonClass = "text-sm p-2 w-2/3 ";
  const selectedButtonClass =
    "bg-gray-200 dark:bg-gray-800 border-t border-l border-r rounded-t";
  const nonSelectedButtonClass = "border-b";


  if (isLoading) {
    return <Loader />
  }
  if (ERROR) {
    return <h1>Error in fetching interviews</h1>
  }

  return (
    <div className="min-w-screen min-h-screen flex flex-col items-center gap-2">
      <div className="w-full mx-1 flex flex-col my-3">
        <h1 className="text-xl mb-5 flex justify-center">My Interview as an Admin</h1>
        <div className="flex">
          <button
            className={`${baseButtonClass} ${buttonIndex === 0 ? selectedButtonClass : nonSelectedButtonClass
              }`}
            onClick={() => setButtonIndex(0)}
          >
            Yet to be assigned
          </button>
          <button
            className={`${baseButtonClass} ${buttonIndex === 1 ? selectedButtonClass : nonSelectedButtonClass
              }`}
            onClick={() => setButtonIndex(1)}
          >
            Assigned to me
          </button>
          <button
            className={`${baseButtonClass} ${buttonIndex === 2 ? selectedButtonClass : nonSelectedButtonClass
              }`}
            onClick={() => setButtonIndex(2)}
          >
            Interviewed
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 text-wrap my-2 ">

        {interviews
          ?.filter(HandleFilterCondition)
          .map((interview, index) => (
            <div className='group relative w-full border border-teal-500 hover:border-2 transition-all h-[300px] overflow-hidden rounded-lg sm:w-[330px]  bg-gray-300 dark:bg-gray-700'>
              <div className="p-3 flex flex-col gap-2">
                <h1 className='text-lg font-semibold line-clamp-1'>Interviewee: {interview.intervieweeName}</h1>
                <p className='text-lg font-semibold line-clamp-1'>Interviewer: {interview.interviewerName}</p>
                <p className="text-sm  mb-1">Start Time: {moment(interview.startTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p className="text-sm  mb-1">Duration: {interview.duration} minutes</p>
                <p className="text-sm  mb-1">Topics: {interview.topics?.join(', ')}</p>
                <p className="text-sm ">Feedback: {interview.feedback ? "Given" : "Not Given"}</p>
                <Link to={`/interview/${interview.id}`}
                  className='group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
                >
                  See Interview
                </Link>
              </div>
            </div>
          ))}

      </div>
    </div>
  );
}
