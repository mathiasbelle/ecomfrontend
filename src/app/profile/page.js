// pages/ProfilePage.js
'use client';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ROLES } from '../enums/roles';
import User from '../components/User';
import Seller from '../components/Seller';

const Profile = () => {
    const [user, setUser] = useState({});
    const { auth } = useAuth();
    const router = useRouter();
    const axiosPrivate = useAxiosPrivate();
    console.log(auth.email);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        console.log("AUTH AQUI: " + JSON.stringify(auth));
        if (!auth?.email) {
            router.push('/login');
        }

        const fetchUserData = async () => {
            try {
                console.log(auth.email);
                const response = await axiosPrivate.get('/auth/me', {
                    signal: controller.signal,
                });
                console.log(response.data);
                isMounted && setUser({name: response.data.name, email: response.data.email, username: response.data.username, role: response.data.role});
            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/login');
            }
        };

        fetchUserData();

        return () => {
            isMounted = false;
        };
    }, [axiosPrivate, router, auth]);

    return (
        <div>

            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-4">Profile</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <p className="text-gray-700 text-lg mb-4">
                        <strong>Hello</strong> {user.name}
                    </p>
                    <p className="text-gray-700 text-lg mb-4">
                        <strong>@{user.username}</strong>
                    </p>
                    <p className="text-gray-700 text-lg mb-4">
                        <strong>Email:</strong> {user.email}
                    </p>
                    {user.role === ROLES.USER ? (<User/>) : ( user.role === ROLES.SELLER ? <Seller/> : <div>Is another role</div>)}
                </div>
            </div>

        </div>
    );
};

export default Profile;
