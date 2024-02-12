/*
  Warnings:

  - Added the required column `isApproved` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `postedBy` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "isApproved" BOOLEAN NOT NULL,
DROP COLUMN "postedBy",
ADD COLUMN     "postedBy" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_postedBy_fkey" FOREIGN KEY ("postedBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
