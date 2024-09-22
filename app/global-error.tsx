'use client';

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} relative flex min-h-full flex-col bg-slate-900 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-slate-950 antialiased`}
      >
        <div className="absolute -top-4 -z-10 h-[234px] w-full bg-[url('/bg2.svg')] bg-repeat-x" />
        <main className="container mx-auto flex flex-col py-28">
          <div className="rounded-xl border border-slate-800 p-6 shadow-sm backdrop-blur-sm">
            <h2 className="mb-8 text-3xl font-semibold text-white">
              Something went wrong!
            </h2>
            <button
              onClick={() => reset()}
              className="rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
