// src/services/userService.ts
import prisma from '@/lib/prisma';

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { user_id: id } });
};
export const getAllUsers = async () => {
  return prisma.user.findMany();
};
export const createUser = async (data: {
  first_name: string;
  last_name: string;
  email_id: string;
  username: string;
}) => {
  return prisma.user.create({
    data,
  });
};
