'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate';
import Link from 'next/link';
import { ROLES } from '@/app/enums/roles';

const CreateProductPage = () => {
    const { auth } = useAuth();
    const axios = useAxiosPrivate();
    const router = useRouter();

    useEffect(() => {
        if (!auth?.email) {
            router.push('/login');
        }
        if (auth.role !== ROLES.SELLER) {
            router.push('/profile');
        }
    }, [auth, router]);

    

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        category: '',
        description: '',
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            setError('You can upload a maximum of 5 files.');
            return;
        }

        const validTypes = ['image/png', 'image/jpg', 'image/jpeg'];
        for (const file of files) {
            if (!validTypes.includes(file.type)) {
                setError('Only PNG, JPG, and JPEG files are allowed.');
                return;
            }
        }

        setSelectedFiles(files);
        setError('');
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('/products', formData);
    //         setSuccess('Product created successfully!');
    //         setError('');
    //     } catch (error) {
    //         console.error('Error creating product:', error);
    //         setError(
    //             'An error occurred while creating the product. Please try again.'
    //         );
    //         setSuccess('');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSubmit = new FormData();
            Object.keys(formData).forEach(key => {
                formDataToSubmit.append(key, formData[key]);
            });
            selectedFiles.forEach(file => {
                formDataToSubmit.append('productImages', file);
            });

            const response = await axios.post('/products', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Product created successfully!');
            setError('');
        } catch (error) {
            console.error('Error creating product:', error);
            setError('An error occurred while creating the product. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div>

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-4">
                    Create New Product
                </h1>
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
                    <div className="mb-4">
                        <label htmlFor="productImages" className="block text-gray-700">Upload Images</label>
                        <input
                            type="file"
                            id="productImages"
                            name="productImages"
                            accept=".png,.jpg,.jpeg"
                            multiple
                            onChange={handleFileChange}
                            className="form-input mt-1 block w-full"
                        />
                        {selectedFiles.length > 0 && (
                            <div className="mt-2">
                                {selectedFiles.map((file, index) => (
                                    <p key={index}>{file.name}</p>
                                ))}
                            </div>
                        )}
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && (
                        <p className="text-green-500 mb-4">{success}</p>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                    >
                        Create Product
                    </button>
                    <Link href="/profile" className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out">
                        Cancel
                    </Link>
                </form>
            </div>

        </div>
    );
};

export default CreateProductPage;