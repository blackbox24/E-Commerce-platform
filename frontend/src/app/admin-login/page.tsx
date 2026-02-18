// src/app/admin-login/page.tsx
"use client"; // This is a client component

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth(); // Assuming admin login also uses the same general login function for token acquisition
  const router = useRouter();

  // Redirect to admin dashboard if already authenticated (and potentially authorized as admin)
  if (isAuthenticated) {
    // In a real app, you'd also check user.role === 'admin'
    router.push('/dashboard'); // Or '/admin/dashboard'
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call for admin login
    if (email === 'admin@example.com' && password === 'adminpassword') {
      const simulatedToken = 'fake-admin-jwt-token';
      const simulatedUser = { id: 'admin1', email: 'admin@example.com', name: 'Admin User', role: 'admin' };
      login(simulatedToken, simulatedUser); // Use the same login mechanism, differentiate by role later
      // Redirect to admin dashboard
      router.push('/admin/dashboard'); // Assuming an admin dashboard route
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Admin Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm"> {/* Removed -space-y-px from here */}
            <div>
              <label htmlFor="admin-email-address" className="sr-only">
                Email address
              </label>
              <input
                id="admin-email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Admin Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4"> {/* Added margin to separate */}
              <label htmlFor="admin-password" className="sr-only">
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150"
            >
              Sign in as Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
