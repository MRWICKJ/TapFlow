import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import prisma from "./prisma";

export const initialProfile = async () => {
  const user = await currentUser();
  if (!user) {
    return NextResponse.redirect("/");  // Handle redirect here
  }

  const data = {
    user_id: user.id,
    first_name: `${user.firstName}`,
    last_name: `${user.lastName}`,
    email_id: user.emailAddresses[0].emailAddress,
    username: `${user.username}`,
  };

  const profile = await prisma.user.findUnique({
    where: {
      user_id: user.id,
    },
  });

  return { data: profile || data, message: profile ? "User found" : "User not found", isFound: !!profile };
};
