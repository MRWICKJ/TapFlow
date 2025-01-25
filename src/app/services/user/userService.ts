// src/services/userService.ts
import prisma from '@/lib/prisma';

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { user_id: id } });
};
export const getAllUsers = async () => {
  return prisma.user.findMany();
};
export const createUser = async (data: {
  user_id: string;
  first_name: string;
  last_name: string;
  email_id: string;
  username: string;
}) => {
  return prisma.user.create({
    data,
  });
};

// src/components/dashboard-model.tsx
export const getFullUser = async (user_id: string) => {
  const user = await getUserById(user_id);
  if (!user) {
    return null;
  }
  const data = await prisma.user.findUnique({
    where: { user_id },
    include: {
      account: true,
      payerTransactions: true,
      receiverTransactions: true,
    },
  });
  return data;
}