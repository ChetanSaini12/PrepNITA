import React, { useState } from "react";
import CreateQuestion from "./CreateQuestion";
import { Link, useNavigate } from 'react-router-dom';

function Contribute() {
  const interviewImg = "/interview.png";
  const companyImg = "/company.png";
  const quizImg = "/quiz.png";
  const questionImg = "/question.png";

  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen min-w-screen flex flex-col justify-center gap-5">
        {/* <div className="flex flex-col items-center "> */}
          <div className="flex items-center flex-col mt-0.5 pt-2 pb-4 bg-gray-200 dark:bg-gray-800">
            <h1 className="text-3xl">Join our Community</h1>
            <p>Be a part of someone's dream journey</p>
          {/* </div> */}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-7 mx-2 mb-10 ">
          <div className=" bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md py-5 px-10 md:p-6 hover:shadow-lg hover:bg-gray-300
             dark:hover:bg-gray-700 transition duration-300 max-w-sm ">
            <figure className="px-10 pt-10">
              <img
                src={companyImg}
                alt="Comapny Experience"
                className="rounded-xl"
              />
            </figure>
            <div className="flex flex-col items-center text-center p-6">
              <h2 className="text-2xl font-bold mb-2">
                Share a Company Drive Experience
              </h2>
              <p className="mb-4">Tell us about any company drive you had.</p>
              <div className="mt-4">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                  onClick={() => navigate("/contribute/experience")}>
                  Explore
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md py-5 px-10 md:p-6 hover:shadow-lg hover:bg-gray-300
             dark:hover:bg-gray-700 transition duration-300 max-w-sm">
            <figure className="px-10 pt-10">
              <img
                src={interviewImg}
                alt="Take an Interview"
                className="rounded-xl"
              />
            </figure>
            <div className="flex flex-col items-center text-center p-6">
              <h2 className="text-2xl font-bold mb-2">Take an Interview</h2>
              <p className="mb-4">
                Volunteer to lead an interview from the available options.
              </p>
              <div className="mt-4">
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                  Explore
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md py-5 px-10 md:p-6 hover:shadow-lg hover:bg-gray-300
             dark:hover:bg-gray-700 transition duration-300 max-w-sm ">
            <figure className="px-10 pt-10">
              <img src={quizImg} alt="Create a Quiz" className="rounded-xl" />
            </figure>
            <div className="flex flex-col items-center text-center p-6">
              <h2 className="text-2xl font-bold mb-2">Create a Quiz</h2>
              <p className="mb-4">
                Test your peers with questions only you can create!
              </p>
              <div className="mt-4">
                <button
                  onClick={() => navigate("/contribute/quiz")}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md py-5 px-10 md:p-6 hover:shadow-lg hover:bg-gray-300
             dark:hover:bg-gray-700 transition duration-300 max-w-sm ">
            <figure className="px-10 pt-10">
              <img
                src={questionImg}
                alt="Create a Question"
                className="rounded-xl"
              />
            </figure>
            <div className="flex flex-col items-center text-center p-6">
              <h1 className="text-2xl font-bold mb-2">Create a Question</h1>
              <p className="mb-4">
                Have a thought-provoking question? Share it with the world!
              </p>
              <div className="mt-4">
                <button
                  onClick={() => navigate("/contribute/question")}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contribute;
