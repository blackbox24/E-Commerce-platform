// src/app/admin/products/add/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AddProductPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin-login'); // Redirect to admin login if not authenticated
    }
    // In a real app, also check if user has 'admin' role
    // if (!isLoading && isAuthenticated && user?.role !== 'admin') {
    //   router.push('/403'); // Redirect to 403 if not authorized
    // }
  }, [isAuthenticated, isLoading, router, user]);

  if (isLoading || !isAuthenticated) { // Add user?.role check here if uncommenting above
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productName && description && price && imageUrl) {
      alert('Product Added! (Simulation)');
      // In a real app, send data to API and then redirect
      router.push('/admin/dashboard'); // Redirect to admin dashboard or product list
    } else {
      alert('Please fill in all fields.');
    }
  };

  const inputClass = "shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const labelClass = "block text-gray-700 text-sm font-bold mb-2";

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Add New Product</h2>
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="productName" className={labelClass}>Product Name</label>
            <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)}
              className={inputClass} />
          </div>
          <div className="mb-4">
            <label htmlFor="productDescription" className={labelClass}>Description</label>
            <textarea id="productDescription" rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
              className={inputClass}></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className={labelClass}>Price</label>
            <input type="number" id="productPrice" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)}
              className={inputClass} />
          </div>
          <div className="mb-4">
            <label htmlFor="productImage" className={labelClass}>Image URL</label>
            <input type="text" id="productImage" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
              className={inputClass} />
          </div>
          <div className="mt-8 flex justify-end">
            <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
