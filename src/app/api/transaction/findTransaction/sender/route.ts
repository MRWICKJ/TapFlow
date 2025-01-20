import { findTransactionBySenderId } from "@/app/services/transaction/transactionService";
import { getUserById } from "@/app/services/user/userService";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const userFound = await getUserById(userId);
    if (userFound === null) {
      return NextResponse.json({ error: "User Id not found" }, { status: 400 });
    }
    const transactions = await findTransactionBySenderId(userId);
    if (!transactions) {
      return NextResponse.json(
        { error: "Transactions not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(transactions, { status: 200 });
  } catch {
    return NextResponse.json({ error: `User Id not found` }, { status: 400 });
  }
}
