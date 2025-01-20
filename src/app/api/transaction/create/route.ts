import { getAccountByUserId, updateReceiverAccountBalance, updateSenderAccountBalance } from "@/app/services/account/accountService";
import { createTransaction } from "@/app/services/transaction/transactionService";
import { TransactionStatus } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
export async function POST(req:NextRequest){
    try {
        const body = await req.json();
        const { senderId, receiverId, amount } = body;
        if (amount <= 0) {
            return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
        }
        // find the sender account
        const senderAccount = await getAccountByUserId(senderId);
        if (!senderAccount) {
            return NextResponse.json({ error: 'Sender account not found' }, { status: 404 });
        }
        // if the sender account is not active
        if (!senderAccount.active) {
            return NextResponse.json({ error: 'Sender account is not active' }, { status: 400 });
        }
        // if the sender account does not have enough balance
        if (senderAccount.balance < amount) {
            return NextResponse.json({ error: 'Insufficient balance' }, { status: 400 });
        }
        // find the receiver account
        const receiverAccount = await getAccountByUserId(receiverId);
        if (!receiverAccount) {
            return NextResponse.json({ error: 'Receiver account not found' }, { status: 404 });
        }
        // if the receiver account is not active
        if (!receiverAccount.active) {
            return NextResponse.json({ error: 'Receiver account is not active' }, { status: 400 });
        }
        // update the sender account balance
        await updateSenderAccountBalance(senderId, amount);
        // update the receiver account balance
        await updateReceiverAccountBalance(receiverId, amount);
        // create a new transaction
        const status: TransactionStatus = 'COMPLETED'; // or any valid status value
        const data = await createTransaction({
            amount,
            senderId,
            receiverId,
            status
        });

        // Create a new transaction
        return NextResponse.json({data, message: 'Transaction completed' }, { status: 200 });
    }catch(error) {
        return NextResponse.json({ error: `${error}` }, { status: 500 });
    }
    
}