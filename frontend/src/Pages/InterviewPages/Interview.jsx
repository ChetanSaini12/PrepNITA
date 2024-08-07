import React, { useEffect, useState } from "react";
import SidebarComponent from "../../Components/Sidebar";
import { Button, TextInput } from "flowbite-react";
import DateTimePicker from "../../Components/DatePicker";
import moment from "moment";
import {
  CREATE_INTERVIEW,
  GET_INTERVIEW,
} from "../../gqlOperatons/Interview/mutations";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "../Loader";
import { setLoading } from "../../app/user/userSlice";
import TopicsInput from "./CustomInput";
import { BiBookAdd } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import Lottie from "react-lottie";
import animationData from "../../lotties/mini-not-found.json";

function Interviews() {
  const { loggedIn, isLoading, id, ready } = useSelector((state) => state.user);

  const [dateTime, setDateTime] = useState(new Date());
  const [Duration, setDuration] = useState();
  const [Topics, setTopics] = useState([]);
  const [ERROR, setError] = useState(null);
  const [data, setdata] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [displayInterviews, setDisplayInterviews] = useState(null);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [showCreateInterviw, setShowCreateInterview] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [createInterview] = useMutation(CREATE_INTERVIEW);

  const [getInterviews] = useMutation(GET_INTERVIEW);

  useEffect(() => {
    if (!ready) return;
    (async () => {
      try {
        const { data } = await getInterviews();
        // console.log("Interviews data ", data);
        if (data) {
          setInterviews(data.getInterview);
        }
      } catch (error) {
        console.log("Error in getting interviews ", error);
        setError(error);
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [id, data]);

  useEffect(() => {
    if (interviews) {
      handleTabSwitch(0); // To set the initial displayInterviews
    }
  }, [interviews]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
      console.log("screenSize", window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const { data } = await createInterview({
        variables: {
          Interview: {
            startTime: dateTime.toISOString(),
            duration: Duration,
            topics: Topics,
          },
        },
      });
      if (data) {
        // console.log("Interview created ", data);
        setdata(data.createInterview);
        setTopics([]);
        setDuration(null);
        setShowCreateInterview(false);
        toast.success(
          "Interview created successfully with id " + data.createInterview.id
        );
      }
    } catch (error) {
      console.log("Error in creating interview ", error);
      setError(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleTabSwitch = async (id) => {
    setButtonIndex(id);

    let filteredInterviews;
    if (id === 0) {
      // All interviews
      filteredInterviews = interviews;
    } else if (id === 1) {
      // Interviews where interview.isCompleted is true
      filteredInterviews = interviews.filter(
        (interview) => interview.isCompleted
      );
    } else if (id === 2) {
      // Interviews where interview.interviewerName !== null
      filteredInterviews = interviews.filter(
        (interview) => interview.interviewerName !== null
      );
    } else if (id === 3) {
      // Interviews where interview.interviewerName === null && !interview.isCompleted
      filteredInterviews = interviews.filter(
        (interview) =>
          interview.interviewerName === null && !interview.isCompleted
      );
    } else {
      filteredInterviews = [];
    }

    setDisplayInterviews(filteredInterviews);
  };



  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  if (isLoading || !ready) return <Loader />;
  if (ready && !loggedIn) {
    return navigate("/register");
  }
  if (ERROR) {
    console.log("Error in Interviews ", ERROR);
    toast.error(ERROR.message ? ERROR.message : " Something went wrong ! ");
    setTimeout(() => {
      setError(null);
    }, 2000);
  }



  return (
    <div className=" min-w-screen min-h-screen flex flex-col items-center ">
      {showCreateInterviw && (
        <CreateInterviewBox
          Duration={Duration}
          setDuration={setDuration}
          Topics={Topics}
          setTopics={setTopics}
          setDateTime={setDateTime}
          handleSubmit={handleSubmit}
          setShowCreateInterview={setShowCreateInterview}
        />
      )}

      {!showCreateInterviw && (
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-10">
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md flex justify-center items-center flex-col gap-3 sm:p-2 my-4 md:p-6
             hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-100 h-36 w-72">
            <button
              onClick={() => {
                setShowCreateInterview(true);
              }}
            >
              <div className="flex justify-center">
                <BiBookAdd />
              </div>
              <h1>Create an interview</h1>
            </button>
          </div>
          <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md flex justify-center items-center flex-col gap-3 sm:p-2 my-4 md:p-6
             hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-100 h-36 w-72">
            <button
              onClick={() => {
                setShowCreateInterview(true);
              }}
            >
              <div className="flex justify-center">
                <RiAdminFill />
              </div>
              <h1>Interviews as an Admin</h1>
            </button>
          </div>
        </div>
      )}

      <div className="w-full p-4 ">
        <h1 className="text-3xl font-semibold mb-4 ">My Interviews </h1>

        <hr />
        {/* filter buttons  */}
        <div className="flex justify-start gap-2 md:gap-5 my-4 mx-1 text-sm md:text-md ">
          <Button
            size="xs"
            className={`text-sm p-0 ${buttonIndex === 0 ? "underline underline-offset-2 " : ""
              } `}
            onClick={() => handleTabSwitch(0)}
          >
            All
          </Button>
          <Button
            size="xs"
            className={`text-sm p-0 ${buttonIndex === 1 ? "underline underline-offset-2" : ""
              } `}
            onClick={() => handleTabSwitch(1)}
          >
            Completed
          </Button>
          <Button
            size="xs"
            className={`text-sm p-0 ${buttonIndex === 2 ? "underline underline-offset-2" : ""
              } `}
            onClick={() => handleTabSwitch(2)}
          >
            Assigned
          </Button>
          <Button
            size="xs"
            className={`text-sm p-0 ${buttonIndex === 3 ? "underline underline-offset-2" : ""
              } `}
            onClick={() => handleTabSwitch(3)}
          >
            Not Assigned
          </Button>
        </div>
        {!displayInterviews && (
          <h1 className=" text-2xl flex justify-center">Loading...</h1>
        )}
        {displayInterviews?.length == 0 && (
          <div className="w-full flex justify-items-center">
            <Lottie options={defaultOptions} height={100} width={100} />
          </div>
        )}

        {/* DESKTOP SCREENS  */}
        {displayInterviews?.length !== 0 && screenSize > 660 && (
          <div className=" ">
            <table className="table-auto w-full my-4">
              <thead>
                {displayInterviews && (
                  <tr className="bg-gray-100 text-gray-600 font-semibold text-left">
                    <th className="px-4 py-2">Sr. No.</th>
                    <th className="px-4 py-2">Interviewee</th>
                    <th className="px-4 py-2">Interviewer</th>
                    <th className="px-4 py-2">Start Time</th>
                    <th className="px-4 py-2">Duration (Min.)</th>
                    <th className="px-4 py-2">Feedback</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {displayInterviews?.map((interview, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all cursor-pointer "
                    onClick={() => navigate(`/interview/${interview.id}`)}
                  >
                    <td className="px-4 py-2">{index + 1}.</td>
                    <td className="px-4 py-2">{interview.intervieweeName}</td>
                    <td className="px-4 py-2">
                      {interview.interviewerName
                        ? interview.interviewerName
                        : "Not picked yet!"}
                    </td>
                    <td className="px-4 py-2">
                      {moment(interview.startTime).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </td>
                    <td className="px-4 py-2">{interview.duration}</td>
                    <td className="px-4 py-2">
                      {interview.feedback ? "✅" : "⏳"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* FOR MOBILE SCREENS  */}
        {displayInterviews?.length !== 0 && screenSize <= 660 && (
          <div className="flex gap-4 flex-wrap justify-center">
            {displayInterviews?.map((interview, index) => (
              <div
                key={index}
                className="group relative w-full   transition-all h-[280px] overflow-hidden rounded-lg sm:w-[330px] bg-gray-300 dark:bg-gray-700"
              >
                <div className="p-3 flex flex-col gap-2">
                  <h1 className="text-lg font-semibold line-clamp-1">
                    Interviewee: {interview.intervieweeName}
                  </h1>
                  <p className="text-lg font-semibold line-clamp-1">
                    Interviewer: {interview.interviewerName}
                  </p>
                  <p className="text-sm mb-1">
                    Start Time:{" "}
                    {moment(interview.startTime).format("MMMM Do YYYY, h:mm:ss a")}
                  </p>
                  <p className="text-sm mb-1">Duration: {interview.duration} minutes</p>
                  <p className="text-sm mb-1">Topics: {interview.topics?.join(", ")}</p>
                  <p className="text-sm  -mb-5">Feedback: {interview.feedback ? "Given" : "Not Given"}</p>
                  <Link
                    to={`/interview/${interview.id}`}
                    className="group-hover:bottom-0 absolute bottom-[-220px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white 
                    transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-0.5"
                  >
                    See Interview
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div >
  );
}

export default Interviews;

const CreateInterviewBox = ({
  Duration,
  setDuration,
  Topics,
  setTopics,
  setDateTime,
  handleSubmit,
  setShowCreateInterview,
}) => {
  return (
    <div className=" max-w-xl w-full flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl m-5 bg-gray-200 dark:bg-gray-700">
      <div className="flex-1 justify-center flex flex-col ">
        <button
          className="flex justify-end hover:text-xl hover:text-red-500"
          onClick={() => {
            setShowCreateInterview(false);
          }}
        >
          X
        </button>
        <h1 className="text-3xl font-semibold mb-4  ">Create an Interview</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextInput
            type="number"
            placeholder="Duration (in minutes)"
            value={Duration}
            required
            onChange={(e) => setDuration(parseInt(e.target.value))}
          // className="block w-full bg-red-500 border-gray-600 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
          />

          <TopicsInput Topics={Topics} setTopics={setTopics} />
          <DateTimePicker setDateTime={setDateTime} />
          <Button type="submit" className="w-full  " gradientMonochrome="cyan">
            Create Interview
          </Button>
        </form>
      </div>
    </div>
  );
};
