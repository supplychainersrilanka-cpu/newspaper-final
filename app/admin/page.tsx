'use client';
import { useState, FormEvent } from 'react';

export default function AdminPage() {
  const [status, setStatus] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.currentTarget;
    const formData = new FormData(target);
    
    const res = await fetch('/api/admin/posts', {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    
    if (res.ok) {
      setStatus('✅ Article Published!');
      target.reset();
    } else {
      setStatus('❌ Error publishing article.');
    }
  }

  return (
    <div className="p-10 max-w-2xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-6">Admin: Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Article Title" className="w-full p-3 border rounded text-black" required />
        <textarea name="content" placeholder="Write your story..." className="w-full p-3 border rounded h-40 text-black" required />
        <button type="submit" className="bg-black text-white px-6 py-3 rounded font-bold hover:bg-gray-800 w-full">
          Publish to Gazette
        </button>
      </form>
      {status && <p className={mt-4 font-bold }>{status}</p>}
    </div>
  );
}
