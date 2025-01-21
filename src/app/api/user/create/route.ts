// pages/api/users/index.ts
import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/app/services/user/userService';

export async function POST(req: NextRequest) {
    try {
      const body = await req.json();
      const { first_name, last_name, email_id, username, user_id } = body;
      const newUser = await createUser({
        user_id,
        first_name,
        last_name,
        email_id,
        username,
      });

      return NextResponse.json(newUser, { status: 201 });
    } catch {
      return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }

}
