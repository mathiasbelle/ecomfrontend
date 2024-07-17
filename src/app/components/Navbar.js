// components/Navbar.js
'use client';
import { useState } from 'react';
import { ROLES } from '../enums/roles';
import useAuth from '../hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useLogout from '../hooks/useLogout';

const Navbar = () => {
    const { auth } = useAuth();
    const isAuthenticated = auth?.email;
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const logout = useLogout();

    const handleSearch = () => {
        if (searchQuery.trim()) {
          router.push(`/search?query=${searchQuery}`);
        }
      };

      const signOut = async () => {
        await logout();
        router.push('/');
      }

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white font-semibold text-lg">
          ECOM
        </Link>
        <Link href="/products" className="text-white mr-4">
            Products
        </Link>
        <input
            type="text"
            className="bg-gray-700 text-white p-2 rounded-l"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">
          Search
        </button>
        {!isAuthenticated ? (
          <>
            <Link href="/signup" className="text-white mr-4">
              Sign Up
            </Link>
            <Link href="/login" className="text-white">
              Login
            </Link>
          </>
        ) : (
            <div className="flex items-center">
          <Link href="/profile" className="text-white mr-4">
            Profile
          </Link>
          <button
          onClick={signOut}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
      >
          Logout
      </button> 
            </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
