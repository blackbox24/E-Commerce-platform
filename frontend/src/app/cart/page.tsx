// src/app/cart/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  imageUrl: string;
  quantity: number;
  price: string;
}

export default function CartPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Simulated cart data
  const simulatedCartItems: CartItem[] = [
    { id: 1, name: "Next.js Product 1", imageUrl: "https://via.placeholder.com/100/FF0000/FFFFFF?text=Product+1", quantity: 1, price: "19.99" },
    { id: 2, name: "Next.js Product 2", imageUrl: "https://via.placeholder.com/100/00FF00/FFFFFF?text=Product+2", quantity: 2, price: "29.99" },
  ];

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    } else if (isAuthenticated) {
      // In a real application, fetch cart items from an API
      setCartItems(simulatedCartItems);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.quantity * parseFloat(item.price)), 0);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Your Shopping Cart</h2>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8 max-w-3xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">Your cart is empty.</p>
            <Link href="/products" className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition ease-in-out duration-150">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 mb-4 last:mb-0 last:pb-0 last:border-b-0">
                  <div className="flex items-center w-full sm:w-auto">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-xl text-gray-800 mt-4 sm:mt-0">${(item.quantity * parseFloat(item.price)).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-6 mt-6">
              <span className="font-bold text-2xl text-gray-900 mb-4 sm:mb-0">Subtotal: ${subtotal.toFixed(2)}</span>
              <Link href="/checkout" className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition ease-in-out duration-150">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
