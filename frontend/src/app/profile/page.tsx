// src/app/profile/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { orderService } from '@/services/order.service';

interface Order {
  order_id: number;
  total_amount: string;
  created_at: string;
  status: string;
  items: any[];
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated) {
      const fetchMyOrders = async () => {
        try {
          const response = await orderService.getMyOrders();
          setOrders(response.orders || []);
        } catch (err: any) {
          setError(err.message || 'Failed to fetch order history');
        } finally {
          setLoading(false);
        }
      };
      fetchMyOrders();
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || (isAuthenticated && loading && orders.length === 0)) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">User Profile</h2>
      
      {error && (
        <div className="max-w-3xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8 max-w-3xl mx-auto space-y-8">
        <div className="pb-4 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Personal Information</h3>
          <p className="text-lg text-gray-700 mb-2"><span className="font-semibold text-gray-900">Username:</span> {user?.username || 'N/A'}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold text-gray-900">Email:</span> {user?.email || 'N/A'}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold text-gray-900">Role:</span> {user?.role || 'user'}</p>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Order History</h3>
          {orders.length === 0 ? (
            <p className="text-gray-600">No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order.order_id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Order #{order.order_id}</p>
                    <p className="text-sm text-gray-600">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500 uppercase">Status: {order.status}</p>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mt-2 sm:mt-0">Total: ${order.total_amount}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
