/*
  Warnings:

  - You are about to drop the column `payerId` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `senderId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_payerId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "payerId",
ADD COLUMN     "senderId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
