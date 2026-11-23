import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';

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
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto p-4 pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
