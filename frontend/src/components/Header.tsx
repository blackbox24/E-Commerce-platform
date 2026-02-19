// src/components/Header.tsx
"use client";

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-black p-4 text-white">
      <nav className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          E-Shop
        </Link>
        <div className="flex items-center">
          <Link href="/products" className="mx-2 hover:text-gray-300">
            Products
          </Link>
          {isAuthenticated && (
            <>
              <Link href="/cart" className="mx-2 hover:text-gray-300">
                Cart
              </Link>
              {user?.role === 'admin' && (
                <>
                  <Link href="/view-users" className="mx-2 hover:text-gray-300">
                    Users
                  </Link>
                  <Link href="/admin/products/add" className="mx-2 hover:text-gray-300">
                    Add Product
                  </Link>
                </>
              )}
              <Link href="/profile" className="mx-2 hover:text-gray-300">
                Profile
              </Link>
              <button onClick={logout} className="ml-4 bg-white text-black px-4 py-1 rounded hover:bg-gray-200 transition-colors">
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
