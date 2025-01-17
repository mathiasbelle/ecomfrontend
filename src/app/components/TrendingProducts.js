import Image from "next/image";
import Link from "next/link";

const TrendingProducts = ({ products }) => {
    function getRandomProducts(products, count) {
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const trendingProducts = getRandomProducts(products, 4);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {trendingProducts.map((product) => (
                        <div key={product._id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                
                                <Image
                                    src={`http://localhost:3000/${product.images[0]}`}
                                    alt={product.name}
                                    width={500}
                                    height={500}
                                />
                            </div>
                            <Link
                                href={`/products/${product._id}`}
                                className="text-lg font-semibold"
                            >
                                {product.name}
                            </Link>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-700">
                                        <Link href={`/products/${product._id}`}>
                                            <span
                                                aria-hidden="true"
                                                className="absolute inset-0"
                                            ></span>
                                            {product.name}
                                        </Link>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {product.category}
                                    </p>
                                </div>
                                <p className="text-sm font-medium text-gray-900">
                                    ${product.price}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // return (
    //     <div className="container mx-auto py-8">
    //         <h2 className="text-2xl font-semibold mb-4">Top Trending Products</h2>
    //         <div className="grid gap-4">
    //             {trendingProducts.map(product => (
    //                 <div key={product._id} className="border p-4 rounded-lg">
    //                     <Link href={`/products/${product._id}`} className="text-lg font-semibold">
    //                         {product.name}
    //                     </Link>
    //                     <p className="text-gray-600">Price: ${product.price}</p>
    //                     <p className="text-gray-600">Category: {product.category}</p>
    //                     <p className="text-gray-600">Description: {product.description}</p>
    //                 </div>
    //             ))}
    //         </div>
    //     </div>
    // );
}

export default TrendingProducts;