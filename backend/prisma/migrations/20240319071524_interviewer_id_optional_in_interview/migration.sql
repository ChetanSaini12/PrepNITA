-- DropForeignKey
ALTER TABLE "Interview" DROP CONSTRAINT "interviewer_user_contribution_fk";

-- AlterTable
ALTER TABLE "Interview" ALTER COLUMN "interviewerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Interview" ADD CONSTRAINT "interviewer_user_contribution_fk" FOREIGN KEY ("interviewerId") REFERENCES "UserContribution"("id") ON DELETE SET NULL ON UPDATE CASCADE;
