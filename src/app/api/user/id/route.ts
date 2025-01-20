import { getUserById } from "@/app/services/user/userService";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const data = await req.json();
    const id = data;
    try{
        const user = await getUserById(id);
        if(!user){
            return NextResponse.json({error: 'User not found'}, {status: 404});
        }
        return NextResponse.json(user, {status: 200});
    }catch{
        return NextResponse.json({error: 'Failed to fetch user'}, {status: 500});
    }
} 