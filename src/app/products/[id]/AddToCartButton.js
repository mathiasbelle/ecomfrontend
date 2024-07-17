'use client';
import useAuth from "@/app/hooks/useAuth";
import useAxiosPrivate from "@/app/hooks/useAxiosPrivate";
import { useRouter } from "next/navigation";

const AddToCartButton = ({ product, selectedQuantity }) => {
    const {auth} = useAuth();
    const router = useRouter();
    const axiosPrivate = useAxiosPrivate();

    const handleAddToCart = async () => {

        if (!auth?.email) {
            router.push('/login');
            return;
        }
        
        try {
    
          await axiosPrivate.patch(
            '/cart',
            { productId: product._id, quantity: selectedQuantity },
          );
          alert('Product added to cart successfully!');
        } catch (error) {
          console.error('Error adding product to cart:', error);
          alert('An error occurred while adding the product to the cart. Please try again.');
        }
      };
    return (
        <button
            onClick={handleAddToCart}
            className="text-white mt-4 sm:mt-0 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center justify-center"
        >
            <svg
                class="w-5 h-5 -ms-2 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                />
              </svg>
            Add to Cart
        </button>
    );
};

export default AddToCartButton;