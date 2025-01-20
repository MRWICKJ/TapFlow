import prisma from "@/lib/prisma";
import { TransactionStatus } from "@prisma/client";

export const createTransaction = async (data: {
    amount: number;
    senderId: string;
    receiverId: string;
    status: TransactionStatus;
  }) => {
    return prisma.transaction.create({
      data: {
        amount: data.amount,
        senderId: data.senderId,
        receiverId: data.receiverId,
        status: data.status
      }
    });
};

export const findTransactionById = async (id: string) => {
  return prisma.transaction.findMany({
    where: {
    OR: [
      { receiverId: id },
      { senderId: id }
    ]
    }
  });
};
export const findTransactionByReceiverId = async (id: string) => {
  return prisma.transaction.findMany({
    where: {
      receiverId: id
    }
  });
};
export const findTransactionBySenderId = async (id: string) => {
  return prisma.transaction.findMany({
    where: {
      senderId: id
    }
  });
};