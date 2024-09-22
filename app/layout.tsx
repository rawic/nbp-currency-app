import type { Metadata } from 'next';
import './globals.css';

import { Inter } from 'next/font/google';

import { Navigation } from '@/views/layout/navigation';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NBP Currency App',
  description:
    'Stay updated with the latest currency exchange rates provided by the NBP API.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} relative flex min-h-full flex-col overflow-y-scroll bg-slate-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-slate-950 antialiased`}
      >
        <div className="absolute -top-4 -z-10 h-[234px] w-full bg-[url('/bg.svg')] bg-repeat-x" />
        <Navigation />
        <div className="container mx-auto flex flex-col px-4 py-20 sm:py-28">
          <div className="rounded-xl border border-slate-800 p-4 shadow-sm backdrop-blur-sm sm:p-6">
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
