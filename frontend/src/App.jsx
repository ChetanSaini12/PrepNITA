import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Quizes from "./Pages/Quizes";
import Discuss from "./Pages/Discuss";
import SignUp from "./Pages/SignUp";
// import SignIn from "./Pages/SignIn";
import FooterCom from "./Components/Footer";
import AllUsers from "./Pages/AllUsers";
import Interviews from "./Pages/Interview";
import { Profile } from "./Pages/Profile";
import Question from "./Pages/Questions/Question.jsx";
import CreateQuestion from "./Pages/Questions/CreateQuestion.jsx";
import DisplayUsers from "./Pages/DisplayUsers.jsx";
import Onboarding from "./Pages/Onboarding";
import Interview from "./Pages/Interview.jsx";
import InterviewDetail from "./Pages/InterviewDetail.jsx";
import PageNotFound from "./Pages/404Page.jsx";
import QuestionById from "./Pages/Questions/QuestionById.jsx";
import "particles.js/particles";

function App() {
  window.particlesJS.load("particles", "/particlesjs-config.json");

  return (
    <div className="App">
      <div className="relative">
        <div className="fixed top-0 left-0 -z-50">
          <div
            id="particles"
            className="w-screen h-screen bg-white dark:bg-[rgb(16,23,42)] color : "
          />
        </div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/faltu" element={<AllUsers />}></Route>
            <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route path="/quizes" element={<Quizes></Quizes>}></Route>
            <Route path="/discuss" element={<Discuss></Discuss>}></Route>
            {/* <Route path="/login" element={<SignIn></SignIn>}></Route> */}
            <Route path="/register" element={<SignUp></SignUp>}></Route>
            {/* <Route path="/interview" element={<Interviews />}></Route> */}
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/questions" element={<Question />}></Route>
            <Route path="/questions/:id" element={<QuestionById />}></Route>
            <Route path="/create_question" element={<CreateQuestion />}></Route>
            <Route path="/students" element={<AllUsers />}></Route>
            <Route path="/onBoarding" element={<Onboarding />}></Route>
            <Route path="/interview" element={<Interview />}></Route>
            <Route path="/interview/:id" element={<InterviewDetail />}></Route>
            <Route path="/*" element={<PageNotFound />}></Route>
          </Routes>
          <FooterCom></FooterCom>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
