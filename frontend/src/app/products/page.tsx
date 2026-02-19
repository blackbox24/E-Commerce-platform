"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { productService } from '@/services/product.service';
import { cartService } from '@/services/cart.service';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
  photo_url: string | null;
}

export default function ProductsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Increased for better layout

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const BASE_URL = API_URL.replace('/api', '');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getAllProducts();
      setProducts(response.products || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch products');
      toast.error(err.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId: number) => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      router.push('/login');
      return;
    }

    try {
      await cartService.addCartItem({ product_id: productId, quantity: 1 });
      toast.success('Product added to cart!');
    } catch (err: any) {
      toast.error(err.message || 'Failed to add product to cart');
    }
  };

  const handleDelete = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await productService.deleteProduct(productId.toString());
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete product');
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
            ${currentPage === i ? 'z-10 bg-gray-100 border-gray-300 text-gray-800' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'}`
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
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <span className="sr-only">Previous</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        {pages}
        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    );
  };

  const getImageUrl = (photoUrl: string | null) => {
    if (!photoUrl) return "https://picsum.photos/id/237/200/300";
    if (photoUrl.startsWith('http')) return photoUrl;
    // Use relative path since Nginx will route /uploads to the backend
    return `/${photoUrl.replace(/\\/g, '/')}`;
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-10">Our Products</h2>
      
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center" role="alert">
          <span className="block sm:inline">{error}</span>
          <button onClick={fetchProducts} className="ml-4 underline font-bold">Retry</button>
        </div>
      )}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentProducts.map(product => (
                <div key={product.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group flex flex-col h-full">
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={getImageUrl(product.photo_url)} 
                      alt={product.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-xl text-gray-900 mb-2 truncate">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">Stock: {product.quantity}</p>
                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-extrabold text-gray-800">${product.price}</span>
                        <button 
                          onClick={() => handleAddToCart(product.id)}
                          className="bg-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition ease-in-out duration-150"
                        >
                          Add to Cart
                        </button>
                      </div>
                      {user?.role === 'admin' && (
                        <div className="flex gap-2 border-t pt-4">
                          <Link 
                            href={`/admin/products/update/${product.id}`}
                            className="flex-1 text-center bg-gray-100 text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors text-sm font-bold"
                          >
                            Update
                          </Link>
                          <button 
                            onClick={() => handleDelete(product.id)}
                            className="flex-1 bg-red-50 text-red-600 px-3 py-2 rounded hover:bg-red-100 transition-colors text-sm font-bold"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-12">
            {renderPagination()}
          </div>
        </>
      )}
    </div>
  );
}
