import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Context/TokenContextProvider';
import { cartContext } from '../../Context/CartContextProvider';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { token, setToken } = useContext(tokenContext);
  const { numOfCartItems } = useContext(cartContext);

  const navigate = useNavigate();
  

  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <nav className='bg-gray-200 p-5 w-full top-0 z-[999]'>
      <div className="container mx-auto max-w-screen-xl flex flex-wrap items-center justify-between">
        <div className="flex items-center md:w-1/4 w-full justify-between md:justify-start">
<Link
  to={token ? '/' : '/login'}
  className="flex items-center gap-2 whitespace-nowrap"
>
  <i className='fa-solid fa-cart-shopping nav-icon text-green-600 text-4xl'></i>
  <span className='text-black text-2xl'>Fresh Cart</span>
</Link>


          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl text-green-700 focus:outline-none"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        <div className={`w-full md:w-2/4 ${isOpen ? 'block' : 'hidden'} md:flex md:justify-center`}>
          {token && (
            <ul className='flex flex-col md:flex-row gap-3 md:gap-6 mt-4 md:mt-0 text-center'>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/wishlist">Wish list</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/brands">Brands</Link></li>
            </ul>
          )}
        </div>

        <div className={`w-full md:w-1/4 ${isOpen ? 'block' : 'hidden'} md:flex md:justify-end`}>
          <ul className='flex flex-col md:flex-row gap-3 md:gap-4 mt-4 md:mt-0 text-center'>
            {token ? (
              <>
                <li className="relative">
                  <Link to="/cart" className="flex items-center gap-1 hover:text-gray-500 transition relative">
                    <i className="fas fa-shopping-cart text-2xl"></i>
                    {numOfCartItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {numOfCartItems}
                      </span>
                    )}
                  </Link>
                </li>

                <li className="cursor-pointer">
                  <span onClick={logout}>Logout</span>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
