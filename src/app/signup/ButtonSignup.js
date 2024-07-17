"use client"

import { useRouter } from "next/navigation";
import axios from 'axios';

export default function ButtonSignup() {

    const router = useRouter();
    async function submitForm(formData) {
        try {
            const jwt = await axios.post('http://localhost:3000/api/auth/register', formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            alert('Sign up successful!');
            router.push('/');

          } catch (error) {
            console.error('Error signing up:', error);
            alert('An error occurred during sign up. Please try again.');
          }
    }

    return (
        <div>
            <button type="submit" onClick={submitForm} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded">Sign Up</button>
        </div>
        
    )
}