// pages/UpdateUserPage.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/app/hooks/useAuth';
import useAxiosPrivate from '@/app/hooks/useAxiosPrivate';

const UpdateUserPage = () => {
    const {auth} = useAuth();
    const axios = useAxiosPrivate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [id, setId] = useState()
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (!auth?.email) {
            router.push('/login');
        }
        const fetchUserData = async () => {
            try {

                const response = await axios.get('/auth/me');
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    password: '',
                });

                setId(response.data._id);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [auth, axios, router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`/users/${id}`, formData);

            setSuccess('Profile updated successfully!');
            setError('');
        } catch (error) {
            console.error('Error updating profile:', error);
            setError(
                'An error occurred while updating the profile. Please try again.'
            );
            setSuccess('');
        }
    };

    return (
        <div>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-4">Update Profile</h1>
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
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && (
                        <p className="text-green-500 mb-4">{success}</p>
                    )}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserPage;
