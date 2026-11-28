'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export const Navbar = () => {
  const { user, isAuthenticated, switchRole, logout } = useAuth();
  const activeRole = user?.activeRole || 'FARMER';

  return (
    <header className="sticky top-0 z-50 bg-green-700 text-white shadow-md">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-1.5">
            <span className="text-2xl">🌱</span>
            <span className="font-bold text-xl tracking-tight">Agromate</span>
          </Link>

          {/* Quick Active Role Switcher Badge */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1 bg-green-900/60 p-1 rounded-xl text-xs">
              <button
                onClick={() => switchRole('FARMER')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  activeRole === 'FARMER'
                    ? 'bg-white text-green-900 shadow-xs'
                    : 'text-green-100 hover:text-white'
                }`}
              >
                🚜 Farmer
              </button>
              <button
                onClick={() => switchRole('LABOURER')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  activeRole === 'LABOURER'
                    ? 'bg-white text-green-900 shadow-xs'
                    : 'text-green-100 hover:text-white'
                }`}
              >
                🌾 Labourer
              </button>
              <button
                onClick={() => switchRole('MACHINE_OWNER')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  activeRole === 'MACHINE_OWNER'
                    ? 'bg-white text-green-900 shadow-xs'
                    : 'text-green-100 hover:text-white'
                }`}
              >
                ⚙️ Machinery
              </button>
            </div>
          )}
        </div>

        <nav className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm font-medium">
          {activeRole === 'FARMER' && (
            <>
              <Link href="/farmer/dashboard" className="hover:text-green-200 px-2 py-1">
                Dashboard
              </Link>
              <Link
                href="/farmer/jobs/new"
                className="bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-lg text-white font-semibold text-xs shadow-xs"
              >
                + Post Job
              </Link>
            </>
          )}

          {activeRole === 'LABOURER' && (
            <>
              <Link href="/labourer/feed" className="hover:text-green-200 px-2 py-1">
                Find Work
              </Link>
              <Link href="/labourer/applications" className="hover:text-green-200 px-2 py-1">
                My Applications
              </Link>
            </>
          )}

          {activeRole === 'MACHINE_OWNER' && (
            <>
              <Link href="/machinery/hub" className="hover:text-green-200 px-2 py-1">
                Equipment Hub
              </Link>
              <Link
                href="/machinery/hub"
                className="bg-amber-600 hover:bg-amber-700 px-3 py-1.5 rounded-lg text-white font-semibold text-xs shadow-xs"
              >
                + List Machine
              </Link>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link href="/labourer/feed" className="hover:text-green-200 px-2 py-1">
                Browse Jobs
              </Link>
              <Link href="/farmer/dashboard" className="hover:text-green-200 px-2 py-1">
                Hire Labour
              </Link>
              <Link
                href="/auth/login"
                className="bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-lg text-white text-xs font-semibold shadow-xs"
              >
                Sign In
              </Link>
            </>
          )}

          {isAuthenticated && (
            <button
              onClick={logout}
              className="bg-red-700 hover:bg-red-800 px-2.5 py-1.5 rounded-lg text-xs text-white shadow-xs"
            >
              Sign Out
            </button>
          )}
        </nav>
      </div>

      {/* Mobile Role Switcher Banner */}
      {isAuthenticated && (
        <div className="md:hidden bg-green-800/90 px-4 py-1.5 flex justify-between items-center text-xs border-t border-green-600">
          <span className="text-green-200 font-medium">Active Mode:</span>
          <div className="flex space-x-1">
            <button
              onClick={() => switchRole('FARMER')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                activeRole === 'FARMER' ? 'bg-white text-green-900' : 'text-green-100'
              }`}
            >
              🚜 Farmer
            </button>
            <button
              onClick={() => switchRole('LABOURER')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                activeRole === 'LABOURER' ? 'bg-white text-green-900' : 'text-green-100'
              }`}
            >
              🌾 Labourer
            </button>
            <button
              onClick={() => switchRole('MACHINE_OWNER')}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                activeRole === 'MACHINE_OWNER' ? 'bg-white text-green-900' : 'text-green-100'
              }`}
            >
              ⚙️ Machinery
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
