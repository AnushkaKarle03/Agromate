'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-green-700 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🌱</span>
          <span className="font-bold text-xl tracking-tight">Agromate</span>
        </Link>
        <nav className="flex items-center space-x-3 text-sm font-medium">
          <Link href="/labourer/feed" className="hover:text-green-200 px-2 py-1">
            Find Work
          </Link>
          <Link href="/farmer/dashboard" className="hover:text-green-200 px-2 py-1">
            Hire Labour
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-green-800 px-2 py-1 rounded text-green-100 hidden sm:inline">
                {user?.role}: {user?.phone}
              </span>
              <button
                onClick={logout}
                className="bg-red-700 hover:bg-red-800 px-2.5 py-1 rounded text-xs text-white"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-md text-white text-xs"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
