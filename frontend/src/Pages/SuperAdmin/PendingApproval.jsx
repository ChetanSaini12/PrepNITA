import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/client";
import { setLoading, setError } from "../../app/user/userSlice";
import { GET_ALL_QUESTIONS } from "../../gqlOperatons/Question/mutations";
import { GET_ALL_QUIZ } from "../../gqlOperatons/Quiz/mutations";
import { GET_ALL_EXPERIENCE } from "../../gqlOperatons/Experience/mutations";
import { Link, useNavigate } from "react-router-dom";
import { PiHandsClappingLight } from "react-icons/pi";
import moment from "moment";
import { Button } from "flowbite-react";
import { QueryInfo } from "@apollo/client/core/QueryInfo";

function PendingApproval() {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();

  const truncatedDescription = (description, wordLimit) => {
    const words = description?.split(" ");
    return (
      words?.slice(0, wordLimit).join(" ") +
      (words?.length > wordLimit ? "..." : "")
    );
  };

  const [getQuestions] = useMutation(GET_ALL_QUESTIONS, {
    onError: (error) => {
      console.log("error in getting questions ", error);
      dispatch(setError(error.message));
    },
  });

  const [getAllQuiz] = useMutation(GET_ALL_QUIZ, {
    onError: (error) => {
      console.log("on error at all quiz ", error);
      dispatch(setError(error.message));
    },
  });

  const [getAllExperience] = useMutation(GET_ALL_EXPERIENCE, {
    onError: (error) => {
      console.log("error in getting experience ", error);
      dispatch(setError(error.message));
    },
  });

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
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch, getQuestions, getAllQuiz, getAllExperience]);


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
    alert(`${type} ${id} approved`);
  };

  const categories = {
    Quiz: quizzes.map((item) => ({
      ...item,
      onClick: () => handleItemClick("Quiz", item.id),
      onApprove: () => handleApprove("Quiz", item.id),
    })),
    Question: questions.map((item) => ({
      ...item,
      onClick: () => handleItemClick("Question", item.id),
      onApprove: () => handleApprove("Question", item.id),
    })),
    Experience: experiences.map((item) => ({
      ...item,
      onClick: () => handleItemClick("Experience", item.id),
      onApprove: () => handleApprove("Experience", item.id),
    })),
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-semibold text-slate-300 mb-4">Question</h2>
        <div className="flex flex-col w-full">
          {categories.Question?.length === 0 && (
            <h1 className="text-2xl font-semibold">No questions to show</h1>
          )}
          <div className=" ">
            <table className="table-auto w-full my-4">
              <thead>
                <tr className="bg-gray-100 text-gray-600 font-semibold text-left">
                  <th className="px-4 py-2">Sr. No.</th>
                  <th className="px-4 py-2">Creator Name</th>
                  <th className="px-4 py-2">Question</th>
                  <th className="px-4 py-2">Answer</th>
                  <th className="px-4 py-2">Tags</th>
                  <th className="px-4 py-2">View</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.Question?.map((question, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-600"
                  >
                    <td className="px-4 py-2">{index + 1}.</td>
                    <td className="px-4 py-2">{question.creatorName}</td>
                    <td
                      className="px-4 py-2"
                      dangerouslySetInnerHTML={{
                        __html: truncatedDescription(question.description, 15),
                      }}
                    ></td>
                    <td
                      className="px-4 py-2"
                      dangerouslySetInnerHTML={{
                        __html: truncatedDescription(question.answer, 15),
                      }}
                    ></td>
                    <td className="px-4 py-2">
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
                    <td className="px-4 py-2">
                      <Button
                        size="xs"
                        pill
                        gradientMonochrome="teal"
                        onClick={question.onClick}
                      >
                        View
                      </Button>
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        size="xs"
                        pill
                        gradientMonochrome="success"
                        onClick={question.onApprove}
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
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-semibold text-slate-300 mb-4">Quiz</h2>
        {categories.Quiz?.length == 0 ? (
          <div className="w-full flex justify-items-center">
            <h1 className="text-2xl font-semibold">No quiz to show</h1>
          </div>
        ) : (
          <div className=" w-full ">
            <table className="table-auto w-full my-4">
              <thead>
                <tr className="bg-gray-100 text-gray-600 font-semibold text-left">
                  <th className="px-4 py-2">Sr. No.</th>
                  <th className="px-4 py-2">Creator Name</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Start Time</th>
                  <th className="px-4 py-2">End Time</th>
                  <th className="px-4 py-2">View</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.Quiz?.map((quiz, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-600 transition-all"
                  >
                    <td className="px-4 py-2">{index + 1}.</td>
                    <td className="px-4 py-2">{quiz.creatorName}</td>
                    <td className="px-4 py-2">{quiz.title}</td>
                    <td className="px-4 py-2">
                      {moment(quiz.startTime).format("MMMM Do YYYY, h:mm a")}
                    </td>
                    <td className="px-4 py-2">
                      {moment(quiz.endTime).format("MMMM Do YYYY, h:mm a")}
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        size="xs"
                        pill
                        gradientMonochrome="teal"
                        onClick={quiz.onClick}
                      >
                        View
                      </Button>
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        size="xs"
                        pill
                        gradientMonochrome="success"
                        onClick={quiz.onApprove}
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
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-2xl font-semibold text-slate-300 mb-4">
          Experience
        </h2>
        {categories.Experience?.length === 0 ? (
          <div className="w-full flex justify-items-center">
            <h1 className="text-2xl font-semibold">No experience to show</h1>
          </div>
        ) : (
          <div className="w-full ">
            <table className="table-auto w-full my-4">
              <thead>
                <tr className="bg-gray-100 text-gray-600 font-semibold text-left">
                  <th className="px-4 py-2">Sr. No.</th>
                  <th className="px-4 py-2">Creator Name</th>
                  <th className="px-4 py-2">Company Name</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Created On</th>
                  <th className="px-4 py-2">View</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.Experience?.map((experience, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-600"
                  >
                    <td className="px-4 py-2">{index + 1}.</td>
                    <td className="px-4 py-2">{experience.creatorName}</td>
                    <td className="px-4 py-2">{experience.company}</td>
                    <td className="px-4 py-2">{experience.role}</td>
                    <td className="px-4 py-2">
                      {experience.type == "ON_CAMPUS"
                        ? "On Campus"
                        : "Off Campus"}
                    </td>
                    <td className="px-4 py-2">
                      {moment(experience.createdAt).format("MMMM Do YYYY")}
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        size="xs"
                        pill
                        gradientMonochrome="teal"
                        onClick={experience.onClick}
                      >
                        View
                      </Button>
                    </td>
                    <td className="px-4 py-2">
                      <Button
                        size="xs"
                        pill
                        gradientMonochrome="success"
                        onClick={experience.onApprove}
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
    </div>
  );
}

export default PendingApproval;
