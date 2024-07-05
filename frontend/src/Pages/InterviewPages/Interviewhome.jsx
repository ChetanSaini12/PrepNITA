import React, { useEffect, useState } from "react";
import { BiBookAdd } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { GET_INTERVIEW } from "../../gqlOperatons/Interview/mutations";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../Loader";
import { setLoading } from "../../app/user/userSlice";

export default function Interviewhome() {
  const { loggedIn, isLoading, id } = useSelector((state) => state.user);
  const [buttonIndex, setButtonIndex] = useState(0);
  const [data, setdata] = useState(null);
  const [interviews, setInterviews] = useState(null);
  const [ready, setReady] = useState(false);
  const [ERROR, setError] = useState(null);
  const dispatch = useDispatch();

  const [getInterviews] = useMutation(GET_INTERVIEW);

  const screenSize = window.innerWidth;
  console.log("Screen size ", screenSize);

  useEffect(() => {
    // console.log("");
    setReady(false);
    dispatch(setLoading(true));
    (async () => {
      try {
        const { data } = await getInterviews({
          variables: { intervieweeId: id },
        });
        console.log("Interviews data ", data);
        if (data) {
          setInterviews(data.getInterview);
        }
      } catch (error) {
        console.log("Error in getting interviews ", error);
        setError(error);
      }
      finally {
        dispatch(setLoading(false));
        setReady(true);
      }
    })();
  }, [data]);

  const baseButtonClass = "text-sm p-2 w-2/3 ";
  const selectedButtonClass =
    "bg-gray-200 dark:bg-gray-800 border-t border-l border-r rounded-t";
  const nonSelectedButtonClass = "border-b";

  return (
    <div className="m-6">
      <h1 className="text-3xl">Interview</h1>
      <div className="flex gap-10">
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md flex justify-center items-center flex-col gap-3 p-3 my-4 md:p-6 hover:shadow-lg transition duration-300 h-36 w-80">
          <BiBookAdd />
          <h1>Create an interview</h1>
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md flex justify-center items-center flex-col gap-3 p-3 my-4 md:p-6 hover:shadow-lg transition duration-300 h-36 w-80">
          <RiAdminFill />
          <h1>Interviews as an Admin</h1>
        </div>
      </div>
      <h1 className="text-1xl">My Interview</h1>
      <div className="flex">
        <button
          className={`${baseButtonClass} ${buttonIndex === 0 ? selectedButtonClass : nonSelectedButtonClass
            }`}
          onClick={() => setButtonIndex(0)}
        >
          Upcoming
        </button>
        <button
          className={`${baseButtonClass} ${buttonIndex === 1 ? selectedButtonClass : nonSelectedButtonClass
            }`}
          onClick={() => setButtonIndex(1)}
        >
          Ongoing
        </button>
        <button
          className={`${baseButtonClass} ${buttonIndex === 2 ? selectedButtonClass : nonSelectedButtonClass
            }`}
          onClick={() => setButtonIndex(2)}
        >
          Past
        </button>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Id</th>
            <th>IntervieweeId</th>
            <th>InterviewerId</th>
            <th>Interviewee Name</th>
            <th>Interviewer Name</th>
            <th>Completed?</th>
          </tr>
        </thead>
        <tbody>
          {interviews &&
            buttonIndex === 0 &&
            interviews
              .filter((interview) => interview.isCompleted === false)
              .map((interview, index) => (
                <tr key={index}>
                  <td>{interview.id}</td>
                  <td>{interview.intervieweeId}</td>
                  <td>{interview.interviewerId}</td>
                  <td>{interview.intervieweeName}</td>
                  <td>{interview.interviewerName}</td>
                  <td>{interview.isCompleted ? "Yes" : "No"}</td>
                </tr>
              ))}
          {interviews &&
            buttonIndex === 1 &&
            interviews
              .filter((interview) => interview.isCompleted === true)
              .map((interview, index) => (
                <tr key={index}>
                  <td>{interview.id}</td>
                  <td>{interview.intervieweeId}</td>
                  <td>{interview.interviewerId}</td>
                  <td>{interview.intervieweeName}</td>
                  <td>{interview.interviewerName}</td>
                  <td>{interview.isCompleted ? "Yes" : "No"}</td>
                </tr>
              ))}
          {interviews &&
            buttonIndex === 2 &&
            interviews
              .filter((interview) => interview.isCompleted === true)
              .map((interview, index) => (
                <tr key={index}>
                  <td>{interview.id}</td>
                  <td>{interview.intervieweeId}</td>
                  <td>{interview.interviewerId}</td>
                  <td>{interview.intervieweeName}</td>
                  <td>{interview.interviewerName}</td>
                  <td>{interview.isCompleted ? "Yes" : "No"}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

/*
"id": 44,
                "intervieweeId": 4,
                "interviewerId": null,
                "startTime": "2024-05-16T17:00:00.000Z",
                "duration": 60,
                "topics": [
                    "OS"
                ],
                "isCompleted": false,
                "intervieweeName": "chetan prakash saini",
                "interviewerName": null,
*/
