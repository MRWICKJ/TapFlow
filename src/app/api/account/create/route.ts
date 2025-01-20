import { generateBalance } from "@/lib/balance";
import { NextRequest, NextResponse } from "next/server";
import { createAccount } from "@/app/services/account/accountService";
export async function POST(req:NextRequest) {
    try {
        const body = await req.json();
        let { balance, active, userId } = body;
        balance = generateBalance(body.balance);
        const newAccount = await createAccount({
            balance,
            active,
            userId
          });
    
          return NextResponse.json(newAccount, { status: 201 });
        } catch(error) {
          return NextResponse.json({ error: `Failed to create Account ${error}` }, { status: 500 });
        }
    // Create a new account

}