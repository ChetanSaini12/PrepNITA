import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ASSIGN_INTERVIEW,
  GET_INTERVIEW_BY_ID,
} from "../../gqlOperatons/Interview/mutations";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../app/user/userSlice";
import { Loader } from "../Loader";
import toast from "react-hot-toast";
import moment from "moment";
import { Chart as ChartJS } from "chart.js/auto";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import ProgressBar from "./ProgressBas";
// import { ArcElement, } from "chart.js";

const InterviewDetails = () => {
  let { id } = useParams();
  // id = parseInt(id);
  const [ERROR, setError] = useState(null);
  const [interview, setInterview] = useState(null);
  const { isLoading } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [fetch, setFetch] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(1);
  // console.log("theme", theme);
  const dispatch = useDispatch();

  const dummyFeedBack = {
    communication: 4,
    development: 3,
    dsa: 2,
    csfundamentals: 1,

    notes: [
      "Good communication skills",
      "Good in development",
      "Need to improve in DSA",
      "Excellent in CS Fundamentals",
    ],
    points: 14,
  };

  const [getInterviewById] = useMutation(GET_INTERVIEW_BY_ID, {
    onError: (error) => {
      // console.log("onError 1 ", error);
      return setError(error);
    },
  });

  const [assingInterview] = useMutation(ASSIGN_INTERVIEW, {
    onError: (error) => {
      // console.log("onError 2 ", error);
      return setError(error);
    },
  });

  useEffect(() => {
    dispatch(setLoading(true));
    (async () => {
      try {
        const { data } = await getInterviewById({
          variables: {
            interviewId: parseInt(id),
          },
        });
        console.log("res ", data);
        if (data) {
          console.log("data at interview details page ", data);
          setInterview(data.getInterviewById);
        }
      } catch (error) {
        console.log("error at interview page ", error);
        setError(error);
      } finally {
        dispatch(setLoading(false));
      }
    })();
  }, [id, fetch]);


  useEffect(() => {
    if (!interview) return;

    if (interview.interviewerName) {
      setCurrentStatus(2);
    } else if (interview.startTime && interview.duration) {
      const startTime = moment(interview.startTime);
      const endTime = moment(interview.startTime).add(interview.duration, 'minutes');
      const now = moment();

      if (now.isBetween(startTime, endTime)) {
        setCurrentStatus(3);
      } else if (interview.isCompleted) {
        setCurrentStatus(4);
      } else if (interview.feedback) {
        setCurrentStatus(5);
      } else {
        setCurrentStatus(1);
      }
    } else {
      setCurrentStatus(1);
    }
  }, [interview]);

  const assignInterviewHandler = async (e) => {
    e.preventDefault();
    const userConfirmed = window.confirm("Do you want to take the interview?");
    if (!userConfirmed) return;
    dispatch(setLoading(true));
    const { data, errors } = await assingInterview({
      variables: {
        interviewId: parseInt(id),
      },
    });
    if (errors) {
      console.log("error at interview page ", errors);
      dispatch(setLoading(false));
      return setError(errors);
    } else if (data) {
      dispatch(setLoading(false));
      setFetch(!fetch);
      toast.success("Interview assigned to you successfully !");
    }
  };

  if (ERROR) {
    console.log("error at interview page ", ERROR);
    toast.error(ERROR.message ? ERROR.message : "Something went wrong !");
    setTimeout(() => {
      setError(null);
    }, 2000);
  }
  if (isLoading) return <Loader />;
  return (
    <>
      {interview && (
        <div className="w-full px-2 pt-0 pb-5">
          <h1 className="flex justify-center items-baseline py-2 mx-2 rounded-b-md bg-gray-300 dark:bg-gray-800 
          text-xl sm:text-2xl md:text-3xl"> Intrerview Id : #{id}</h1>
          {/* <hr></hr> */}
          <div className="m-4 flex flex-col gap-4">
            <div className="flex flex-row justify-between ">
              <div>
                <p className="border-b-2 w-fit">Interviewee Name : </p>
                <h1 className="text-lg sm:text-xl my-2">
                  {interview.intervieweeName !== null
                    ? interview.intervieweeName
                    : "N/A"}
                </h1>
                <div className="border-2 bg-teal-700 border-gray-500 text-white rounded p-2 flex flex-col justify-center items-center gap-2 h-20">
                  <div className="flex flex-row gap-2 justify-center">
                    <span>
                      {moment(interview.startTime).format("DD-MM-YY")}
                    </span>
                    <span>|</span>
                    <span>{moment(interview.startTime).format("ddd")}</span>
                  </div>
                  <div className="flex justify-center w-full text-lg sm:text-xl">
                    <span>{moment(interview.startTime).format("h:mm A")}</span>
                  </div>
                </div>
              </div>
              <div>
                <p className="border-b-2 w-fit">Interviewer Name : </p>
                <h1 className="text-lg sm:text-xl my-2">
                  {interview.interviewerName !== null
                    ? interview.interviewerName
                    : "N/A"}
                </h1>
                <div className="border-2 bg-teal-700 border-gray-500 text-white rounded p-2 flex flex-col justify-center items-center gap-2 h-20">
                  <div>Duration : </div>
                  <div className="text-lg sm:text-xl">{interview.duration} Minutes</div>
                </div>
              </div>
            </div>
            <div className="">
              <p className="text-lg font-semibold mb-2">Topics:</p>
              <div className="flex flex-wrap gap-2">
                {interview.topics?.map((topic, index) => (
                  <span
                    key={index}
                    className="bg-teal-700 text-white text-sm  py-1 px-2 rounded-md"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="min-w-screen min-h-screen flex flex-col mt-8 mb-5">
        {/* <h1 className=' text-3xl flex justify-center my-2'> Interview detail page  </h1> */}

        {/* {interview && (

        <div className="bg-gray-200 dark:bg-gray-800 flex flex-col items-center justify-start p-5 ">
          {interview.isCompleted && (
            <h1 className='text-lg md:text-xl bg-green-400 p-1 rounded-md'>Interview Completed </h1>
          )}
          {interview.isCompleted === false && (
            <h1 className='text-md md:text-lg bg-red-400 p-1 rounded-md'>Interview Pending </h1>
          )}
          <div className="mx-5 md:mx-20 p-10  flex flex-col gap-3">
            <div>
              <span className="text-lg md:text-xl mr-5 ">Student Name : </span>
              <span className=" md:text-lg">{interview.intervieweeName !== null ? interview.intervieweeName : "N/A"}</span>
            </div>
            <div>
              <span className="text-lg md:text-xl mr-5 ">Interviewer  : </span>
              <span className=" md:text-lg">{interview.interviewerName ? interview.interviewerName : "N/A"}</span>
            </div>
            <div>
              <span className="text-lg md:text-xl mr-5 ">Start Time : </span>
              <span className=" md:text-lg">{moment(interview.startTime).format('MMMM Do YYYY, h:mm:ss a')}</span>
            </div>
            <div>
              <span className="text-lg md:text-xl mr-5 ">Duration : </span>
              <span className=" md:text-lg">{interview.duration} minutes</span>
            </div>
            <div>
              <span className="text-lg md:text-xl mr-5 ">Topics : </span>
              <span className=" md:text-lg">{interview.topics?.join(', ') || "N/A"}</span>
            </div>
            <div>
              <span className="text-lg md:text-xl mr-5 ">Feedback: </span>
              <span className=" md:text-lg">{interview.feedback ? "Given" : "Not Given"}</span>
            </div>
          </div>
          {interview?.interviewerId ===null && (
            <div className=''>
              <span>You want to take interview this student ? </span>
              <button className='font-semibold underline mx-2'
                onClick={assignInterviewHandler}
              >Assign to me </button>
            </div>
          )}
        </div>
      )} */}
        <div>
          <ProgressBar currentStatus={currentStatus} />
        </div>
        {dummyFeedBack && (
          <>
            <div className="max-h-96 mx-2 my-14  flex justify-center">
              <Bar
                data={{
                  labels: [
                    "Communication",
                    "Development",
                    "DSA",
                    "CS Fundamentals",
                  ],
                  // labels: interview.topics.map((topic) => topic),
                  datasets: [
                    {
                      label: "Feedback",
                      data: [
                        dummyFeedBack.communication,
                        dummyFeedBack.development,
                        dummyFeedBack.dsa,
                        dummyFeedBack.csfundamentals,
                      ],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(255, 206, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                      ],
                      borderWidth: 1,
                      // minBarThickness: 10,
                      // barThickness: 50,
                      minBarLength: 2,
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      ticks: {
                        color: theme === "dark" ? "white" : "black", // Change x-axis text color
                      },
                    },
                    y: {
                      ticks: {
                        color: theme === "dark" ? "white" : "black", // Change y-axis text color
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      labels: {
                        color: theme === "dark" ? "white" : "black", // Change dataset label color
                      },
                    },
                  },
                }}
              />
            </div>
            <div className="flex flex-col justify-center items-center max-h-52 my-10 ">
              <h1 className="text-2xl -">Overall Perfomance</h1>
              <br />
              <Doughnut
                data={{
                  labels: ["Skills", "Scope of improvement"],
                  datasets: [
                    {
                      data: [dummyFeedBack.points, 20 - dummyFeedBack.points],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                      ],
                      borderWidth: 1,
                      minBarThickness: 10,
                      barThickness: 50,
                      minBarLength: 2,
                      labelColor: "white",
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: theme === "dark" ? "white" : "black", // Change dataset label color
                      },
                    },
                  },
                }}
              />
            </div>

            <div className="flex flex-col justify-center items-center mb-5">
              {/* <h1 className='text-3xl my-2 text-blue-500'> Comments on Candidate </h1> */}
              <l>
                {dummyFeedBack.notes.map((note, index) => (
                  <li key={index} className="text-lg my-2">
                    {" "}
                    {note}{" "}
                  </li>
                ))}
              </l>
            </div>
          </>
        )}

        {ERROR && (
          <div className="flex justify-center items-center">
            <h1 className="text-lg "> Something Went Wrong ! </h1>
            <br />
            {/* <p> {Error} </p> */}
          </div>
        )}
      </div>
    </>
  );
};

export default InterviewDetails;
