// src/components/Header.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gray-800 p-4 text-white">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          E-Commerce
        </Link>
        <div>
          <Link href="/products" className="mx-2 hover:text-gray-300">
            Products
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/cart" className="mx-2 hover:text-gray-300">
                Cart
              </Link>
              <Link href="/profile" className="mx-2 hover:text-gray-300">
                Profile
              </Link>
              <button onClick={logout} className="mx-2 hover:text-gray-300 bg-red-600 px-3 py-1 rounded">
                Logout
              </button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link href="/login" className="mx-2 hover:text-gray-300">
                Login
              </Link>
              <Link href="/signup" className="mx-2 hover:text-gray-300">
                Signup
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
