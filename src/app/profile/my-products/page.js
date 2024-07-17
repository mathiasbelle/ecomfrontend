'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate';
import Link from 'next/link';
import { ROLES } from '@/app/enums/roles';


const MyProductsPage = () => {
    const { auth } = useAuth();
    const axios = useAxiosPrivate();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        if (auth.role !== ROLES.SELLER) {
            router.push('/profile')
        }
        let isMounted = true;
        const controller = new AbortController();
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/my-products');
                isMounted && setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
        return () => {
            isMounted = false;
        };
    }, [axios, auth, router]);

    const handleEditProduct = (productId) => {
        router.push(`/edit-product/${productId}`);
      };

      return (
        <div>
          <div className="container mx-auto py-8">
            <h1 className="text-3xl font-semibold mb-4">My Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(product => (
                <div key={product._id} className="bg-white shadow-md rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-700 mb-2"><strong>Price:</strong> ${product.price}</p>
                  <p className="text-gray-700 mb-2"><strong>Quantity:</strong> {product.quantity}</p>
                  <p className="text-gray-700 mb-2"><strong>Category:</strong> {product.category}</p>
                  <p className="text-gray-700 mb-4"><strong>Description:</strong> {product.description}</p>
                  <Link href={`/profile/edit-product/${product._id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-300 ease-in-out"
                  >
                    Edit Product
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

}

export default MyProductsPage;