import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Agromate — Agricultural Labour Matching Platform',
  description: 'Connecting farmers with reliable agricultural labourers and crew teams.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
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
              <Link
                href="/auth/login"
                className="bg-green-800 hover:bg-green-900 px-3 py-1.5 rounded-md text-white text-xs"
              >
                Sign In
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-4xl w-full mx-auto p-4 pb-16">{children}</main>

        <footer className="bg-slate-800 text-slate-400 text-xs py-4 text-center">
          <p>© 2026 Agromate. Empowering farmers and agricultural workers directly.</p>
        </footer>
      </body>
    </html>
  );
}
