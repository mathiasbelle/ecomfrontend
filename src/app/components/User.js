import Link from "next/link";

const User = () => {

    return (
        <div>
            <Link
                href="/cart"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out"
            >
                Cart
            </Link>
            <Link
                href="/profile/edit"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out"
            >
                Edit Profile
            </Link>
            <Link
                href="/profile/create-product"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out"
            >
                Create Product (for testing)
            </Link>
        </div>
    );
}

export default User;