// src/app/admin/dashboard/page.tsx
"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin-login');
    } else if (isAuthenticated && user?.role !== 'admin') {
      router.push('/403');
    }
  }, [isAuthenticated, authLoading, router, user]);

  if (authLoading || (isAuthenticated && user?.role !== 'admin')) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  if (!isAuthenticated || user?.role !== 'admin') return null;

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1: Total Sales */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-shadow duration-300 hover:shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Total Sales</h3>
          <p className="text-5xl font-extrabold text-gray-800">$12,345</p> {/* Changed text color */}
        </div>
        {/* Card 2: New Orders */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-shadow duration-300 hover:shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-2">New Orders</h3>
          <p className="text-5xl font-extrabold text-gray-800">50</p> {/* Changed text color */}
        </div>
        {/* Card 3: New Users */}
        <div className="bg-white rounded-xl shadow-lg p-6 text-center transition-shadow duration-300 hover:shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-2">New Users</h3>
          <p className="text-5xl font-extrabold text-gray-800">120</p> {/* Changed text color */}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <Link href="/admin/products/add" className="bg-black text-white px-6 py-4 rounded-xl text-center font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150"> {/* Changed colors */}
            Add Product
          </Link>
          <Link href="/view-users" className="bg-black text-white px-6 py-4 rounded-xl text-center font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150"> {/* Changed colors */}
            Manage Users
          </Link>
          <Link href="/admin/orders" className="bg-black text-white px-6 py-4 rounded-xl text-center font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150"> {/* Changed colors */}
            View Orders
          </Link>
          <Link href="/admin/settings" className="bg-black text-white px-6 py-4 rounded-xl text-center font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150"> {/* Changed colors */}
            Admin Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
