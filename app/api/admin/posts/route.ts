import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { title, content } = await req.json();
  
  // Note: We are using Author ID 1 for now (we will create this author next)
  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: true,
      authorId: 1, 
    },
  });

  return NextResponse.json(post);
}
