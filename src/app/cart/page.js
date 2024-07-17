// pages/Cart.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import Link from 'next/link';
import { ROLES } from '../enums/roles';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const router = useRouter();
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    console.log(auth.email);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        if (!auth?.email) {
            router.push('/login');
        }
        if (auth.role !== ROLES.USER) {
            router.push('/profile');
        }
        const fetchCart = async () => {
            try {
                const response = await axiosPrivate.get('/cart', {
                    signal: controller.signal,
                });
                setCart(response.data);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
        return () => {
            isMounted = false;
        };
    }, [auth, axiosPrivate, router]);

    const handleContinueShopping = () => {
        router.push('/products');
    };

    const handleCompletePurchase = async () => {
        alert('This will be implemented later...');
        // try {
        //     const token = localStorage.getItem('token');
        //     await axios.post(
        //         '/api/complete-purchase',
        //         {},
        //         {
        //             headers: { Authorization: `Bearer ${token}` },
        //         }
        //     );
        //     alert('Purchase completed successfully!');
        //     setCart(null); // Clear the cart after purchase
        // } catch (error) {
        //     console.error('Error completing purchase:', error);
        //     alert(
        //         'An error occurred while completing the purchase. Please try again.'
        //     );
        // }
    };

    const handleDeleteCart = async () => {
        try {
            const response = await axiosPrivate.delete('/cart');
            setCart(null);
        } catch (error) {
            console.error('Error deleting cart:', error);
            alert(
                'An error occurred while deleting the cart. Please try again.'
            );
        }
    };

    if (!cart || cart.products.length === 0) {
        return (
            <div>
                <div className="container mx-auto py-8">
                    <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        Your cart is currently empty.
                    </p>
                    <button
                        onClick={handleContinueShopping}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="container mx-auto py-8">
                <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
                <div className="grid gap-4">
                    {cart.products.map((product) => (
                        <div
                            key={product.productId}
                            className="border p-4 rounded-lg"
                        >
                            <Link href={`/products/${product.productId}`} className="text-lg font-semibold">
                                {product.name}
                            </Link>
                            <p className="text-gray-600">
                                Price: ${product.price}
                            </p>
                            <p className="text-gray-600">
                                Quantity: {product.quantity}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-8">
                    <p className="text-xl font-semibold">
                        Total Bill: ${cart.bill}
                    </p>
                </div>
                <div className="mt-8 flex space-x-4">
                    <button
                        onClick={handleContinueShopping}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out"
                    >
                        Continue Shopping
                    </button>
                    <button
                        onClick={handleCompletePurchase}
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out"
                    >
                        Complete Purchase
                    </button>
                    <button
                        onClick={handleDeleteCart}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out"
                    >
                        Delete Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
