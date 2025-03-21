-- CreateEnum
CREATE TYPE "Membership" AS ENUM ('FREE', 'MONTHLY', 'YEARLY', 'LIFETIME');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "membership" "Membership" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "membershipEndDate" TIMESTAMP(3),
ADD COLUMN     "membershipStartDate" TIMESTAMP(3);
