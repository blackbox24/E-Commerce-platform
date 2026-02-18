// src/app/admin/orders/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Order {
  id: string;
  customerName: string;
  total: string;
  date: string;
  status: string;
}

export default function AdminOrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  // Simulated order data
  const simulatedOrders: Order[] = [
    { id: 'ORD001', customerName: 'John Doe', total: '109.97', date: '2024-01-15', status: 'Delivered' },
    { id: 'ORD002', customerName: 'Jane Smith', total: '59.99', date: '2024-02-01', status: 'Processing' },
    { id: 'ORD003', customerName: 'Alice Johnson', total: '200.50', date: '2024-02-10', status: 'Shipped' },
  ];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin-login'); // Redirect to admin login if not authenticated
    }
    // In a real app, also check if user has 'admin' role
    // if (!isLoading && isAuthenticated && user?.role !== 'admin') {
    //   router.push('/403'); // Redirect to 403 if not authorized
    // }
    else if (isAuthenticated) { // Temporarily allow any authenticated user for demo
      // In a real application, fetch orders from an API
      setOrders(simulatedOrders);
    }
  }, [isAuthenticated, isLoading, router, user]);

  if (isLoading || !isAuthenticated) { // Add user?.role check here if uncommenting above
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">All Orders</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto p-6 md:p-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map(order => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.customerName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/admin/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-150">View</Link>
                  <button className="text-blue-600 hover:text-blue-900 mr-4 transition-colors duration-150">Edit</button>
                  <button className="text-red-600 hover:text-red-900 transition-colors duration-150">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
