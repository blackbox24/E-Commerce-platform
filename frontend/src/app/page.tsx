// src/app/page.tsx
"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { productService } from '@/services/product.service';
import { cartService } from '@/services/cart.service';

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
  photo_url: string | null;
}

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await productService.getAllProducts();
        setFeaturedProducts((response.products || []).slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch featured products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    try {
      await cartService.addCartItem({ product_id: productId, quantity: 1 });
      alert('Product added to cart!');
    } catch (err: any) {
      alert(err.message || 'Failed to add product to cart');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 text-center"> {/* Changed background to gray-900 */}
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Welcome to Our E-Commerce Store!
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-light max-w-3xl mx-auto text-gray-300"> {/* Changed text color */}
            Discover amazing products and enjoy a seamless shopping experience.
          </p>
          {isAuthenticated ? (
            <div className="mt-10 space-y-4 md:space-x-4">
              <p className="text-xl font-medium text-gray-100">Hello, {user?.name || user?.email}!</p> {/* Changed text color */}
              <button
                onClick={logout}
                className="w-full md:w-auto px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150" // Changed colors
              >
                Logout
              </button>
              <Link
                href="/dashboard"
                className="w-full md:w-auto mt-4 md:mt-0 inline-flex items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150" // Changed colors
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="mt-10 space-y-4 md:space-x-4">
              <p className="text-xl text-gray-300">Please log in or sign up to explore our products.</p> {/* Changed text color */}
              <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center",flexDirection:"row"}}>
                <Link
                  href="/login"
                  className="w-full md:w-auto  mt-4 md:mt-0 px-8 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150" // Changed colors
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="w-full md:w-auto mt-4 md:mt-0  items-center justify-center px-8 py-3 border border-transparent text-lg font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150" // Changed colors
                >
                  Sign Up
                </Link>  
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="container mx-auto py-16 px-4 bg-cream">
        <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Featured Products</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <img 
                  src={product.photo_url ? (product.photo_url.startsWith('http') ? product.photo_url : `http://localhost:3000/${product.photo_url.replace(/\\/g, '/')}`) : "https://picsum.photos/id/237/200/300"} 
                  alt={product.name} 
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="p-6">
                  <h3 className="font-bold text-2xl text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-base mb-4">Stock: {product.quantity}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-extrabold text-gray-800">${product.price}</span>
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-12">
          <Link href="/products" className="inline-block bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-700 transition ease-in-out duration-150">
            View All Products
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Electronics', 'Apparel', 'Books', 'Home Goods'].map((category, index) => (
              <Link key={index} href={`/categories/${category.toLowerCase()}`} className="block bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                <h3 className="font-bold text-xl text-gray-900 mb-2">{category}</h3>
                <p className="text-gray-600 text-sm">Explore {category} items.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action / About Us */}
      <section className="bg-black text-white py-16 px-4 text-center"> {/* Changed background to black */}
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-4xl font-extrabold mb-6">About Our Store</h2>
          <p className="text-xl font-light mb-8 text-gray-300"> {/* Changed text color */}
            We are dedicated to providing you with the best shopping experience, high-quality products, and unbeatable prices.
          </p>
          <Link href="/about" className="inline-block bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition ease-in-out duration-150"> {/* Changed colors */}
            Learn More
          </Link>
        </div>
      </section>
    </div>
  );
}
