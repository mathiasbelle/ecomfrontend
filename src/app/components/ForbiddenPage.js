import Link from "next/link";

const ForbiddenPage = () => {
    return (
        <div> 
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">403 - Forbidden</h1>
            <p className="text-lg text-gray-600 mb-8">Oops! You can&apos;t access this page.</p>
            <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out">
                Go back to Home
            </Link>
            </div>
        </div>
      );
}

export default ForbiddenPage;