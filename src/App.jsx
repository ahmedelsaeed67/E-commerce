import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'


import Brands from './components/Brands/Brands'
import Categories from './components/Categories/Categories'
import NotFound from './components/NotFound/NotFound'
import TokenContextProvider from './Context/TokenContextProvider'
import ProtectedRoute from './components/protectedRoute/protectedRoute'
import ProductDetails from './components/productDetails/productDetails'
import CartContextProvider from './Context/CartContextProvider'
import  { Toaster } from 'react-hot-toast';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import WishlistContextProvider from './Context/WishlistContextProvider'
import Payment from './components/Payment/Payment'
import Wishlist from './components/WishList/WishList'
import GetUserOrder from './components/GetUserOrder/GetUserOrder'
import VerifyCode from './components/VerifyCode/VerifyCode'
import ResetPassword from './components/ResetPassword/ResetPassword'






export default function App() {

  const router= createBrowserRouter([
     
    {path:"" ,element:<Layout/> , children:[{
      path:"/",element:<Home/>},
      {path:"products",element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:"productDetails/:id",element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
       {path:"cart",element:<ProtectedRoute><Cart/></ProtectedRoute>},
       {path:"payment",element:<ProtectedRoute><Payment/></ProtectedRoute>},
       {path:"getUserOrder",element:<ProtectedRoute><GetUserOrder/></ProtectedRoute>},
       {path:"login",element:<Login/>},
        {path:"register",element:<Register/>},
        {path:"wishlist",element: <ProtectedRoute><Wishlist/></ProtectedRoute>},
     { path: "forget-password", element: <ForgetPassword /> },
     { path: "verify-code", element: <VerifyCode /> },
     { path: "reset-password", element: <ResetPassword/> },

  

        {path:"brands",element: <ProtectedRoute><Brands/></ProtectedRoute>},
        {path:"categories",element:<ProtectedRoute><Categories/></ProtectedRoute>},
        {path:"",element:<NotFound/>},
      
      ]}
  ] )
  return (
    <>
     <WishlistContextProvider>
   < TokenContextProvider>
      < CartContextProvider>
    <RouterProvider router={router}/>
    <Toaster/>
    </CartContextProvider>
   </TokenContextProvider>
   </WishlistContextProvider>


    
    
    
    </>
  )
}
