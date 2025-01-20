/*
  Warnings:

  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - Changed the type of `status` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "userId",
ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION,
DROP COLUMN "status",
ADD COLUMN     "status" "TransactionStatus" NOT NULL;

-- DropEnum
DROP TYPE "TransactionStaus";
