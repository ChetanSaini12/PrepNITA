/*
  Warnings:

  - The values [Computer_Science_and_Engineering,Electronics_and_Instrumentation_Engineering,Electronics_and_Communications_Engineering,Electrical_Engineering,Mechanical_Engineering,Chemical_Engineering,Civil_Engineering,Production_Engineering,Bio_Tech_and_Bio_Engineering] on the enum `Department` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Department_new" AS ENUM ('COMPUTER_SCIENCE_AND_ENGINEERING', 'ELECTRONICS_AND_INSTRUMENTATION_ENGINEERING', 'ELECTRONICS_AND_COMMUNICATIONS_ENGINEERING', 'ELECTRICAL_ENGINEERING', 'MECHANICAL_ENGINEERING', 'CHEMICAL_ENGINEERING', 'CIVIL_ENGINEERING', 'PRODUCTION_ENGINEERING', 'BIO_TECH_AND_BIO_ENGINEERING');
ALTER TABLE "User" ALTER COLUMN "department" TYPE "Department_new" USING ("department"::text::"Department_new");
ALTER TYPE "Department" RENAME TO "Department_old";
ALTER TYPE "Department_new" RENAME TO "Department";
DROP TYPE "Department_old";
COMMIT;

-- AlterTable
ALTER TABLE "Authentication" ALTER COLUMN "otpForEmail" DROP NOT NULL,
ALTER COLUMN "otpEmailExpiry" DROP NOT NULL,
ALTER COLUMN "otpForPasswordChange" DROP NOT NULL,
ALTER COLUMN "otpPasswordChangeExpiry" DROP NOT NULL;
