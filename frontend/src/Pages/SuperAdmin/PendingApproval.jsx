import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { setLoading, setError } from "../../app/user/userSlice";
import { CHANGE_APPROVE_STATUS_OF_QUE, GET_ALL_QUESTIONS } from "../../gqlOperatons/Question/mutations";
import { CHANGE_APPROVE_STATUS_OF_QUIZ, GET_ALL_QUIZ } from "../../gqlOperatons/Quiz/mutations";
import { GET_ALL_EXPERIENCE } from "../../gqlOperatons/Experience/mutations";
import { Link, useNavigate } from "react-router-dom";
import { PiHandsClappingLight } from "react-icons/pi";
import moment from "moment";
import { Button, Toast } from "flowbite-react";
import { QueryInfo } from "@apollo/client/core/QueryInfo";
import { Loader } from '../Loader';
import toast from "react-hot-toast";
import Pagination from "../../Components/Pagination";

function PendingApproval() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, ready, loggedIn } = useSelector((state) => state.user);

  const [questions, setQuestions] = useState(null);
  const [quizzes, setQuizzes] = useState(null);
  const [experiences, setExperiences] = useState(null);
  const [ERROR, setError] = useState(null);
  const [queryType, setQueryType] = useState("Question");
  const [categories, setCategories] = useState({});
  const [currentEntries, setCurrentEntries] = useState([]);
  const [totalEntries, setTotalEntries] = useState(0);

  const entriesPerPage = 10;


  const [getQuestions] = useMutation(GET_ALL_QUESTIONS);
  const [getAllQuiz] = useMutation(GET_ALL_QUIZ);
  const [getAllExperience] = useMutation(GET_ALL_EXPERIENCE);
  const [approveQuestion] = useMutation(CHANGE_APPROVE_STATUS_OF_QUE);
  const [approveQuiz] = useMutation(CHANGE_APPROVE_STATUS_OF_QUIZ);
  // const [approveExperience] = useMutation(CHANGE_APPROVE_STATUS_);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));

      try {
        const { data: questionData } = await getQuestions({
          variables: { isApproved: false },
        });
        const { data: quizData } = await getAllQuiz({
          variables: { isApproved: false },
        });
        const { data: experienceData } = await getAllExperience({
          variables: { isApproved: false },
        });

        setQuestions(questionData?.getQuestions || []);
        setQuizzes(quizData?.getAllQuiz || []);
        setExperiences(experienceData?.getAllExperience || []);
      } catch (error) {
        // Error is handled in onError of useMutation
        setError(error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, getQuestions, getAllQuiz, getAllExperience]);


  const truncatedDescription = (description, wordLimit) => {
    const words = description?.split(" ");
    return (
      words?.slice(0, wordLimit).join(" ") +
      (words?.length > wordLimit ? "..." : "")
    );
  };

  const handleItemClick = (type, id) => {
    let url;
    switch (type) {
      case 'Experience':
        url = `/experience/${id}`;
        break;
      case 'Quiz':
        url = `/quiz/id/${id}`;
        break;
      case 'Question':
        url = `/questions/${id}`;
        break;
      default:
        return;
    }
    window.open(url, '_blank');
  };

  const handleApprove = (type, id) => {
    const userConfirmation = window.confirm(`You are sure to approve ${type} ${id} ?`);
    if (!userConfirmation) return;
    // if(type === 'Question') {
    //   approveQuestion({
    //     variables: { id },
    //     refetchQueries: [{ query: GET_ALL_QUESTIONS, variables: { isApproved: false } }],
    //   });
    // }
    // if(type === 'Quiz') {
    //   approveQuiz({
    //     variables: { id },
    //     refetchQueries: [{ query: GET_ALL_QUIZ, variables: { isApproved: false } }],
    //   });
    // }
  

  };

  useEffect(() => {
    // setCategories({
    //   Quiz: quizzes?.map((item) => ({
    //     ...item,
    //     onClick: () => handleItemClick("Quiz", item.id),
    //     onApprove: () => handleApprove("Quiz", item.id),
    //   })),
    //   Question: questions?.map((item) => ({
    //     ...item,
    //     onClick: () => handleItemClick("Question", item.id),
    //     onApprove: () => handleApprove("Question", item.id),
    //   })),
    //   Experience: experiences?.map((item) => ({
    //     ...item,
    //     onClick: () => handleItemClick("Experience", item.id),
    //     onApprove: () => handleApprove("Experience", item.id),
    //   })),
    // });
    queryType === 'Question' && setCurrentEntries(questions?.slice(0, entriesPerPage));
    queryType === 'Quiz' && setCurrentEntries(quizzes?.slice(0, entriesPerPage));
    queryType === 'Experience' && setCurrentEntries(experiences?.slice(0, entriesPerPage));
    // setCurrentEntries(questions?.slice(0, entriesPerPage));
  }, [questions, quizzes, experiences]);

  const handlePageChange = (pageNumber) => {
    const start = (pageNumber - 1) * entriesPerPage;
    const end = start + entriesPerPage;
    if (queryType === 'Question') {
      setCurrentEntries(questions.slice(start, end));
    }
    if (queryType === 'Quiz') {
      setCurrentEntries(quizzes.slice(start, end));
    }
    if (queryType === 'Experience') {
      setCurrentEntries(experiences.slice(start, end));
    }
  };
  const setType = (type, length) => {
    setQueryType(type);
    setTotalEntries(length);
    type === 'Question' && setCurrentEntries(questions?.slice(0, entriesPerPage));
    type === 'Quiz' && setCurrentEntries(quizzes?.slice(0, entriesPerPage));
    type === 'Experience' && setCurrentEntries(experiences?.slice(0, entriesPerPage));
  };

  const baseButtonClass = "py-1 px-2 rounded-lg bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600";
  const selectedButtonClass = 'underline underline-offset-4';
  if (isLoading || !ready) {
    return <Loader />;
  }
  if (ERROR) {
    console.log("error", ERROR);
    toast.error(ERROR.message ? ERROR.message : "Something went wrong");
    setTimeout(() => {
      setError(null);
    }, 2000);
  }



  return (
    <div className="px-2 md:p-6 flex flex-col gap-2 min-h-screen max-w-screen">
      <div className="mt-10  flex flex-col gap-2 items-center justify-center">
        {/* FILTER SECTION */}
        <div className="flex gap-4 justify-center items-center">
          <button className={`${baseButtonClass} ${queryType === 'Question' ? selectedButtonClass : ""}`}
            onClick={() => setType("Question", questions.length)}  >Questions</button>
          <button className={`${baseButtonClass} ${queryType === 'Quiz' ? selectedButtonClass : ""} `}
            onClick={() => setType("Quiz", quizzes.length)} >Quizzes</button>
          <button className={`${baseButtonClass} ${queryType === 'Experience' ? selectedButtonClass : ""}`}
            onClick={() => setType("Experience", experiences.length)} >Experiences</button>
        </div>
        <div className="w-full mt-5 mb-7 border border-gray-300 dark:border-gray-700">
          {/* just a line for seperation */}
        </div>
      </div>

      {queryType === 'Question' && (
        <>
          {!questions && (
            <div className="text-lg sm:text-xl flex justify-center items-center">
              <h1>Please wait...  </h1>
            </div>
          )}
          {questions && questions.length === 0 && (
            <div className="text-lg sm:text-xl flex justify-center items-center">
              <h1>No pending questions</h1>
            </div>
          )}
          {questions && questions.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-semibold  mb-2">Questions</h2>
              <div className="flex flex-col w-full">
                {/* {categories.Question?.length === 0 && (
                  <h1 className="text-2xl font-semibold">No questions to show</h1>
                )} */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full my-4">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-500 md:py-2 font-semibold text-left">
                        <th className="px-2 md:px-4 py-2">Sr. No.</th>
                        <th className="px-2 md:px-4 py-2">Creator Name</th>
                        <th className="px-2 md:px-4 py-2">Question</th>
                        <th className="px-2 md:px-4 py-2">Answer</th>
                        <th className="px-2 md:px-4 py-2">Tags</th>
                        <th className="px-2 md:px-4 py-2">View</th>
                        <th className="px-2 md:px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {currentEntries.map((entry, index) => (
          <div key={index}>{entry}</div> // Customize rendering as needed
        ))} */}
                      {currentEntries?.map((question, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          <td className="px-2 md:px-4 py-2">{index + 1}.</td>
                          <td className="px-2 md:px-4 py-2">{question.creatorName}</td>
                          <td
                            className="px-2 md:px-4 py-2"
                            dangerouslySetInnerHTML={{
                              __html: truncatedDescription(question.description, 15),
                            }}
                          ></td>
                          <td
                            className="px-2 md:px-4 py-2"
                            dangerouslySetInnerHTML={{
                              __html: truncatedDescription(question.answer, 15),
                            }}
                          ></td>
                          <td className="px-2 md:px-4 py-2">
                            <div className="flex gap-2 items-center">
                              {question.tags?.slice(0, 3).map((tag, index) => (
                                <div
                                  key={index}
                                  className=" bg-gray-300 dark:bg-gray-600  rounded-md px-1.5 py-1 text-xs break-word"
                                  style={{
                                    wordWrap: "break-word",
                                    wordBreak: "break-all",
                                    whiteSpace: "normal",
                                  }}
                                  dangerouslySetInnerHTML={{ __html: tag }}
                                />
                              ))}
                            </div>
                          </td>
                          <td className="px-2 md:px-4 py-2">
                            <Button
                              size="xs"
                              pill
                              gradientMonochrome="teal"
                              onClick={() => handleItemClick("Question", question.id)}
                            >
                              View
                            </Button>
                          </td>
                          <td className="px-2 md:px-4 py-2">
                            <Button
                              size="xs"
                              pill
                              gradientMonochrome="success"
                              onClick={() => handleApprove("Question", question.id)}
                            >
                              Approve
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {queryType === 'Quiz' && (
        <>
          {!quizzes && (
            <div className="flex justify-center items-center">
              <h2>Please wait...</h2>
            </div>
          )}
          {quizzes && quizzes.length === 0 && (
            <div className="flex justify-center items-center">
              <h2>No pending quizzes</h2>
            </div>
          )}
          {quizzes && quizzes.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">Quizzes</h2>
              {categories.Quiz?.length == 0 ? (
                <div className="w-full flex justify-items-center">
                  <h1 className="text-2xl font-semibold">No quiz to show</h1>
                </div>
              ) : (
                <div className=" w-full overflow-x-auto ">
                  <table className="table-auto w-full my-4">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-500 md:py-2 font-semibold text-left">
                        <th className="px-2 md:px-4 py-2">Sr. No.</th>
                        <th className="px-2 md:px-4 py-2">Creator Name</th>
                        <th className="px-2 md:px-4 py-2">Title</th>
                        <th className="px-2 md:px-4 py-2">Start Time</th>
                        <th className="px-2 md:px-4 py-2">End Time</th>
                        <th className="px-2 md:px-4 py-2">View</th>
                        <th className="px-2 md:px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEntries?.map((quiz, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                        >
                          <td className="px-2 md:px-4 py-2">{index + 1}.</td>
                          <td className="px-2 md:px-4 py-2">{quiz.creatorName}</td>
                          <td className="px-2 md:px-4 py-2">{quiz.title}</td>
                          <td className="px-2 md:px-4 py-2">
                            {moment(quiz.startTime).format("MMMM Do YYYY, h:mm a")}
                          </td>
                          <td className="px-2 md:px-4 py-2">
                            {moment(quiz.endTime).format("MMMM Do YYYY, h:mm a")}
                          </td>
                          <td className="px-2 md:px-4 py-2">
                            <Button
                              size="xs"
                              pill
                              gradientMonochrome="teal"
                              onClick={() => handleItemClick("Quiz", quiz.id)}
                            >
                              View
                            </Button>
                          </td>
                          <td className="px-2 md:px-4 py-2">
                            <Button
                              size="xs"
                              pill
                              gradientMonochrome="success"
                              onClick={() => handleApprove("Quiz", quiz.id)}
                            >
                              Approve
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {queryType === 'Experience' && (
        <>
          {!experiences && (
            <div className="flex justify-center items-center">
              <h2>Please wait...</h2>
            </div>
          )}
          {experiences && experiences.length === 0 && (
            <div className="flex justify-center items-center">
              <h2>No pending experiences</h2>
            </div>
          )}
          {experiences && experiences.length > 0 && (
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                Experiences
              </h2>
              {categories.Experience?.length === 0 ? (
                <div className="w-full flex justify-items-center">
                  <h1 className="text-2xl font-semibold">No experience to show</h1>
                </div>
              ) : (
                <div className="w-full overflow-x-auto ">
                  <table className="table-auto w-full my-4">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-500 md:py-2 font-semibold text-left">
                        <th className="px-2 md:px-4 py-2">Sr. No.</th>
                        <th className="px-2 md:px-4 py-2">Creator Name</th>
                        <th className="px-2 md:px-4 py-2">Company Name</th>
                        <th className="px-2 md:px-4 py-2">Role</th>
                        <th className="px-2 md:px-4 py-2">Type</th>
                        <th className="px-2 md:px-4 py-2">Created On</th>
                        <th className="px-2 md:px-4 py-2">View</th>
                        <th className="px-2 md:px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentEntries?.map((experience, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          <td className="px-2 md:px-4 py-2">{index + 1}.</td>
                          <td className="px-2 md:px-4 py-2">{experience.creatorName}</td>
                          <td className="px-2 md:px-4 py-2">{experience.company}</td>
                          <td className="px-2 md:px-4 py-2">{experience.role}</td>
                          <td className="px-2 md:px-4 py-2">
                            {experience.type == "ON_CAMPUS"
                              ? "On Campus"
                              : "Off Campus"}
                          </td>
                          <td className="px-2 md:px-4 py-2">
                            {moment(experience.createdAt).format("MMMM Do YYYY")}
                          </td>
                          <td className="px-2 md:px-4 py-2">
                            <Button
                              size="xs"
                              pill
                              gradientMonochrome="teal"
                              onClick={() => handleItemClick("Experience", experience.id)}
                            >
                              View
                            </Button>
                          </td>
                          <td className="px-2 md:px-4 py-2">
                            <Button
                              size="xs"
                              pill
                              gradientMonochrome="success"
                              onClick={() => handleApprove("Experience", experience.id)}
                            >
                              Approve
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </>
      )}
      {/* //PAGGING */}
      <Pagination
        totalEntries={totalEntries}
        entriesPerPage={entriesPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default PendingApproval;
