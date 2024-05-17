import React, { useEffect, useState } from 'react'
import SidebarComponent from '../Components/Sidebar'
import { Button, TextInput } from 'flowbite-react'
import DateTimePicker from '../Components/DatePicker'
import moment from 'moment';
import { CREATE_INTERVIEW, GET_INTERVIEW } from '../gqlOperatons/Interview/mutations';
import toast from 'react-hot-toast';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from './Loader';
import { setLoading } from '../app/user/userSlice';

function Interviews() {
  const { loggedIn, isLoading } = useSelector((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());
  const [Duration, setDuration] = useState(30);
  const [Topics, setTopics] = useState("");
  const [Error, setError] = useState(null);
  const [data, setdata] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [createInterview] = useMutation(CREATE_INTERVIEW, {
    onError: (error) => {
      console.log("error in creating interview mutation ", error);
      setError(error.message);
    },
  });

  const [getInterviews] = useMutation(GET_INTERVIEW, {
    onError: (error) => {
      console.log("error in getting interviews ", error);
      setError(error.message);
    },
  });


  useEffect(() => {
    // console.log(loggedIn);
    dispatch(setLoading(true));
    getInterviews().then((res) => {
      console.log("Interviews data ", res);
      setInterviews(res.data.getInterview);
      dispatch(setLoading(false));
    })
      .catch((error) => {
        console.log("Error in getting interviews ", error);
        setError(error.message);
        dispatch(setLoading(false));

        // setError(error.message);
      });
    // setdata(null);


  }, [data]);


  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("interview Data ", dateTime.toISOString(), " ", Duration);
    dispatch(setLoading(true));
    createInterview({
      variables: {
        Interview: {
          startTime: dateTime.toISOString(),
          duration: Duration,
          topics: Topics?.split(','),
        }
      },
    }).then((res) => {
      console.log("Interview created ", res);
      if (res.errors) setError(res.errors ? res.errors.message : "Error in creating interview");
      else {

        setdata(res.data.createInterview);
      }
      dispatch(setLoading(false));

    }).catch((error) => {
      console.log("Error in creating interview ", error);
      setError(error.message);
      dispatch(setLoading(false));
    });

  };


  if (isLoading) return <Loader />;
  if (!isLoading && !loggedIn) {
    return navigate('/register');
  }
  // console.log("data ", data);
  if (Error) {
    toast.error(Error);
    setTimeout(() => {
      setError(null);
      setdata(null);

    }, 1000);
    // setRefresh(!refresh);
  }
  else if (data) {
    toast.success("Interview created successfully");
    setTimeout(() => {
      setdata(null);
      setError(null);
    }, 1000);
    // setRefresh(!refresh);
  }
  

  return (
    <div className="w-screen min-h-screen  text-black flex flex-col items-center justify-center dark:text-white">
      <div className=' max-w-xl w-full flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl m-5'>
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

      <div className="min-w-screen m-2">
        <h1 className="text-3xl font-semibold mb-4">Your Interviews</h1>
        <div className='mx-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
          {interviews?.map((interview, index) => (
            <div className='group relative w-full border border-teal-500 hover:border-2 transition-all h-[400px] overflow-hidden rounded-lg sm:w-[430px]'>
              <div className="p-3 flex flex-col gap-2">
                <h1 className='text-lg font-semibold line-clamp-1'>Interviewee: {interview.intervieweeName}</h1>
                <p className='italic text-sm'>Interviewer: {interview.interviewerName}</p>
                <p className="text-sm text-gray-300 mb-1">Start Time: {moment(interview.startTime).format('MMMM Do YYYY, h:mm:ss a')}</p>
                <p className="text-sm text-gray-300 mb-1">Duration: {interview.duration} minutes</p>
                <p className="text-sm text-gray-300 mb-1">Topics: {interview.topics?.join(', ')}</p>
                <p className="text-sm text-gray-300">Feedback: {interview.feedback ? "Given" : "Not Given"}</p>
                <Link to={`/interview/${interview.id}`}className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'>
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
  