import prisma from '@/lib/prisma';

export const runtime = 'edge';

export default async function Home() {
  // This fetches your articles from the D1 database
  const posts = await prisma.post.findMany();

  return (
    <main className="p-10 font-serif">
      <header className="border-b-8 border-black pb-4 mb-8 text-center">
        <h1 className="text-6xl font-black uppercase tracking-tighter">
          Digital Citizen Gazette
        </h1>
        <p className="mt-2 text-sm uppercase font-bold tracking-widest">
          Verified Edition • 2025
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        {posts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-gray-300">
            <h2 className="text-2xl font-bold text-gray-500 italic">
              "No News is Good News"
            </h2>
            <p className="text-gray-400 mt-2">Add your first article in the Cloudflare D1 console.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article key={post.id} className="border-b border-gray-200 pb-8">
                <h2 className="text-3xl font-bold hover:text-blue-800 cursor-pointer">
                  {post.title}
                </h2>
                <div className="mt-2 text-gray-500 text-sm">Published via Cloudflare Edge</div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
