import { GetAllTransactions } from "@/app/services/transaction/transactionService";
import { NextResponse } from "next/server";
export async function GET(){
    try {
        const data = await GetAllTransactions();
        if (!data) {
            return NextResponse.json({ error: 'No data Found' }, { status: 400 });
        }
        return NextResponse.json(data, { status: 200 });
        
    } catch {
        return NextResponse.json({ error: 'Faild to Fetch' }, { status: 500 });
    }
    
}