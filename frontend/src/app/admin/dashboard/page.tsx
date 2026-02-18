// src/app/admin/dashboard/page.tsx
"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin-login'); // Redirect to admin login if not authenticated
    }
    // In a real app, you'd also check if user has 'admin' role
    // if (!isLoading && isAuthenticated && user?.role !== 'admin') {
    //   router.push('/403'); // Redirect to regular dashboard if not admin
    // }
  }, [isAuthenticated, isLoading, router, user]);

  if (isLoading || !isAuthenticated) { // Add user?.role check here if uncommenting above
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Total Sales */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-shadow duration-300 hover:shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Total Sales</h3>
          <p className="text-5xl font-extrabold text-green-600">$12,345</p>
        </div>
        {/* Card 2: New Orders */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-shadow duration-300 hover:shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-2">New Orders</h3>
          <p className="text-5xl font-extrabold text-blue-600">50</p>
        </div>
        {/* Card 3: New Users */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-shadow duration-300 hover:shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-2">New Users</h3>
          <p className="text-5xl font-extrabold text-purple-600">120</p>
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Link href="/admin/products/add" className="bg-indigo-600 text-white px-6 py-4 rounded-xl text-center font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150">
            Add Product
          </Link>
          <Link href="/view-users" className="bg-green-600 text-white px-6 py-4 rounded-xl text-center font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition ease-in-out duration-150">
            Manage Users
          </Link>
          <Link href="/admin/orders" className="bg-purple-600 text-white px-6 py-4 rounded-xl text-center font-semibold hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition ease-in-out duration-150">
            View Orders
          </Link>
          <Link href="/admin/settings" className="bg-gray-600 text-white px-6 py-4 rounded-xl text-center font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150">
            Admin Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
