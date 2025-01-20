// pages/api/users/[id].ts
import { NextResponse, NextRequest } from 'next/server';
import { getUserById } from '@/app/services/user/userService';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.href.toLowerCase().split('/').pop();
    try {
      const user = await getUserById(id as string);

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(user, { status: 200 });
    } catch {
      return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
    }
}
