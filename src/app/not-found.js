import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
 
export default function NotFound() {
  return (
    <div>
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
        <p className="text-lg text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
        <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 ease-in-out">
            Go back to Home
        </Link>
        </div>
        <Footer />
    </div>
  )
}