-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('USER', 'ADMIN', 'SUPERADMIN', 'MANAGER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'TRANSGENDER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('COMPUTER_SCIENCE_AND_ENGINEERING', 'ELECTRONICS_AND_INSTRUMENTATION_ENGINEERING', 'ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING', 'ELECTRICAL_ENGINEERING', 'MECHANICAL_ENGINEERING', 'CHEMICAL_ENGINEERING', 'CIVIL_ENGINEERING', 'PRODUCTION_ENGINEERING', 'BIO_TECH_AND_BIO_ENGINEERING');

-- CreateEnum
CREATE TYPE "Course" AS ENUM ('BTech', 'PhD', 'MCA', 'MTech');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInformation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "mobileNum" TEXT,
    "role" "Roles" NOT NULL DEFAULT 'USER',
    "profilePic" TEXT,
    "gender" "Gender",
    "collegeId" TEXT,
    "graduationYear" INTEGER,
    "cgpa" DOUBLE PRECISION,
    "college" TEXT,
    "department" "Department",
    "course" "Course",
    "state" TEXT,
    "hosteler" BOOLEAN,
    "leetcodeProfile" TEXT,
    "codeforcesProfile" TEXT,
    "linkedinProfile" TEXT,
    "githubProfile" TEXT,

    CONSTRAINT "UserInformation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authentication" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "otpForEmail" TEXT,
    "otpEmailExpiry" TIMESTAMP(3),
    "otpForExtra" TEXT,
    "otpExtraExpiry" TIMESTAMP(3),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isBoarded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserContribution" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "contributionPoints" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserContribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTraining" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "trainingPoints" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserTraining_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "answer" TEXT,
    "createdBy" INTEGER NOT NULL,
    "tags" TEXT[],
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isVisibile" BOOLEAN NOT NULL DEFAULT false,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueAddOnLink" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "QueAddOnLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "isVisibile" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizAttendance" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "QuizAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizQuestion" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "options" TEXT[],
    "correctOption" INTEGER NOT NULL,

    CONSTRAINT "QuizQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "createdBy" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "isVisibile" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interview" (
    "id" SERIAL NOT NULL,
    "interviewerId" INTEGER NOT NULL,
    "intervieweeId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "topics" TEXT[],
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Interview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "interviewId" INTEGER NOT NULL,
    "communication" INTEGER NOT NULL DEFAULT 0,
    "development" INTEGER NOT NULL DEFAULT 0,
    "dsa" INTEGER NOT NULL DEFAULT 0,
    "csfundamentals" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT[],
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInformation_id_key" ON "UserInformation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserInformation_userId_key" ON "UserInformation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserInformation_email_key" ON "UserInformation"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserInformation_username_key" ON "UserInformation"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_id_key" ON "Authentication"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_userId_key" ON "Authentication"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserContribution_id_key" ON "UserContribution"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserContribution_userId_key" ON "UserContribution"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserTraining_id_key" ON "UserTraining"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserTraining_userId_key" ON "UserTraining"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Question_id_key" ON "Question"("id");

-- CreateIndex
CREATE UNIQUE INDEX "QueAddOnLink_id_key" ON "QueAddOnLink"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_id_key" ON "Quiz"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_createdBy_key" ON "Quiz"("createdBy");

-- CreateIndex
CREATE UNIQUE INDEX "QuizAttendance_id_key" ON "QuizAttendance"("id");

-- CreateIndex
CREATE UNIQUE INDEX "QuizQuestion_id_key" ON "QuizQuestion"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Article_id_key" ON "Article"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Interview_id_key" ON "Interview"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_id_key" ON "Feedback"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_interviewId_key" ON "Feedback"("interviewId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "user_information_user_fk" FOREIGN KEY ("id") REFERENCES "UserInformation"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_id_fkey" FOREIGN KEY ("id") REFERENCES "Authentication"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "user_contribution_user_fk" FOREIGN KEY ("id") REFERENCES "UserContribution"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "user_training_user_fk" FOREIGN KEY ("id") REFERENCES "UserTraining"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "UserContribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueAddOnLink" ADD CONSTRAINT "QueAddOnLink_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "UserContribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttendance" ADD CONSTRAINT "QuizAttendance_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizAttendance" ADD CONSTRAINT "QuizAttendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserTraining"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizQuestion" ADD CONSTRAINT "QuizQuestion_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "UserContribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "UserContribution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "Interview_intervieweeId_fkey" FOREIGN KEY ("intervieweeId") REFERENCES "UserTraining"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_interviewId_fkey" FOREIGN KEY ("interviewId") REFERENCES "Interview"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
