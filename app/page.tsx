import { getPrisma } from '@/lib/prisma';

export const runtime = 'edge';
export const dynamic = 'force-dynamic'; // This stops the "Black Screen" hang

export default async function Home() {
  let posts = [];
  try {
    const prisma = getPrisma();
    posts = await prisma.post.findMany({ 
      orderBy: { createdAt: 'desc' },
      take: 10 
    });
  } catch (e) {
    console.error("Database connection error");
  }

  return (
    <div className="min-h-screen bg-white text-black p-10 font-serif">
      <h1 className="text-5xl font-bold border-b-8 border-black pb-4 mb-10 uppercase tracking-tighter">
        The Gazette
      </h1>
      
      {posts.length === 0 ? (
        <div className="py-20 text-center border-4 border-double border-gray-200">
          <p className="text-2xl italic text-gray-400 font-serif">"Waiting for Headlines..."</p>
          <p className="text-xs uppercase tracking-widest mt-4 text-gray-300">Check D1 Bindings in Cloudflare Settings</p>
        </div>
      ) : (
        <div className="space-y-10">
          {posts.map((p: any) => (
            <article key={p.id} className="max-w-3xl border-b border-gray-100 pb-10">
              <h2 className="text-4xl font-bold leading-tight hover:text-red-800 cursor-pointer">{p.title}</h2>
              <p className="mt-4 text-gray-600 text-lg leading-relaxed line-clamp-3">{p.content}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
