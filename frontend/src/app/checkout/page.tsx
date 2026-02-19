// src/app/checkout/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { checkoutService } from '@/services/checkout.service';
import { cartService } from '@/services/cart.service';

export default function CheckoutPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    } else if (isAuthenticated) {
      const fetchSubtotal = async () => {
        try {
          const response = await cartService.getCartItems();
          const items = response.carts || [];
          const total = items.reduce((sum: number, item: any) => sum + (item.quantity * parseFloat(item.price)), 0);
          setSubtotal(total);
        } catch (err) {
          console.error('Failed to fetch subtotal', err);
        }
      };
      fetchSubtotal();
    }
  }, [isAuthenticated, authLoading, router]);

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await checkoutService.createStripeSession();
      if (response.url) {
        window.location.href = response.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to initiate checkout');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || (isAuthenticated && subtotal === 0 && !error)) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  if (!isAuthenticated) return null;

  const shipping = 5.00;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Checkout</h2>
      
      {error && (
        <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mb-6" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Summary</h3>
        <div className="border-t border-gray-200 pt-6 space-y-3">
          <div className="flex justify-between text-lg text-gray-700">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-700">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-xl text-gray-900 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button 
          onClick={handleCheckout} 
          disabled={loading || subtotal === 0}
          className="mt-8 w-full bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150 disabled:bg-gray-400"
        >
          {loading ? 'Redirecting to Stripe...' : 'Proceed to Payment'}
        </button>
        <p className="mt-4 text-xs text-gray-500 text-center">
          You will be redirected to Stripe to securely complete your purchase.
        </p>
      </div>
    </div>
  );
}
