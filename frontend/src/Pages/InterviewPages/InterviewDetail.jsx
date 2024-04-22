import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_INTERVIEW_BY_ID } from '../../gqlOperatons/Interview/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import toast from 'react-hot-toast';
import moment from 'moment';


const InterviewDetails = () => {

  let { id } = useParams();
  // id = parseInt(id);
  const [ERROR, setError] = useState(null);
  const [interview, setInterview] = useState(null);
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [getInterviewById] = useMutation(GET_INTERVIEW_BY_ID, {
    onError: (error) => {
      console.log("onError ", error);
      return setError(error);
    }
  });

  useEffect(() => {
    dispatch(setLoading(true));
    (async () => {
      try {
        const { data, errors } = await getInterviewById({
          variables: {
            interviewId: parseInt(id),
          }
        });
        console.log("res ",data,errors);

        if (errors) {
          dispatch(setLoading(false));
          return setError(errors);
        }
        else if (data) {
          console.log("data at interview details page ", data);
          setInterview(data.getInterviewById);
          dispatch(setLoading(false));
        }

      } catch (error) {
        console.log("error at interview page ", error);
        dispatch(setLoading(false));
        return setError(error);
      }

    })();

  }, [id]);

  if (ERROR) {
    console.log("error at interview page ", ERROR);
    toast.error(ERROR.message ? ERROR.message : "Something went wrong !");
  }
  if (isLoading) return <Loader />;
  return (

    <div className='w-screen h-screen flex flex-col'>
      <h1 className='text-3xl flex justify-center my-2'> Interviw detail page  </h1>

      {interview && (
        <div className="bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
          <h1 className="text-lg font-semibold mb-2">Interviewee: {interview.intervieweeName !== null ? interview.intervieweeName : ""}</h1>
          <p className="text-sm text-gray-300 mb-1">Interviewer: {interview.interviewerName ? interview.interviewerName : ""}</p>
          <p className="text-sm text-gray-300 mb-1">Start Time: {moment(interview.startTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
          <p className="text-sm text-gray-300 mb-1">Duration: {interview.duration} minutes</p>
          <p className="text-sm text-gray-300 mb-1">Topics: {interview.topics?.join(', ')}</p>
          <p className="text-sm text-gray-300">Feedback: {interview.feedback ? "Given" : "Not Given"}</p>
        </div>
      )}
      {ERROR && (
        <div className='flex justify-center items-center' >
          <h1 className='text-lg my-5'> Something Went Wrong !  </h1>
          <br />
          {/* <p> {Error} </p> */}
        </div>
      )}


    </div>
  )
}


export default InterviewDetails;
