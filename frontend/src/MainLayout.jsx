import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import FooterCom from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";

// Pages
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Quizes from "./Pages/Quiz/Quizes.jsx";
import Discuss from "./Pages/Discuss";
import SignUp from "./Pages/SignUp";
import AllUsers from "./Pages/UserPages/AllUsers.jsx";
import { Profile } from "./Pages/UserPages/Profile.jsx";
import CreateQuestion from "./Pages/Contribute/CreateQuestion.jsx";
import Question from "./Pages/Questions/Question.jsx";
import Onboarding from "./Pages/Onboarding";
import Interview from "./Pages/InterviewPages/Interview.jsx";
import InterviewDetail from "./Pages/InterviewPages/InterviewDetail.jsx";
import PageNotFound from "./Pages/404Page.jsx";
import QuestionById from "./Pages/Questions/QuestionById.jsx";
import { ProfileById } from "./Pages/UserPages/ProfileById.jsx";
import AdminInterview from "./Pages/InterviewPages/adminInterview.jsx";
import { CreateQuiz } from "./Pages/Contribute/CreateQuiz.jsx";
import QuizDetail from "./Pages/Quiz/QuizDetail.jsx";
import ParticipateQuiz from "./Pages/Quiz/ParticipateQuiz.jsx";
import Contribute from "./Pages/Contribute/Contribute.jsx";
import TextEditor from "./Components/sampleTextEditor.jsx";
import CreateExperience from "./Pages/Contribute/CreateExperience.jsx";
import RoleManagement from "./Pages/UserPages/RoleManagement.jsx";
import MyQuizes from "./Pages/Quiz/MyQuizes.jsx";
import { AllExperience } from "./Pages/Experience/AllExperience.jsx";
import { ExperienceById } from "./Pages/Experience/ExperienceById.jsx";
import PendingApproval from "./Pages/SuperAdmin/PendingApproval.jsx";
import EditorPage from "./Pages/InterviewPages/EditorPage.js";

const MainLayout = () => {
  const location = useLocation();

  // Define routes where Header and Footer should be hidden
  const hideNavAndFooter = ["/editor"];
  const shouldHideNavAndFooter = hideNavAndFooter.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <ScrollToTop />
      {!shouldHideNavAndFooter && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/faltu" element={<AllUsers />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quizes" element={<Quizes />} />
        <Route path="/quizes/my" element={<MyQuizes />} />
        <Route path="/contribute/quiz" element={<CreateQuiz />} />
        <Route path="/contribute/experience" element={<CreateExperience />} />
        <Route path="/contribute/question" element={<CreateQuestion />} />
        <Route path="/quiz/id/:id" element={<QuizDetail />} />
        <Route path="/quiz/view/:id" element={<ParticipateQuiz />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
        <Route path="/discuss" element={<Discuss />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:username" element={<ProfileById />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/questions/:id" element={<QuestionById />} />
        <Route path="/role_management" element={<RoleManagement />} />
        <Route path="/students" element={<AllUsers />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/interviewdummyadmin" element={<AdminInterview />} />
        <Route path="/interview/:id" element={<InterviewDetail />} />
        <Route path="/experience" element={<AllExperience />} />
        <Route path="/experience/:id" element={<ExperienceById />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/texted" element={<TextEditor />} />
        <Route path="/pending_approval" element={<PendingApproval />} />
        <Route path="/notFound" element={<PageNotFound />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      {!shouldHideNavAndFooter && <FooterCom />}
    </>
  );
};

export default MainLayout;
