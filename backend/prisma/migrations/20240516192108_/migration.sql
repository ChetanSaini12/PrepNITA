/*
  Warnings:

  - You are about to drop the column `isVisibile` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `isVisibile` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "isVisibile",
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "isVisibile",
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT false;
