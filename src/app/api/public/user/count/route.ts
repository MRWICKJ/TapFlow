import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = await prisma.user.count();
        const data = response.toString();
        return NextResponse.json({data, message:"User Count Sucessfully" ,status: 200});
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return NextResponse.json({message: errorMessage, status: 500});
    }
}