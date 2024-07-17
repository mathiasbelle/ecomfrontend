'use client';
import axios from '@/app/api/axios';
import AddToCartButton from './AddToCartButton';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const ProductPage = ({ params }) => {
    const [product, setProduct] = useState();
    const [maxQuantity, setMaxQuantity] = useState(50);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/products/${params.id}`);
                setProduct(response.data);
                console.log(response.data);
                setMaxQuantity(Math.min(response.data.quantity, 50));
            } catch (err) {
                console.error('Error fetching product:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [params.id, error, loading]);

    if (loading) {
        return <p className="text-gray-600">Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error</p>;
    }

    // return (
    //     <div className="container mx-auto py-8">
    //         {!product ? (
    //             <p>Product not found.</p>
    //         ) : (
    //             <div>
    //                 <h1 className="text-3xl font-semibold">{product.name}</h1>
    //                 <p className="text-gray-600">Price: ${product.price}</p>
    //                 <p className="text-gray-600">
    //                     Category: {product.category}
    //                 </p>
    //                 <p className="text-gray-600">
    //                     Description: {product.description}
    //                 </p>
    //                 <div className="flex flex-wrap">
    //                     {product.pictures && product.pictures.length > 0 ? (
    //                         product.pictures.map((picture, index) => (
    //                             <div key={index} className="w-1/2 p-2">
    //                                 <Image
    //                                     src={`http://localhost:3000/${picture}`}
    //                                     alt={`Product Image ${index + 1}`}
    //                                     width={500}
    //                                     height={500}
    //                                     className="object-cover w-full h-64"
    //                                 />
    //                             </div>
    //                         ))
    //                     ) : (
    //                         <p className="text-gray-600">No pictures available for this product.</p>
    //                     )}
    //                 </div>
    //                 <div className="flex items-center mb-4">
    //                     <label
    //                         htmlFor={`quantity-${product._id}`}
    //                         className="mr-2"
    //                     >
    //                         Quantity:
    //                     </label>
    //                     <select
    //                         id={`quantity-${product._id}`}
    //                         value={selectedQuantity}
    //                         onChange={(e) =>
    //                             setSelectedQuantity(Number(e.target.value))
    //                         }
    //                         className="border p-2 rounded"
    //                     >
    //                         {Array.from(
    //                             { length: maxQuantity },
    //                             (_, i) => i + 1
    //                         ).map((num) => (
    //                             <option key={num} value={num}>
    //                                 {num}
    //                             </option>
    //                         ))}
    //                     </select>
    //                 </div>
    //                 <AddToCartButton product={product} />
    //             </div>
    //         )}
    //     </div>
    // );

    return (
        <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
    <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div class="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
        <div class="shrink-0 max-w-md lg:max-w-lg mx-auto">
          {product.images && product.images.length > 0 ? (
                             product.images.map((picture, index) => (
                                 <div key={index} >
                                     <Image
                                         src={`http://localhost:3000/${picture}`}
                                         alt={`Product Image ${index + 1}`}
                                         width={500}
                                         height={500}
                                         className="w-full dark:hidden"
                                     />
                                 </div>
                             ))
                         ) : (
                             <p className="text-gray-600">No images available for this product.</p>
                         )}
          
        </div>

        <div class="mt-6 sm:mt-8 lg:mt-0">
          <h1
            class="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
          >
            {product.name}
          </h1>
          <div class="mt-4 sm:items-center sm:gap-4 sm:flex">
            <p
              class="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
            >
              ${product.price}
            </p>

            
          </div>

          <div className="flex items-center mb-4">
                     <label
                         htmlFor={`quantity-${product._id}`}
                         className="mr-2"
                     >
                         Quantity:
                     </label>
                     <select
                         id={`quantity-${product._id}`}
                         value={selectedQuantity}
                         onChange={(e) =>
                             setSelectedQuantity(Number(e.target.value))
                         }
                         className="border p-2 rounded"
                     >
                         {Array.from(
                             { length: maxQuantity },
                             (_, i) => i + 1
                         ).map((num) => (
                             <option key={num} value={num}>
                                 {num}
                             </option>
                         ))}
                     </select>
                 </div>

           <AddToCartButton product={product} selectedQuantity={selectedQuantity} />
           <hr class="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

          <p class="mb-6 text-gray-500 dark:text-gray-400">
            {product.description}
          </p>
          </div>

          

        </div>
      </div>
  </section>
    );
};

export default ProductPage;
