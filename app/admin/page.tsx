'use client';
import { useState } from 'react';

export default function AdminPage() {
  const [status, setStatus] = useState('');

  async function handleSubmit(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    if (res.ok) {
      setStatus('✅ Article Published!');
      e.target.reset();
    }
  }

  return (
    <div className="p-10 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Admin: Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Article Title" className="w-full p-3 border rounded" required />
        <textarea name="content" placeholder="Write your story..." className="w-full p-3 border rounded h-40" required />
        <button type="submit" className="bg-black text-white px-6 py-3 rounded font-bold hover:bg-gray-800">
          Publish to Gazette
        </button>
      </form>
      {status && <p className="mt-4 font-bold text-green-600">{status}</p>}
    </div>
  );
}
