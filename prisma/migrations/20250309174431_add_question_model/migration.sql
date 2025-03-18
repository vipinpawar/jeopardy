-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "points" INTEGER NOT NULL,
    "question" TEXT NOT NULL,
    "options" VARCHAR(255)[],
    "correctAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
