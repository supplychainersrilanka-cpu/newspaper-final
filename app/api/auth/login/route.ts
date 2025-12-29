import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { password } = await req.json();
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password === correctPassword) {
    const response = NextResponse.json({ success: true });
    // Set a cookie that expires in 24 hours
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
