// src/app/page.tsx
"use client"; // This is a client component

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for better navigation

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight text-center">
        Welcome to Our E-Commerce Store!
      </h1>
      <p className="mt-4 text-xl text-gray-600 text-center max-w-2xl">
        Discover amazing products and enjoy a seamless shopping experience.
      </p>
      {isAuthenticated ? (
        <div className="mt-10 text-center space-y-4 md:space-x-4">
          <p className="text-xl font-medium text-gray-800">Hello, {user?.name || user?.email}!</p>
          <button
            onClick={logout}
            className="w-full md:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150"
          >
            Logout
          </button>
          <Link
            href="/dashboard"
            className="w-full md:w-auto mt-4 md:mt-0 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition ease-in-out duration-150"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="mt-10 text-center space-y-4 md:space-x-4">
          <p className="text-xl text-gray-700">Please log in or sign up to explore our products.</p>
          <Link
            href="/login"
            className="w-full md:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="w-full md:w-auto mt-4 md:mt-0 inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}
