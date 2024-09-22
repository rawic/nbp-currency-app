'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navigation = () => {
  const currentPath = usePathname();

  return (
    <nav className="container w-full px-4">
      <ul className="relative top-4 flex transform justify-center gap-6 whitespace-nowrap rounded-lg bg-slate-950/50 px-4 py-2 text-sm text-indigo-400 max-md:w-full max-sm:flex-col sm:absolute sm:left-1/2 sm:-translate-x-1/2">
        <li>
          <Link
            href="/"
            className={`hover:text-indigo-300 ${currentPath === '/' ? 'text-white hover:text-white' : ''}`}
          >
            List of Currencies
          </Link>
        </li>
        <li>
          <Link
            href="/converter/client"
            className={`hover:text-indigo-300 ${currentPath === '/converter/client' ? 'text-white hover:text-white' : ''}`}
          >
            Currency Converter (Client)
          </Link>
        </li>
        <li>
          <Link
            href="/converter/server"
            className={`hover:text-indigo-300 ${currentPath === '/converter/server' ? 'text-white hover:text-white' : ''}`}
          >
            Currency Converter (Server)
          </Link>
        </li>
      </ul>
    </nav>
  );
};
