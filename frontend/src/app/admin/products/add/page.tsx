// src/app/admin/products/add/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { productService } from '@/services/product.service';

export default function AddProductPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/admin-login');
    } else if (isAuthenticated && user?.role !== 'admin') {
      router.push('/403');
    }
  }, [isAuthenticated, authLoading, router, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('price', formData.price);
    data.append('quantity', formData.quantity);
    if (image) {
      data.append('photo_url', image);
    }

    try {
      await productService.addProduct(data);
      alert('Product Added Successfully!');
      router.push('/products'); 
    } catch (err: any) {
      setError(err.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  if (!isAuthenticated || user?.role !== 'admin') return null;

  const inputClass = "shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm";
  const labelClass = "block text-gray-700 text-sm font-bold mb-2";

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Add New Product</h2>
      
      {error && (
        <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className={labelClass}>Product Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              required
              value={formData.name} 
              onChange={handleInputChange}
              className={inputClass} 
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="price" className={labelClass}>Price</label>
              <input 
                type="number" 
                id="price" 
                name="price"
                step="0.01" 
                required
                value={formData.price} 
                onChange={handleInputChange}
                className={inputClass} 
              />
            </div>
            <div>
              <label htmlFor="quantity" className={labelClass}>Quantity</label>
              <input 
                type="number" 
                id="quantity" 
                name="quantity"
                required
                value={formData.quantity} 
                onChange={handleInputChange}
                className={inputClass} 
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="photo_url" className={labelClass}>Product Image</label>
            <input 
              type="file" 
              id="photo_url" 
              accept="image/*"
              onChange={handleImageChange}
              className={inputClass} 
            />
          </div>
          <div className="mt-8 flex justify-end">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150 disabled:bg-gray-400"
            >
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
