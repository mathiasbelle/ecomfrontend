import Link from "next/link";

const Seller = () => {

    return (
        <div>
            <Link
                href="/profile/my-products"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out"
            >
                My Products
            </Link>
            <Link
                href="/profile/create-product"
                className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out"
            >
                Create Product
            </Link>
        </div>
    );
}

export default Seller;