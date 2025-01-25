import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await prisma.transaction.aggregate({
            _sum: {
                amount: true,
            },
        });
        const amount = response._sum.amount || 0;
        return NextResponse.json({ amount , message: "Transaction Amount Count Sucessfully", status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, status: 500 });
        } else {
            return NextResponse.json({ message: "An unknown error occurred", status: 500 });
        }
    }
}