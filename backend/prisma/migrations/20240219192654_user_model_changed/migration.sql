/*
  Warnings:

  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'TRANSGENDER', 'PREFER_NOT_TO_SAY');

-- CreateEnum
CREATE TYPE "Department" AS ENUM ('Computer_Science_and_Engineering', 'Electronics_and_Instrumentation_Engineering', 'Electronics_and_Communications_Engineering', 'Electrical_Engineering', 'Mechanical_Engineering', 'Chemical_Engineering', 'Civil_Engineering', 'Production_Engineering', 'Bio_Tech_and_Bio_Engineering');

-- CreateEnum
CREATE TYPE "Course" AS ENUM ('BTech', 'PhD', 'MCA', 'MTech');

-- AlterTable
ALTER TABLE "Authentication" ADD COLUMN     "isBoarded" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "cgpa" DOUBLE PRECISION,
ADD COLUMN     "codeforcesProfile" TEXT,
ADD COLUMN     "college" TEXT,
ADD COLUMN     "college_id" TEXT,
ADD COLUMN     "course" "Course",
ADD COLUMN     "department" "Department",
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "githubProfile" TEXT,
ADD COLUMN     "graduation_year" INTEGER,
ADD COLUMN     "hosteler" BOOLEAN,
ADD COLUMN     "leetcodeProfile" TEXT,
ADD COLUMN     "linkedinProfile" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "profilePic" TEXT,
ADD COLUMN     "state" TEXT,
ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "mobileNum" DROP NOT NULL;
