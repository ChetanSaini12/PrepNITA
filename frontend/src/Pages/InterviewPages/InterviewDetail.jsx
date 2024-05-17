import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_INTERVIEW_BY_ID } from '../../gqlOperatons/Interview/mutations';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../app/user/userSlice';
import { Loader } from '../Loader';
import toast from 'react-hot-toast';
import moment from 'moment';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
// import { ArcElement, } from "chart.js";


const InterviewDetails = () => {

  let { id } = useParams();
  // id = parseInt(id);
  const [ERROR, setError] = useState(null);
  const [interview, setInterview] = useState(null);
  const { isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const dummyFeedBack = {
    communication: 4,
    development: 3,
    dsa: 2,
    csfundamentals: 5,
    notes: ["Good communication skills", "Good in development", "Need to improve in DSA", "Excellent in CS Fundamentals"],
    points: 14
  };

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
        console.log("res ", data, errors);

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

    <div className='w-screen min-h-screen flex flex-col'>
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
      {dummyFeedBack && (
        <>
          <div className=' mx-2 md:mx-48 lg:mx-60 my-5 flex justify-center'>
            <Bar
              data={
                {
                  labels: ['Communication', 'Development', 'DSA', 'CS Fundamentals'],
                  datasets: [
                    {
                      label: 'Feedback',
                      data: [dummyFeedBack.communication, dummyFeedBack.development, dummyFeedBack.dsa, dummyFeedBack.csfundamentals],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1,
                      minBarThickness: 10,
                      barThickness: 50,
                      minBarLength: 2,


                    },
                  ],
                }
              }
            />
          </div>
          <div className='flex justify-center max-h-52 my-5'>
            <Doughnut
              data={
                {
                  labels: ['Skills','Scope of improvement'],
                  datasets: [
                    {
                      
                      data: [dummyFeedBack.points, 20-dummyFeedBack.points],
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                      ],
                      borderWidth: 1,
                      minBarThickness: 10,
                      barThickness: 50,
                      minBarLength: 2,


                    },
                  ],
                }
              }
            />
          </div>

          <div className='flex flex-col justify-center items-center'>
            <h1 className='text-3xl my-2 text-blue-500'> Notes </h1>
            <l>
              {dummyFeedBack.notes.map((note, index) => (
                <li key={index} className='text-lg my-2'> {note} </li>
              ))}
            </l>
          </div>

        </>

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
