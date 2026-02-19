// src/app/404/page.tsx
"use client";

import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-cream py-12 px-4 sm:px-6 lg:px-8"> {/* Changed background to cream */}
      <div className="text-center bg-white p-10 rounded-xl shadow-lg max-w-md mx-auto">
        <h1 className="text-7xl font-extrabold text-gray-800">404</h1> {/* Changed text color */}
        <p className="text-3xl font-bold text-gray-800 mt-4">Page Not Found</p>
        <p className="text-lg text-gray-600 mt-2">The page you are looking for does not exist.</p>
        <Link 
          href="/" 
          className="mt-8 inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150" // Changed colors
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
