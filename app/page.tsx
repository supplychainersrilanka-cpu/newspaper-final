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
      {/* Newspaper Masthead */}
      <header className="border-b-2 border-zinc-900 pb-4 mb-8 text-center">
        <div className="flex justify-between items-end mb-2 text-xs font-bold uppercase tracking-widest border-b border-zinc-200 pb-2">
          <span>Vol. LXXIV ... No. 1</span>
          <span className="text-xl font-serif lowercase italic">Digital Citizen</span>
          <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <h1 className="font-playfair text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none mt-4">
          The Gazette
        </h1>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Main Feature Story */}
        <div className="lg:col-span-8">
          {mainStory ? (
            <article className="group cursor-pointer">
              <div className="border-b border-zinc-200 pb-6 mb-6">
                <span className="text-red-700 font-bold uppercase text-xs tracking-widest">Main Story</span>
                <h2 className="font-playfair text-5xl font-bold mt-2 leading-tight group-hover:underline decoration-zinc-300">
                  {mainStory.title}
                </h2>
                <p className="mt-4 text-zinc-600 text-lg leading-relaxed line-clamp-3">
                  {mainStory.content || "Developing story... check back for more details as our journalists investigate this breaking news."}
                </p>
                <div className="mt-6 flex items-center text-xs font-bold uppercase text-zinc-400">
                  <span>By Editorial Staff</span>
                  <span className="mx-2">•</span>
                  <span>5 Min Read</span>
                </div>
              </div>
            </article>
          ) : (
            <p className="font-serif italic text-zinc-400">The printing press is quiet... no lead story available.</p>
          )}
        </div>

        {/* Right: Side Column */}
        <div className="lg:col-span-4 space-y-8 border-l border-zinc-200 pl-8">
          <h3 className="font-bold uppercase tracking-widest text-sm border-b-4 border-zinc-900 pb-1 mb-4">Latest Updates</h3>
          {otherStories.map((story) => (
            <article key={story.id} className="border-b border-zinc-100 pb-4 last:border-0">
              <h4 className="font-playfair text-xl font-bold leading-snug hover:text-zinc-600 cursor-pointer">
                {story.title}
              </h4>
              <p className="text-xs text-zinc-500 mt-2 uppercase font-semibold">
                {new Date(story.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
