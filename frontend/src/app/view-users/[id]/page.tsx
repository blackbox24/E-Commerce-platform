// src/app/view-users/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function ViewUserPage({ params }: { params: { id: string } }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { id } = params;

  // Simulated user data (in a real app, you'd fetch this by ID)
  const simulatedUsers: User[] = [
    { id: '1', name: 'User One', email: 'user1@example.com', role: 'customer' },
    { id: '2', name: 'User Two', email: 'user2@example.com', role: 'customer' },
    { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  ];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin-login'); // Redirect to admin login if not authenticated
    } else if (isAuthenticated && id) {
      const foundUser = simulatedUsers.find(u => u.id === id);
      setUser(foundUser || null);
    }
  }, [isAuthenticated, isLoading, router, id]);

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  if (!user) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">User not found.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">User Details: {user.name}</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
        <div className="mb-6 space-y-4">
          <p className="text-lg text-gray-700"><span className="font-semibold text-gray-900">User ID:</span> {user.id}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold text-gray-900">Name:</span> {user.name}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold text-gray-900">Email:</span> {user.email}</p>
          <p className="text-lg text-gray-700"><span className="font-semibold text-gray-900">Role:</span> {user.role}</p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition ease-in-out duration-150">Delete User</button>
          <Link href="/view-users" className="bg-gray-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150">Back to Users</Link>
        </div>
      </div>
    </div>
  );
}
