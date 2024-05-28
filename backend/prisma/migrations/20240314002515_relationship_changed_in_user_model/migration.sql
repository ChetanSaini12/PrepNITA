-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "user_contribution_user_fk";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "user_information_user_fk";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "user_training_user_fk";

-- RenameForeignKey
ALTER TABLE "Article" RENAME CONSTRAINT "Article_createdBy_fkey" TO "article_user_fk";

-- RenameForeignKey
ALTER TABLE "Feedback" RENAME CONSTRAINT "Feedback_interviewId_fkey" TO "feedback_interview_fk";

-- RenameForeignKey
ALTER TABLE "Interview" RENAME CONSTRAINT "Interview_intervieweeId_fkey" TO "interviewee_user_contribution_fk";

-- RenameForeignKey
ALTER TABLE "Interview" RENAME CONSTRAINT "Interview_interviewerId_fkey" TO "interviewer_user_contribution_fk";

-- RenameForeignKey
ALTER TABLE "QueAddOnLink" RENAME CONSTRAINT "QueAddOnLink_questionId_fkey" TO "question_add_onlink_fk";

-- RenameForeignKey
ALTER TABLE "Question" RENAME CONSTRAINT "Question_createdBy_fkey" TO "question_user_contribution_fk";

-- RenameForeignKey
ALTER TABLE "Quiz" RENAME CONSTRAINT "Quiz_createdBy_fkey" TO "quiz_user_contribution_fk";

-- RenameForeignKey
ALTER TABLE "QuizAttendance" RENAME CONSTRAINT "QuizAttendance_quizId_fkey" TO "quiz_qttendence_quiz_fk";

-- RenameForeignKey
ALTER TABLE "QuizAttendance" RENAME CONSTRAINT "QuizAttendance_userId_fkey" TO "quiz_attendence_traingin_fk";

-- RenameForeignKey
ALTER TABLE "QuizQuestion" RENAME CONSTRAINT "QuizQuestion_quizId_fkey" TO "quiz_question_quiz_fk";

-- AddForeignKey
ALTER TABLE "UserInformation" ADD CONSTRAINT "user_information_user_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authentication" ADD CONSTRAINT "authentication_user_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserContribution" ADD CONSTRAINT "user_contribution_user_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserTraining" ADD CONSTRAINT "user_training_user_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
