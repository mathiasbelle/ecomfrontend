'use client';
import { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate';
import Link from 'next/link';
import { ROLES } from '@/app/enums/roles';

const EditProductPage = ({params}) => {
    const { auth } = useAuth();
    const axios = useAxiosPrivate();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        description: '',
    });
    console.log(`Params: ${JSON.stringify(params)}`);
    const id = params.id;
    console.log(`Product ID: ${id}`);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!auth?.email) {
            router.push('/login');
        }
        if (auth.role !== ROLES.SELLER) {
            router.push('/profile')
        }
        const fetchProductData = async () => {
            try {
                const response = await axios.get(`/products/${id}`);
                setFormData({
                    name: response.data.name,
                    price: response.data.price,
                    quantity: response.data.quantity,
                    category: response.data.category,
                    description: response.data.description,
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setLoading(false);
            }
        };
        fetchProductData();
    }, [auth, axios, router, id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`/products/${id}`, formData);
            setSuccess('Product updated successfully!');
            setError('');
        } catch (error) {
            console.error('Error updating product:', error);
            setError(
                'An error occurred while updating the product. Please try again.'
            );
            setSuccess('');
        }
    };

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/products/${id}`);
            setSuccess('Product deleted successfully!');
            setError('');
        } catch (error) {
            console.error('Error deleting product:', error);
            setError(
                'An error occurred while deleting the product. Please try again.'
            );
            setSuccess('');
        }
    };

    return (
        <div>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-4">Edit Product</h1>
                <form onSubmit={handleSubmit} className="max-w-md">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="price" className="block text-gray-700">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="quantity"
                            className="block text-gray-700"
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="category"
                            className="block text-gray-700"
                        >
                            Category
                        </label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="description"
                            className="block text-gray-700"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="form-textarea mt-1 block w-full"
                        ></textarea>
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && (
                        <p className="text-green-500 mb-4">{success}</p>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                    >
                        Update Product
                    </button>
                    <Link href="/profile" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out">
                        Cancel
                    </Link>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out"
                    >
                        Delete Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProductPage;
