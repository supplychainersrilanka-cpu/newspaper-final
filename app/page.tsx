import prisma from '@/lib/prisma';

export const runtime = 'edge';

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const mainStory = posts[0];
  const otherStories = posts.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="border-b-2 border-zinc-900 pb-4 mb-8 text-center">
        <div className="flex justify-between items-end mb-2 text-xs font-bold uppercase tracking-widest border-b border-zinc-200 pb-2">
          <span>Vol. LXXIV ... No. 1</span>
          <span className="text-xl font-serif lowercase italic tracking-tight">Digital Citizen</span>
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h1 className="font-playfair text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none mt-4">
          The Gazette
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          {mainStory ? (
            <article className="group cursor-pointer">
              <div className="border-b border-zinc-200 pb-6 mb-6">
                <span className="text-red-700 font-bold uppercase text-xs tracking-widest">Headline News</span>
                <h2 className="font-playfair text-5xl font-bold mt-2 leading-tight group-hover:underline">
                  {mainStory.title}
                </h2>
                <p className="mt-4 text-zinc-600 text-lg leading-relaxed">
                  {mainStory.content?.substring(0, 200)}...
                </p>
              </div>
            </article>
          ) : (
            <p className="font-serif italic text-zinc-400 text-center py-20">The presses are waiting for your first story.</p>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8 border-l border-zinc-200 pl-8">
          <h3 className="font-bold uppercase tracking-widest text-sm border-b-4 border-zinc-900 pb-1 mb-4">Latest</h3>
          {otherStories.map((story) => (
            <article key={story.id} className="border-b border-zinc-100 pb-4 last:border-0">
              <h4 className="font-playfair text-xl font-bold leading-snug hover:text-zinc-600 cursor-pointer">
                {story.title}
              </h4>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
