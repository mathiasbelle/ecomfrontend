'use client';
import { useState, useEffect } from 'react';
import axios from './api/axios';
import Link from 'next/link';
import useAuth from './hooks/useAuth';
import TrendingProducts from './components/TrendingProducts';

export default function Home() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/products');
                //console.log(response);
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);
    const { auth } = useAuth();
    console.log(auth);

    return (
        <div>

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-4">Top Trending Products</h1>
                <TrendingProducts products={products} />
                <h1 className="text-3xl font-semibold mb-4">All Products</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="border p-4 rounded-lg"
                        >
                            <Link
                                href={{ pathname: `/products/${product._id}` }}
                                className="text-lg font-semibold"
                            >
                                {product.name}
                            </Link>
                            <p className="text-gray-600">${product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
