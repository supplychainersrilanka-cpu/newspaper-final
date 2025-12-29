'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      setError('❌ Incorrect Password');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-xl rounded-lg border-t-4 border-black">
        <h1 className="text-2xl font-bold mb-4 uppercase tracking-tighter">Editor Access</h1>
        <input 
          type="password" 
          placeholder="Enter Passcode" 
          className="w-full p-3 border mb-4 rounded" 
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-black text-white p-3 font-bold hover:bg-gray-800">Verify</button>
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
      </form>
    </div>
  );
}
