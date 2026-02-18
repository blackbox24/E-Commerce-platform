// src/app/500/page.tsx
"use client";

import Link from 'next/link';

export default function Custom500() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center bg-white p-10 rounded-xl shadow-lg max-w-md mx-auto">
        <h1 className="text-7xl font-extrabold text-red-600">500</h1>
        <p className="text-3xl font-bold text-gray-800 mt-4">Internal Server Error</p>
        <p className="text-lg text-gray-600 mt-2">Something went wrong on our end. Please try again later.</p>
        <Link 
          href="/" 
          className="mt-8 inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
