// pages/search.js
'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '../api/axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import AddToCartButton from '../products/[id]/AddToCartButton';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [products, setProducts] = useState([]);
  const [userQuery, setUserQuery] = useState('');

  useEffect(() => {
      const fetchSearchResults = async () => {
        try {
          const response = await axios.get(`/products?name=${query}`);
          setProducts(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
    };

      fetchSearchResults();

  }, [query]);

  return (
    <div>

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Search Results for &quot;{query}&quot;</h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product._id} className="bg-white shadow-md rounded-lg p-6">
                <Link href={{pathname: `/products/${product._id}`}} className="text-xl font-semibold mb-2">{product.name}</Link>
                <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>
                <p className="text-gray-700 mb-2"><strong>Category:</strong> {product.category}</p>
                <p className="text-gray-700 mb-4"><strong>Description:</strong> {product.description}</p>
                <AddToCartButton product={product} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700">No products found.</p>
        )}
      </div>

    </div>
  );
};

export default SearchResults;
