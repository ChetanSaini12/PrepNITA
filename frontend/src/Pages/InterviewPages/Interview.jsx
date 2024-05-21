import React, { useEffect, useState } from 'react'
import SidebarComponent from '../../Components/Sidebar'
import { Button, TextInput } from 'flowbite-react'
import DateTimePicker from '../../Components/DatePicker'
import moment from 'moment';
import { CREATE_INTERVIEW, GET_INTERVIEW } from '../../gqlOperatons/Interview/mutations';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../Loader';
import { setLoading } from '../../app/user/userSlice';

function Interviews() {
  const { loggedIn, isLoading } = useSelector((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());
  const [Duration, setDuration] = useState(30);
  const [Topics, setTopics] = useState("");
  const [ERROR, setError] = useState(null);
  const [data, setdata] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [ready, setReady] = useState(false);
  const [buttonIndex, setButtonIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [createInterview] = useMutation(CREATE_INTERVIEW, {
    onError: (error) => {
      console.log("error in creating interview mutation ", error);
      return setError(error);
    },
  });

  const [getInterviews] = useMutation(GET_INTERVIEW, {
    onError: (error) => {
      console.log("error in getting interviews ", error);
      return setError(error);
    },
  });


  useEffect(() => {
    // console.log(loggedIn);
    setReady(false);
    dispatch(setLoading(true));
    (async () => {
      try {
        const { data, errors } = await getInterviews();
        console.log("Interviews data ", data);
        if (errors) {
          dispatch(setLoading(false));
          return setError(errors);
        }
        else if (data) {
          setInterviews(data.getInterview);
          dispatch(setLoading(false));
        }
        else {
          dispatch(setLoading(false));
          return setError("Something went wrong in fetching interviews");
        }
      } catch (error) {
        console.log("Error in getting interviews ", error);
        dispatch(setLoading(false));
        return setError(error);
      }
      setReady(true);
    })();
  }, [data]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const { data, errors } = await createInterview({
        variables: {
          Interview: {
            startTime: dateTime.toISOString(),
            duration: Duration,
            topics: Topics?.split(','),
          }
        },
      });
      if (errors) {
        console.log("Error in creating interview ", errors);
        dispatch(setLoading(false));
        return setError(errors);
      }
      else if (data) {
        console.log("Interview created ", data);
        setdata(data.createInterview);
        dispatch(setLoading(false));
        toast.success("Interview created successfully with id " + data.createInterview.id);
      }
      else {
        dispatch(setLoading(false));
        return setError("Something went wrong in creating interview");
      }

    } catch (error) {
      console.log("Error in creating interview ", error);
      dispatch(setLoading(false));
      return setError(error);
    }

  };

  if (ERROR) {
    console.log("Error in Interviews ", ERROR);
    toast.error(ERROR.message ? ERROR.message : " Something went wrong ! ");
  }
  if (isLoading) return <Loader />;
  if (!isLoading && !loggedIn) {
    return navigate('/register');
  }

  return (
    <div className="w-screen min-h-screen   flex flex-col items-center justify-center">
      <div className=' max-w-xl w-full flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl m-5 light: bg-gray-700 text-white'>
      <div className='flex-1 justify-center flex flex-col '>
        <h1 className="text-3xl font-semibold mb-4 ">Schedule an Interview</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            type="number"
            placeholder="Duration (in minutes)"
            value={Duration}
            required
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="block w-full border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
          />
          <TextInput
            placeholder="Topics (e.g., CS Fundamentals, OS, ...)"
            value={Topics}
            onChange={(e) => setTopics(e.target.value)}
            className="block w-full border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-white"
          />
          <DateTimePicker setDateTime={setDateTime} />
          <Button
            type="submit"
            className="w-full  "
            gradientMonochrome="cyan"
          >
            Create Interview
          </Button>
        </form>
      </div>
      </div>

      <div className="mx-2 mb-5 ">
        <h1 className="text-3xl font-semibold mb-4">All Interviews </h1>
        <div className='flex justify-start gap-2 md:gap-5 my-4 mx-1 text-sm md:text-md '>
          <Button   size="sm" className='text-sm p-0' onClick={() => { setButtonIndex(0) }}>All</Button>
          <Button   size="sm" className='text-sm p-0' onClick={() => { setButtonIndex(1) }} >Completed</Button>
          <Button   size="sm" className='text-sm p-0' onClick={() => { setButtonIndex(2) }} >Assigned</Button>
          <Button   size="sm" className='text-sm p-0' onClick={() => { setButtonIndex(3) }} >Not Assigned</Button>
        </div>
        {!ready && <h1 className=' text-2xl flex justify-center'>Loading...</h1>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 text-wrap">
          {buttonIndex === 0 && interviews?.map((interview, index) => (
            <div className='group relative w-full border border-teal-500 hover:border-2 transition-all h-[300px] overflow-hidden rounded-lg sm:w-[330px] light: text-white bg-gray-700'>
              <div className="p-3 flex flex-col gap-2">
                <h1 className='text-lg font-semibold line-clamp-1'>Interviewee: {interview.intervieweeName}</h1>
                <p className='text-lg font-semibold line-clamp-1'>Interviewer: {interview.interviewerName}</p>
                <p className="text-sm text-gray-300 mb-1">Start Time: {moment(interview.startTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p className="text-sm text-gray-300 mb-1">Duration: {interview.duration} minutes</p>
                <p className="text-sm text-gray-300 mb-1">Topics: {interview.topics?.join(', ')}</p>
                <p className="text-sm text-gray-300">Feedback: {interview.feedback ? "Given" : "Not Given"}</p>
                <Link to={`/interview/${interview.id}`}
                className='group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
                >
                See Interview
              </Link>
              </div>
            </div>
          ))}
          {buttonIndex === 1 && interviews
            ?.filter(interview => interview.isCompleted)
            .map((interview, index) => (
              <div className='group relative w-full border border-teal-500 hover:border-2 transition-all h-[300px] overflow-hidden rounded-lg sm:w-[330px] light: text-white bg-gray-700'>
              <div className="p-3 flex flex-col gap-2">
                <h1 className='text-lg font-semibold line-clamp-1'>Interviewee: {interview.intervieweeName}</h1>
                <p className='text-lg font-semibold line-clamp-1'>Interviewer: {interview.interviewerName}</p>
                <p className="text-sm text-gray-300 mb-1">Start Time: {moment(interview.startTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p className="text-sm text-gray-300 mb-1">Duration: {interview.duration} minutes</p>
                <p className="text-sm text-gray-300 mb-1">Topics: {interview.topics?.join(', ')}</p>
                <p className="text-sm text-gray-300">Feedback: {interview.feedback ? "Given" : "Not Given"}</p>
                <Link to={`/interview/${interview.id}`}
                className='group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
                >
                See Interview
              </Link>
              </div>
            </div>
            ))}
          {buttonIndex === 2 && interviews
            ?.filter(interview => interview.interviewerName !== null)
            .map((interview, index) => (
              <div className='group relative w-full border border-teal-500 hover:border-2 transition-all h-[300px] overflow-hidden rounded-lg sm:w-[330px] light: text-white bg-gray-700'>
              <div className="p-3 flex flex-col gap-2">
                <h1 className='text-lg font-semibold line-clamp-1'>Interviewee: {interview.intervieweeName}</h1>
                <p className='text-lg font-semibold line-clamp-1'>Interviewer: {interview.interviewerName}</p>
                <p className="text-sm text-gray-300 mb-1">Start Time: {moment(interview.startTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p className="text-sm text-gray-300 mb-1">Duration: {interview.duration} minutes</p>
                <p className="text-sm text-gray-300 mb-1">Topics: {interview.topics?.join(', ')}</p>
                <p className="text-sm text-gray-300">Feedback: {interview.feedback ? "Given" : "Not Given"}</p>
                <Link to={`/interview/${interview.id}`}
                className='group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
                >
                See Interview
              </Link>
              </div>
            </div>
            ))}

          {buttonIndex === 3 && interviews
            ?.filter(interview => interview.interviewerName === null && !interview.isCompleted)
            .map((interview, index) => (
              <div className='group relative w-full border border-teal-500 hover:border-2 transition-all h-[300px] overflow-hidden rounded-lg sm:w-[330px] light: text-white bg-gray-700'>
              <div className="p-3 flex flex-col gap-2">
                <h1 className='text-lg font-semibold line-clamp-1'>Interviewee: {interview.intervieweeName}</h1>
                <p className='text-lg font-semibold line-clamp-1'>Interviewer: {interview.interviewerName}</p>
                <p className="text-sm text-gray-300 mb-1">Start Time: {moment(interview.startTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p className="text-sm text-gray-300 mb-1">Duration: {interview.duration} minutes</p>
                <p className="text-sm text-gray-300 mb-1">Topics: {interview.topics?.join(', ')}</p>
                <p className="text-sm text-gray-300">Feedback: {interview.feedback ? "Given" : "Not Given"}</p>
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
    </div>
  );
}

export default Interviews;
