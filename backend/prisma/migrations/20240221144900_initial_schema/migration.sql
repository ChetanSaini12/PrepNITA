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
    "email" TEXT NOT NULL,
    "username" TEXT,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "mobileNum" TEXT,
    "role" "Roles" NOT NULL DEFAULT 'USER',
    "profilePic" TEXT,
    "gender" "Gender",
    "college_id" TEXT,
    "graduation_year" INTEGER,
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

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Authentication" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "otpForEmail" TEXT,
    "otpEmailExpiry" TIMESTAMP(3),
    "otpForPasswordChange" TEXT,
    "otpPasswordChangeExpiry" TIMESTAMP(3),
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isBoarded" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "answer" TEXT,
    "postedBy" INTEGER NOT NULL,
    "tags" TEXT[],
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueAddOnLink" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "QueAddOnLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_userId_key" ON "Authentication"("userId");

-- AddForeignKey
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_postedBy_fkey" FOREIGN KEY ("postedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueAddOnLink" ADD CONSTRAINT "QueAddOnLink_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
