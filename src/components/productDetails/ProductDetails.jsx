import axios from 'axios'
import Style from "./ProductDetails.module.css"
import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ColorRing } from 'react-loader-spinner'
import { cartContext } from '../../Context/CartContextProvider'
import toast from 'react-hot-toast'
import { wishlistContext } from '../../Context/WishlistContextProvider';


export default function ProductDetails() {
  let { id } = useParams()
  const [product, setProduct] = useState(null)
  const [isloading, setIsLoading] = useState(false)
const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(wishlistContext);

  
  const { addToCart, setNumOfCartItems } = useContext(cartContext)

  async function getSpecificProject(id) {
    setIsLoading(true)
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      setProduct(data.data)
    } catch (error) {
      console.error("Error fetching product:", error)
    } finally {
      setIsLoading(false)
    }
  }

  
  async function handleAddToCart() {
    const flag = await addToCart(product._id)
    if (flag?.status === 'success') {
      toast.success("It has been successfully added.")
      setNumOfCartItems(flag.numOfCartItems)
    } else {
      toast.error("This is an error!.")
    }
  }

  useEffect(() => {
    getSpecificProject(id)
  }, [id])

  if (isloading) {
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
    )
  }

  return (
    <>
      {product ? (
        <div className='container mx-auto px-4'> 
          <div className='grid grid-cols-[1fr_2fr] gap-3 items-center py-10'> 
            <div>
              <img src={product.imageCover} alt={product.title} className='w-full p-5' />
            </div>
            <div className="p-4 text-black">
              <h2 className='text-2xl font-bold mb-2'>{product.title}</h2>
              <p className='mb-2'>{product.description}</p>
              <div className="flex justify-between">
                <h3 className='text-green-500 text-md'>Price: {product.price} EGP</h3>
                <span>
                  <i className="fas fa-star text-yellow-300"></i>
                  {product.ratingsAverage}
                </span>
              </div>
              <div className="flex justify-between">
               
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="cursor-pointer text-white bg-gradient-to-r w-xl items-center from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 my-3 text-center me-2 mb-2"
                >
                  Add
                </button>
                <span
  onClick={() => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast.error("It has been successfully removed");
    } else {
      addToWishlist(product);
      toast.success("It has been successfully added");
    }
  }}
  className={`fa-solid fa-heart py-5 text-xl cursor-pointer transition ${
    isInWishlist(product._id) ? "text-red-500" : "text-gray-800"
  }`}
/>

              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
