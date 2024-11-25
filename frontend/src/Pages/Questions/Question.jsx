import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_TEMP_QUE } from "../../gqlOperatons/Question/queries";
import {
  CHANGE_APPROVE_STATUS_OF_QUE,
  DOWN_VOTE_QUESTION,
  GET_ALL_QUESTIONS,
  UP_VOTE_QUESTION,
} from "../../gqlOperatons/Question/mutations";
import { Button, Table, TableRow } from "flowbite-react";
import { Loader } from "../Loader";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../app/user/userSlice";
import { PiHandsClappingLight } from "react-icons/pi";
import SearchBar from "../../Components/SearchBar";
// search_options setFilter filter text setText handleClickSearch

const Question = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    ready,
    role,
    id: userId,
  } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  console.log("userId", userId);

  const [ERROR, setError] = useState(null);
  const [tempQ, setTempQ] = useState(null);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showCreateQuestion, setShowCreateQuestion] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [tags, setTags] = useState([]); // State to store user-entered tags
  const [inputTag, setInputTag] = useState(""); // State for the current input

  const [getQuestions] = useMutation(GET_ALL_QUESTIONS);
  const [changeStatus] = useMutation(CHANGE_APPROVE_STATUS_OF_QUE);
  const [downVote] = useMutation(DOWN_VOTE_QUESTION);
  const [upVote] = useMutation(UP_VOTE_QUESTION);

  const handleAddTag = () => {
    if (inputTag.trim() && !tags.includes(inputTag)) {
      setTags((prevTags) => [...prevTags, inputTag.trim()]);
      setInputTag(""); // Clear input field
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  console.log("data from questions page ", data);
  const updateQuestionStatus = (Q_id) => {
    changeStatus({
      variables: {
        QuestionId: Q_id,
      },
    });
  };
  const downVoteQuestion = (Q_id) => {
    downVote({
      variables: {
        QuestionId: Q_id,
      },
    });
  };
  const upVoteQuestion = (Q_id) => {
    upVote({
      variables: {
        QuestionId: Q_id,
      },
    });
  };

  useEffect(() => {
    dispatch(setLoading(true));
    (async () => {
      try {
        const { data } = await getQuestions({
          variables: { tags }, // Pass tags as variables to the mutation
        });
        console.log("res from getQuestions", data);
        if (data) {
          setData(data.getQuestions);
          dispatch(setLoading(false));
        }
      } catch (error) {
        dispatch(setLoading(false));
        setError(error);
      }
    })();
  }, [tags]); // Re-fetch data when tags change

  useEffect(() => {
    setLoading(true);
    setData(data);
    setLoading(false);
  }, [refresh]);

  const handelShowQuestion = (e) => {
    e.preventDefault();
    setShowCreateQuestion(true);
  };
  const handleCancel = (e) => {
    e.preventDefault();
    setShowCreateQuestion(false);
  };

  const truncatedDescription = (description, wordLimit) => {
    const words = description.split(" ");
    return (
      words.slice(0, wordLimit).join(" ") +
      (words.length > wordLimit ? "..." : "")
    );
  };

  if (isLoading || !ready) {
    return <Loader />;
  }
  //   if (ERROR) {
  //     console.log("error from question page ", ERROR);
  //     toast.error(ERROR.message ? ERROR.message : "Error fetching questions");
  //   }
  return (
    <div className="flex flex-col my-3 items-center py-0.5 gap-5 min-w-screen max-w-screen min-h-screen">
      <h1 className="mx-1 w-full text-xl sm:text-3xl font-bold  text-center">
        Explore the world{" "}
      </h1>
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={inputTag}
            onChange={(e) => setInputTag(e.target.value)}
            placeholder="Enter a tag"
            className="flex-grow px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleAddTag}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Tag
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md"
            >
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(tag)}
                className="px-2 py-1 text-xs text-red-600 bg-red-100 rounded-full hover:bg-red-200 dark:bg-red-800 dark:text-red-400 dark:hover:bg-red-700 focus:outline-none"
              >
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col w-full">
        {ready && data?.length === 0 && (
          <h1 className="text-2xl font-semibold">No questions to show</h1>
        )}
        {ready &&
          data &&
          data?.map((question, index) => {
            return (
              <div
                key={index}
                className="mx-5 sm:mx-20 flex flex-col bg-gray-200 dark:bg-gray-800 dark:opacity-75 rounded shadow-md py-4 px-4 md:px-6  hover:shadow-lg hover:bg-gray-400
                         dark:hover:bg-gray-700 transition duration-300  mb-2"
              >
                <Link to={`/questions/${question.id}`}>
                  <div className="flex justify-between items-center gap-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center w-full  ">
                      {/* EXP DESCRIPTION */}
                      <div className="flex gap-1 justify-start items-start">
                        <h3>{index + 1}.</h3>
                        <div
                          className="text-pretty text-base -mt-0.5 leading-relaxed text-slate-600 dark:text-slate-400"
                          dangerouslySetInnerHTML={{
                            __html: truncatedDescription(
                              question.description,
                              15
                            ),
                          }}
                        />
                      </div>

                      {/* TAGS , LIKES  */}
                      <div className=" ml-3 text-xs flex flex-wrap justify-start gap-4">
                        <div className="flex gap-1 items-center ">
                          <PiHandsClappingLight size={13} />
                          <h3 className="">
                            {question.upvotes - question.downvotes}
                          </h3>
                        </div>
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
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Question;
