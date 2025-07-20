import axios from 'axios'
import { Formik, useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContextProvider'
import { useNavigate } from 'react-router-dom'

export default function Payment() {
  let navigate =useNavigate()
   let {cartId} = useContext(cartContext)
function cashOrder(values){
  let shippingAddress ={
    shippingAddress:values
  }
  console.log(shippingAddress)
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress,{
    headers:{
      token:localStorage.getItem('token')
    }
  }).then((res)=>{
      console.log(res)
      navigate("/getUserOrder")
  })
  .catch((error)=>{
    console.log(error)
  })
}

let paymenForm =  useFormik({
  initialValues:{
    details: "",
    phone: "",
    city: ""
  },
  onSubmit:cashOrder,
})

  return (
   <>
   <form onSubmit={paymenForm.handleSubmit} className='w-1/2 mx-auto my-10'>
     <div className="relative z-0 w-full mb-5 group">
      <input 
      name="details"
      value={ paymenForm.values.details}
      onChange={paymenForm.handleChange}
      onBlur={paymenForm.handleBlur}
      type="text"  id="floating_details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="floating_details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>
  </div>
   <div className="relative z-0 w-full mb-5 group">
      <input
      name="phone"
      value={ paymenForm.values.phone}
      onChange={paymenForm.handleChange}
      onBlur={paymenForm.handleBlur}
      type="tel"  id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>
   <div className="relative z-0 w-full mb-5 group">
      <input
      name="city"
      value={ paymenForm.values.city}
      onChange={paymenForm.handleChange}
      onBlur={paymenForm.handleBlur}
      type="text"  id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
      <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
  </div>
  <button type="submit" className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Pay Cash</button>

      {/* <button type="submit" className="cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Pay Online</button> */}

   </form>
   
   
   </>
  )
}
