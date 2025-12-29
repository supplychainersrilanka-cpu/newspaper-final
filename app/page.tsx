import { getPrisma } from '@/lib/prisma';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export default async function Home() {
  let posts: any[] = [];
  
  try {
    const prisma = getPrisma();
    if (prisma) {
      posts = await prisma.post.findMany({ 
        orderBy: { createdAt: 'desc' },
        take: 10 
      });
    }
  } catch {
    posts = []; // Fallback to empty list instead of crashing
  }

  return (
    <div className="min-h-screen bg-[#fdfdfb] text-black p-10 font-serif">
      <header className="border-b-8 border-black pb-4 mb-10">
        <h1 className="text-6xl font-black uppercase tracking-tighter">
          The Gazette
        </h1>
        <p className="text-xs font-bold uppercase tracking-widest mt-2">Verified Edge Edition</p>
      </header>
      
      {posts.length === 0 ? (
        <div className="py-20 text-center border-4 border-double border-gray-100">
          <p className="text-2xl italic text-gray-400 font-serif">&quot;The presses are warming up...&quot;</p>
          <p className="text-xs uppercase tracking-widest mt-4 text-gray-300">Database offline or empty</p>
        </div>
      ) : (
        <div className="space-y-10">
          {posts.map((p: any) => (
            <article key={p.id} className="max-w-3xl border-b border-gray-100 pb-10">
              <h2 className="text-4xl font-bold leading-tight hover:text-red-800 cursor-pointer">{p.title}</h2>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed">{p.content}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
