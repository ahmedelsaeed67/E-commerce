import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContextProvider'
import toast from 'react-hot-toast'
import { wishlistContext } from '../../Context/WishlistContextProvider';



export default function Products() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(wishlistContext);


  const { addToCart, setNumOfCartItems } = useContext(cartContext)
  

  async function getProducts() {
    try {
      setIsLoading(true)
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
      setProducts(data.data)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setIsLoading(false)
    }
  }

  async function showMessage(id) {
    const flag = await addToCart(id)
    if (flag?.status === "success") {
      toast.success("It has been successfully added.")
       setNumOfCartItems(flag.numOfCartItems)

    } else {
      toast.error("This is an error!")
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ColorRing visible height="80" width="80" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 pb-32">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a product..."
          className="w-full md:w-1/2 p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product._id} className="shadow p-4 pb-16 group relative overflow-hidden transition-all duration-300 hover:shadow-2xl rounded-lg bg-white">
            <Link to={`/productDetails/${product._id}`}>
              <img src={product.imageCover} alt={product.title} className="w-full h-[200px] object-contain mb-2" />
              <p className="text-green-600 text-sm">{product.category?.name}</p>
              <h3 className="text-md font-semibold h-12 overflow-hidden">
                {product.title.split(" ", 2).join(" ")}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-green-700 font-bold">{product.price} EGP</p>
                <span><i className="fas fa-star text-yellow-400"></i> {product.ratingsAverage}</span>
              </div>
            </Link>

           <div className="flex justify-end">
  <div className="flex justify-end">
  <span
    onClick={() => {
      const isInWishlist = wishlist.some(item => item._id === product._id);
      if (isInWishlist) {
        removeFromWishlist(product._id);
        toast.error("It has been successfully removed");
      } else {
        addToWishlist(product);
        toast.success("It has been successfully added");
      }
    }}
    className={`fa-solid fa-heart py-5 text-xl cursor-pointer transition ${
      wishlist.some(item => item._id === product._id) ? 'text-red-500' : 'text-gray-800'
    }`}
  ></span>
</div>

</div>


            <div className=" absolute bottom-0 left-0 w-full translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 px-2 pb-2 z-0">
              <button onClick={() => showMessage(product._id)} className="cursor-pointer w-full inline-flex items-center justify-center text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-teal-300 to-lime-300 dark:text-white focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-lime-800">
                <span className="w-full text-center px-5 py-2.5 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                  + Add to Cart
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
