// src/app/dashboard/page.tsx
"use client"; // This is a client component

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-extrabold text-green-800 leading-tight">
          Welcome to your Dashboard,
        </h1>
        <p className="mt-2 text-3xl font-bold text-green-700">{user?.name || user?.email}!</p>
        <p className="mt-6 text-lg text-gray-600">
          This is a protected area. Here you can manage your account and view your activities.
        </p>
      </div>
    </div>
  );
}
