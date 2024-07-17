// pages/LoginPage.js
'use client';
import { useContext, useState } from 'react';
import axios from '../api/axios';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthContext from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import Link from 'next/link';

const LOGIN_URL = '/auth/login';

const LoginPage = () => {
    const { setAuth } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    async function onSubmit(event) {
        event.preventDefault();
        //console.log(formData);
        try {
            const res = await axios.post(LOGIN_URL, formData, {
                withCredentials: true,
            });

            //console.log(JSON.stringify(res?.data));
            const accessToken = res?.data?.accessToken;
            const role = res?.data?.role;
            //console.log('JWT: ');
            //console.log(accessToken);
            setAuth({ email: formData.email, accessToken, role });
            alert('Login successful!');
            router.push('/');
        } catch (error) {
            if (!error?.response) {
                alert('No Server Response');
            } else if (error.response?.status === 400) {
                alert('Missing Username or Password');
            } else if (error.response?.status === 401) {
                alert('Unauthorized');
            } else {
                alert('Login Failed');
            }
            console.log(error);
            alert('Invalid email or password. Please try again.');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Sign in to your account
                    </h1>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-4 md:space-y-6"
                    >
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                placeholder="johndoe@example.com"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                                placeholder="***********"
                            />
                        </div>
                        {error && <p className="text-red-500 mb-4">{error}</p>}
                        <button
                            type="submit"
                            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                            Login
                        </button>
                    </form>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/signup"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                            Sign up!
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
