import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  const body = await req.json() as { password?: string };
  const password = body.password;
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password === correctPassword) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 86400, 
    });
    return response;
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
