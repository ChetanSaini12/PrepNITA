-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('LIKE', 'DISLIKE');

-- CreateEnum
CREATE TYPE "VoteArea" AS ENUM ('QUESTION', 'EXPERIENCE', 'EXP_COMMENT', 'EXP_REPLY');

-- CreateTable
CREATE TABLE "ExpComment" (
    "id" SERIAL NOT NULL,
    "experienceId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "commentorId" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "ExpComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpReply" (
    "id" SERIAL NOT NULL,
    "expcommentId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "replierId" INTEGER NOT NULL,
    "likes" INTEGER NOT NULL,

    CONSTRAINT "ExpReply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVotes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "areaId" INTEGER NOT NULL,
    "type" "VoteType" NOT NULL,
    "area" "VoteArea" NOT NULL,

    CONSTRAINT "UserVotes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpComment_id_key" ON "ExpComment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExpReply_id_key" ON "ExpReply"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserVotes_id_key" ON "UserVotes"("id");

-- AddForeignKey
ALTER TABLE "ExpComment" ADD CONSTRAINT "comment_experience_fk" FOREIGN KEY ("experienceId") REFERENCES "Experience"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpReply" ADD CONSTRAINT "exp_reply_comment_fk" FOREIGN KEY ("expcommentId") REFERENCES "ExpComment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
