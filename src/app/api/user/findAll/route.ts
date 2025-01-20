import { getAllUsers } from "@/app/services/user/userService";
import { NextResponse } from "next/server";
export async function GET() {
    const users = await getAllUsers();
    if (!users) {
        return NextResponse.json({ error: 'Users not found' }, { status: 404 });
    }
    return NextResponse.json(users, { status: 200 });
}