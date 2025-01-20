import prisma from "@/lib/prisma";

export const createAccount = async (data: {
    balance: number;
    active: boolean;
    userId: string;
  }) => {
    return prisma.account.create({
      data
    });
};


export const getAccountByUserId = async (userId: string) => {
    return prisma.account.findUnique({
      where: {
        userId
      }
    });
}

export const updateReceiverAccountBalance = async (receiverId: string, amount: number) => {
  const receiverAccount = await prisma.account.findUnique({
      where: { userId: receiverId },
  });

  if (!receiverAccount) {
      throw new Error(`Receiver account with ID ${receiverId} not found.`);
  }

  return prisma.account.update({
      where: { userId: receiverId },
      data: { balance: { increment: amount } },
  });
};

export const updateSenderAccountBalance = async (senderId: string, amount: number) => {
  const senderAccount = await prisma.account.findUnique({
      where: { userId: senderId },
  });

  if (!senderAccount) {
      throw new Error(`Sender account with ID ${senderId} not found.`);
  }

  if (senderAccount.balance < amount) {
      throw new Error("Insufficient balance in sender account.");
  }

  return prisma.account.update({
      where: { userId: senderId },
      data: { balance: { decrement: amount } },
  });
};
