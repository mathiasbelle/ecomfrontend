// pages/SignUpPage.js
"use client"
import { useState } from 'react';
import axios from '../api/axios';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import { ROLES } from '../enums/roles';
import Link from 'next/link';

const SignUpPage = () => {
    const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: ''
  });
  const {setAuth} = useAuth();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function onSubmit(event) {
    event.preventDefault();
    console.log(formData);
    try {
        const jwt = await axios.post(
            '/auth/register',
            formData,
            {
                withCredentials: true
        
            }
        );
        const accessToken = jwt?.data?.accessToken;
        const role = jwt?.data?.role;
        setAuth({ email: formData.email, accessToken, role });
        setSuccessMessage('Sign up successful!');
        alert('Sign up successful!');
        
        router.push('/');
    } catch (error) {
        setErrorMessage(error.response.data.error);
        console.log(`Error: ${error.response.data.error}`);
        alert('An error occurred during sign up. Please try again.');
    }
  }


  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Sign Up</h1>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                    {successMessage && (
                        <p className="text-green-500 mb-4">{successMessage}</p>
                    )}
        <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">What are you signing up as?</label>
            <div className="flex items-center">
              <label htmlFor="role-user" className="mr-4 flex items-center">
                <input type="radio" id="role-user" name="role" value={ROLES.USER} onChange={handleChange} className="form-radio" required />
                <span className="ml-2">User</span>
              </label>
              <label htmlFor="role-seller" className="flex items-center">
                <input type="radio" id="role-seller" name="role" value={ROLES.SELLER} onChange={handleChange} className="form-radio" required />
                <span className="ml-2">Seller</span>
              </label>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">Sign Up</button>
        </form>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login!</Link>
        </p>
      </div>
      </div>
    </div>
  );
};

export default SignUpPage;
