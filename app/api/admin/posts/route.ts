import { getPrisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  const prisma = getPrisma();
  const { title, content } = await req.json() as { title: string, content: string };
  
  const post = await prisma.post.create({
    data: { title, content, published: true, authorId: 1 }
  });

  return NextResponse.json(post);
}
