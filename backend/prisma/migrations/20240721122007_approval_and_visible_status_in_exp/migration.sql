/*
  Warnings:

  - You are about to drop the column `isVisibile` on the `Article` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "isVisibile",
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isVisible" BOOLEAN NOT NULL DEFAULT false;
