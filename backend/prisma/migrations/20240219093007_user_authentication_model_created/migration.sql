-- CreateTable
CREATE TABLE "Authentication" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "otpForEmail" TEXT NOT NULL,
    "otpEmailExpiry" TIMESTAMP(3) NOT NULL,
    "otpForPasswordChange" TEXT NOT NULL,
    "otpPasswordChangeExpiry" TIMESTAMP(3) NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
