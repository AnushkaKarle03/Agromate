'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const executeLogin = async (phoneToUse: string, passwordToUse: string) => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phoneToUse, password: passwordToUse }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('agromate_token', data.token);
      localStorage.setItem('agromate_user', JSON.stringify(data.user));

      if (data.user.role === 'FARMER') {
        router.push('/farmer/dashboard');
      } else {
        router.push('/labourer/feed');
      }
    } catch {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeLogin(phone, password);
  };

  const loginAsDemo = (demoPhone: string) => {
    executeLogin(demoPhone, 'Password123');
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h1 className="text-xl font-bold text-slate-900 mb-1">Sign In to Agromate</h1>
      <p className="text-xs text-slate-500 mb-4">Enter your registered mobile number and password</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Quick Demo Sign In Box */}
      <div className="mb-5 p-3.5 bg-green-50/80 rounded-xl border border-green-200 space-y-2">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-green-900">
          <span>⚡</span>
          <span>Quick Demo Access (One-Click Sign In)</span>
        </div>
        <p className="text-[11px] text-green-700">
          Test the platform instantly with pre-seeded demo accounts:
        </p>
        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={() => loginAsDemo('9822001122')}
            disabled={loading}
            className="py-1.5 px-2 bg-white hover:bg-green-100 text-green-900 border border-green-300 rounded-lg text-xs font-semibold text-center shadow-xs transition"
          >
            🚜 Demo Farmer <br />
            <span className="text-[10px] text-slate-500 font-normal">Anand Shinde</span>
          </button>
          <button
            type="button"
            onClick={() => loginAsDemo('9833445566')}
            disabled={loading}
            className="py-1.5 px-2 bg-white hover:bg-green-100 text-green-900 border border-green-300 rounded-lg text-xs font-semibold text-center shadow-xs transition"
          >
            🧑‍🌾 Demo Mukaddam <br />
            <span className="text-[10px] text-slate-500 font-normal">Suresh Patil</span>
          </button>
        </div>
      </div>

      <div className="relative flex py-2 items-center mb-4">
        <div className="flex-grow border-t border-slate-200"></div>
        <span className="flex-shrink mx-3 text-slate-400 text-xs">or sign in with password</span>
        <div className="flex-grow border-t border-slate-200"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number</label>
          <input
            type="tel"
            required
            placeholder="e.g. 9822001122"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
          <input
            type="password"
            required
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg text-sm transition"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-slate-600">
        Don't have an account yet?{' '}
        <Link href="/auth/register" className="font-semibold text-green-700 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
