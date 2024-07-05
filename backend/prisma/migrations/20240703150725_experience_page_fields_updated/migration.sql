-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('ON_CAMPUS', 'OFF_CAMPUS');

-- AlterEnum
ALTER TYPE "Course" ADD VALUE 'Other';

-- AlterEnum
ALTER TYPE "Department" ADD VALUE 'OTHER';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Gender" ADD VALUE 'NON_BINARY';
ALTER TYPE "Gender" ADD VALUE 'GENDERQUEER';
ALTER TYPE "Gender" ADD VALUE 'AGENDER';
ALTER TYPE "Gender" ADD VALUE 'TWO_SPIRIT';
ALTER TYPE "Gender" ADD VALUE 'OTHER';

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "eventDate" TIMESTAMP(3) NOT NULL DEFAULT '2024-07-03 14:58:39.091 +00:00',
ADD COLUMN     "helperPic" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/ddxrqyl1c/image/upload/v1720018573/98994d307591550b1e2a0ba1bdab80d8_eyq5z2.jpg',
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'Bangalore, Karnataka, India',
ADD COLUMN     "type" "ExperienceType" NOT NULL DEFAULT 'ON_CAMPUS';

-- AlterTable
ALTER TABLE "UserInformation" ALTER COLUMN "profilePic" SET DEFAULT 'https://res.cloudinary.com/ddxrqyl1c/image/upload/v1720017347/bdc3eb5c01c7846632a85c2cea776019_w4q1dt.jpg';
