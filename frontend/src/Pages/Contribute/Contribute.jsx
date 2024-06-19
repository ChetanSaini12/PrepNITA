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
      <div className="flex justify-center flex-col">
        <div className="flex items-center flex-col w-full">
          <h1 className="text-3xl">Join our Community</h1>
          <p>Be a part of someone's dream journey</p>
        </div>
        <div className="flex justify-evenly items-center gap-20 flex-wrap w-full my-10">
          <div className="bg-slate-800 shadow-xl rounded-lg w-1/3 h-full">
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
                <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded">
                  Explore
                </button>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 shadow-xl rounded-lg w-1/3 h-full">
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

          <div className="bg-slate-800 shadow-xl rounded-lg w-1/3 h-full">
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

          <div className="bg-slate-800 shadow-xl rounded-lg w-1/3 h-full">
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
