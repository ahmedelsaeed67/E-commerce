import React, { useContext, useEffect, useState } from 'react';
import { wishlistContext } from '../../Context/WishlistContextProvider';
import { Link } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';
import { cartContext } from '../../Context/CartContextProvider';
import toast from 'react-hot-toast';
export default function WishList() {
  const { wishlist, removeFromWishlist } = useContext(wishlistContext);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, setNumOfCartItems } = useContext(cartContext);

async function handleAddToCart(productId) {
  const result = await addToCart(productId);
  if (result) {
    toast.success("Item added to cart");
    setNumOfCartItems(result.numOfCartItems);
  } else {
    toast.error("Failed to add item");
  }
}


  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }

 return (
    <div className="container mx-auto pb-24 py-10">
      <h2 className="text-3xl font-bold mb-6">My wish List</h2>

      {wishlist.length === 0 ? (
        <p className='text-center text-2xl py-6'>No items in wishlist.</p>
      ) : (
        <div className="flex flex-col gap-6 ">
          {wishlist.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between p-4 bg-gray-200 rounded shadow "
            >
              {/* Image */}
              <div className="w-[100px] md:w-[150px]">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-auto object-contain"
                />
              </div>

              <div className="flex-1 px-4">
                <h3 className="text-md font-semibold">{product.title}</h3>
                <p className="text-green-700 font-bold">{product.price} EGP</p>
                <button
                  onClick={() => removeFromWishlist(product._id)}
                  className="text-red-600 text-sm mt-1"
                >
                  <i className="fa-solid fa-trash me-1"></i> Remove
                </button>
              </div>

             
              <div>
                <button
  onClick={() => handleAddToCart(product._id)}
  className="cursor-pointer px-4 py-2 border border-green-400 text-black rounded transition"
>
  Add To Cart
</button>

               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
