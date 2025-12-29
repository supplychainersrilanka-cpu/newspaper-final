import { getPrisma } from '@/lib/prisma';

export const runtime = 'edge';

export default async function Home() {
  const prisma = getPrisma();
  const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-black">
      <header className="border-b-4 border-black mb-10 pb-4">
        <h1 className="text-6xl font-black uppercase tracking-tighter">The Gazette</h1>
      </header>
      <div className="grid gap-8">
        {posts.length === 0 ? (
          <p className="italic text-gray-500 text-center py-20 border-2 border-dashed">No stories yet. Head to /admin to publish!</p>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="border-b pb-6">
              <h2 className="text-3xl font-bold">{post.title}</h2>
              <p className="mt-2 text-gray-700 leading-relaxed">{post.content}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
