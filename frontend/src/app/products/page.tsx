// src/app/products/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Simulated product data
  const allProducts: Product[] = [
    { id: 1, name: "Next.js Product 1", description: "Dynamically loaded product for Next.js.", imageUrl: "https://via.placeholder.com/300/FF0000/FFFFFF?text=Product+1", price: "19.99" },
    { id: 2, name: "Next.js Product 2", description: "Another dynamic product for Next.js.", imageUrl: "https://via.placeholder.com/300/00FF00/FFFFFF?text=Product+2", price: "29.99" },
    { id: 3, name: "Next.js Product 3", description: "More dynamic products.", imageUrl: "https://via.placeholder.com/300/0000FF/FFFFFF?text=Product+3", price: "39.99" },
    { id: 4, name: "Next.js Product 4", description: "High quality product.", imageUrl: "https://via.placeholder.com/300/FFFF00/000000?text=Product+4", price: "49.99" },
    { id: 5, name: "Next.js Product 5", description: "New arrival.", imageUrl: "https://via.placeholder.com/300/FF5733/FFFFFF?text=Product+5", price: "24.99" },
    { id: 6, name: "Next.js Product 6", description: "Best seller.", imageUrl: "https://via.placeholder.com/300/33FF57/FFFFFF?text=Product+6", price: "69.99" },
    { id: 7, name: "Next.js Product 7", description: "Limited stock.", imageUrl: "https://via.placeholder.com/300/5733FF/FFFFFF?text=Product+7", price: "99.99" },
    { id: 8, name: "Next.js Product 8", description: "On sale now!", imageUrl: "https://via.placeholder.com/300/FFFF33/000000?text=Product+8", price: "34.99" }
  ];

  useEffect(() => {
    // In a real application, you'd fetch products from an API here
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setProducts(allProducts.slice(startIndex, endIndex));
  }, [currentPage]);

  const totalPages = Math.ceil(allProducts.length / itemsPerPage);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            ${currentPage === i ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`
          }
        >
          {i}
        </button>
      );
    }
    return (
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="sr-only">Previous</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 01-1.414 1.414l-4-4a1 1 010-1.414l4-4a1 1 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        {pages}
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 010-1.414L10.586 10 7.293 6.707a1 1 011.414-1.414l4 4a1 1 010 1.414l-4 4a1 1 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    );
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-5">
              <h3 className="font-bold text-xl text-gray-900 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-extrabold text-indigo-600">${product.price}</span>
                <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out duration-150">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-12">
        {renderPagination()}
      </div>
    </div>
  );
}
