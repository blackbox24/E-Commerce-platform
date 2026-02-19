// src/app/cart/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cartService } from '@/services/cart.service';

interface CartItem {
  id: number;
  name: string;
  photo_url: string | null;
  quantity: number;
  price: string;
}

export default function CartPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const response = await cartService.getCartItems();
      setCartItems(response.carts || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch cart items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated, authLoading, router]);

  const handleUpdateQuantity = async (cartId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      await cartService.updateCartItem(cartId, { quantity: newQuantity });
      fetchCartItems(); // Refresh cart
    } catch (err: any) {
      alert(err.message || 'Failed to update quantity');
    }
  };

  const handleRemove = async (cartId: string) => {
    try {
      await cartService.removeCartItem(cartId);
      fetchCartItems(); // Refresh cart
    } catch (err: any) {
      alert(err.message || 'Failed to remove item');
    }
  };

  if (authLoading || (isAuthenticated && loading && cartItems.length === 0)) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  if (!isAuthenticated) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.quantity * parseFloat(item.price)), 0);

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Your Shopping Cart</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8 max-w-4xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">Your cart is empty.</p>
            <Link href="/products" className="mt-6 inline-block bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-800 transition ease-in-out duration-150">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 mb-4 last:mb-0 last:pb-0 last:border-b-0">
                  <div className="flex items-center w-full sm:w-auto">
                    <img 
                      src={item.photo_url ? (item.photo_url.startsWith('http') ? item.photo_url : `http://localhost:3000/${item.photo_url.replace(/\\/g, '/')}`) : "https://picsum.photos/id/237/200/300"} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-md mr-4" 
                    />
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-4 sm:mt-0">
                    <div className="flex items-center border rounded-md">
                      <button 
                        onClick={() => handleUpdateQuantity(item.id.toString(), item.quantity - 1)}
                        className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id.toString(), item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => handleRemove(item.id.toString())}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Remove
                    </button>
                    <span className="font-bold text-xl text-gray-800 ml-4">${(item.quantity * parseFloat(item.price)).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-6 mt-6">
              <span className="font-bold text-2xl text-gray-900 mb-4 sm:mb-0">Subtotal: ${subtotal.toFixed(2)}</span>
              <Link href="/checkout" className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition ease-in-out duration-150">
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
