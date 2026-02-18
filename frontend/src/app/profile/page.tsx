// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface UserData {
  id: string;
  email: string;
  name?: string;
}

interface Order {
    id: string;
    total: string;
    date: string;
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  // Simulated order history
  const simulatedOrders: Order[] = [
    { id: '12345', total: '109.97', date: '2024-01-15' },
    { id: '12346', total: '59.99', date: '2024-02-01' },
  ];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    } else if (isAuthenticated) {
        // In a real application, fetch user specific orders from an API
        setOrders(simulatedOrders);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">User Profile</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8 max-w-3xl mx-auto space-y-8">
        <div className="pb-4 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h3>
          <p className="text-lg text-gray-700 mb-2"><span className="font-semibold text-gray-900">Name:</span> {user?.name || 'N/A'}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold text-gray-900">Email:</span> {user?.email || 'N/A'}</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Order History</h3>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">Date: {order.date}</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-2 sm:mt-0">Total: ${order.total}</p>
                </div>
              ))}
            </div>
          )}
          <p className="mt-6 text-gray-600 text-sm">More details about orders can be found <Link href="/admin/orders" className="text-blue-600 hover:underline">here</Link>.</p>
        </div>
      </div>
    </div>
  );
}
