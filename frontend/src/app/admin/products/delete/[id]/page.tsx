// src/app/admin/products/delete/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
}

export default function DeleteProductPage({ params }: { params: { id: string } }) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { id } = params;

  const [product, setProduct] = useState<Product | null>(null);

  // Simulated product data
  const simulatedProducts: Product[] = [
    { id: '1', name: "Next.js Product 1" },
    { id: '2', name: "Next.js Product 2" },
  ];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin-login'); // Redirect to admin login if not authenticated
    }
    // In a real app, also check if user has 'admin' role
    // if (!isLoading && isAuthenticated && user?.role !== 'admin') {
    //   router.push('/403'); // Redirect to 403 if not authorized
    // }
    else if (isAuthenticated && id) {
      const foundProduct = simulatedProducts.find(p => p.id === id);
      setProduct(foundProduct || null);
    }
  }, [isAuthenticated, isLoading, router, user, id]);

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Product not found.</div>;
  }

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    const confirmed = confirm(`Are you sure you want to delete product "${product.name}" (ID: ${id})?`);
    if (confirmed) {
      alert(`Product ${id} Deleted! (Simulation)`);
      // In a real app, send delete request to API and then redirect
      router.push('/admin/dashboard'); // Redirect to admin dashboard or product list
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Delete Product: {product.name}</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto text-center">
        <p className="text-lg text-gray-700 mb-4">You are about to delete product <span className="font-bold text-gray-900">"{product.name}" (ID: {product.id})</span>.</p>
        <p className="text-black font-semibold mb-6">This action cannot be undone.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <button onClick={handleDelete} className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150">Confirm Delete</button>
          <Link href="/admin/dashboard" className="bg-gray-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150">Cancel</Link>
        </div>
      </div>
    </div>
  );
}
