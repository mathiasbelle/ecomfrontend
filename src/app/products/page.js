import axios from '../api/axios';
import Link from 'next/link';

function BasePage({ children }) {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-semibold mb-4">All Products</h1>
            <div className="grid gap-4">{children}</div>
        </div>
    );
}

export default async function AllProductsPage() {
    let products = {};
    try {
        const response = await axios.get('/products');
        products = response.data;
        if (!products) {
            return (
                <BasePage>
                    <p className="text-gray-600">No products found.</p>
                </BasePage>
            );
        } else {
            return (
                <BasePage>
                    {products.length === 0 ? (
                        <p className="text-gray-600">No products found.</p>
                    ) : (
                        products.map((product) => (
                            <div
                                key={product._id}
                                className="border p-4 rounded-lg"
                            >
                                <Link
                                    href={{
                                        pathname: `/products/${product._id}`,
                                    }}
                                    className="text-lg font-semibold"
                                >
                                    {product.name}
                                </Link>
                                <p className="text-gray-600">
                                    Price: ${product.price}
                                </p>
                                <p className="text-gray-600">
                                    Category: {product.category}
                                </p>
                                <p className="text-gray-600">
                                    Description: {product.description}
                                </p>
                            </div>
                        ))
                    )}
                </BasePage>
            );
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return (
            <BasePage>
                <p className="text-gray-600">
                    Error fetching products from server.
                </p>
            </BasePage>
        );
    }
}
