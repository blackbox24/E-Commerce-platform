// src/app/view-users/page.tsx
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

export default function ViewUsersPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  // Simulated user data
  const simulatedUsers: User[] = [
    { id: '1', name: 'User One', email: 'user1@example.com', role: 'customer' },
    { id: '2', name: 'User Two', email: 'user2@example.com', role: 'customer' },
    { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'admin' },
  ];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin-login'); // Redirect to admin login if not authenticated
    }
    // In a real app, also check if user has 'admin' role
    // if (!isLoading && isAuthenticated && user?.role !== 'admin') {
    //   router.push('/403'); // Redirect to 403 if not authorized
    // } else if (isAuthenticated) { // Temporarily allow any authenticated user for demo
    else if (isAuthenticated) { // Temporarily allow any authenticated user for demo
      // In a real application, fetch users from an API
      setUsers(simulatedUsers);
    }
  }, [isAuthenticated, isLoading, router, user]);

  if (isLoading || !isAuthenticated) { // Add user?.role check here if uncommenting above
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Manage Users</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto p-6 md:p-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(u => (
              <tr key={u.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{u.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/view-users/${u.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors duration-150">View</Link>
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
