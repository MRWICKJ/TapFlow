import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await prisma.transaction.count();
        return NextResponse.json({ data, message: "Transaction Count Sucessfully", status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message, status: 500 });
        } else {
            return NextResponse.json({ message: "An unknown error occurred", status: 500 });
        }
    }
}