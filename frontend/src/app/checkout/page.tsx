// src/app/checkout/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  // State for form fields (simulated for now)
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // Simulated order summary values
  const subtotal = 109.97;
  const shipping = 5.00;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center text-xl text-gray-700">Loading...</div>;
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && address && city && zip && cardNumber && expiry && cvv) {
      alert('Order Placed! (Simulation)');
      // In a real application, send order data to API and then redirect
      router.push('/profile'); // Redirect to profile or orders page after placing order
    } else {
      alert('Please fill in all required fields.');
    }
  };

  const inputClass = "shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const labelClass = "block text-gray-700 text-sm font-bold mb-2";

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-8rem)]">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Checkout</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Shipping Information */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h3>
          <form>
            <div className="mb-4">
              <label htmlFor="fullName" className={labelClass}>Full Name</label>
              <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputClass} />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className={labelClass}>Address</label>
              <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="city" className={labelClass}>City</label>
                <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
              </div>
              <div className="mb-4">
                <label htmlFor="zip" className={labelClass}>ZIP Code</label>
                <input type="text" id="zip" value={zip} onChange={(e) => setZip(e.target.value)} className={inputClass} />
              </div>
            </div>
          </form>
        </div>

        {/* Payment Information and Order Summary */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h3>
          <form>
            <div className="mb-4">
              <label htmlFor="cardNumber" className={labelClass}>Card Number</label>
              <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className={inputClass} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label htmlFor="expiry" className={labelClass}>Expiry Date</label>
                <input type="text" id="expiry" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className={inputClass} />
              </div>
              <div className="mb-4">
                <label htmlFor="cvv" className={labelClass}>CVV</label>
                <input type="text" id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} className={inputClass} />
              </div>
            </div>
          </form>

          <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-6">Order Summary</h3>
          <div className="border-t border-gray-200 pt-6 mt-6 space-y-3">
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

          <button onClick={handlePlaceOrder} className="mt-8 w-full bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
