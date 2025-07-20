import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner';

export default function GetUserOrder() {
  const [orders, setOrders] = useState([])
  const [isloading, setLoading] = useState(true)

  useEffect(() => {
    async function getUserOrders() {
      try {
        const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user', {
          headers: {
            token: localStorage.getItem('token'),
          },
        })

        console.log("Fetched orders:", data)
        setOrders(data)
      } catch (error) {
        console.error("Error fetching orders:", error)
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    getUserOrders()
  }, [])

   if(isloading){
       return <div className='flex justify-center items-center h-screen'><ColorRing
     visible={true}
     height="80"
     width="80"
     ariaLabel="color-ring-loading"
     wrapperStyle={{}}
     wrapperClass="color-ring-wrapper"
     colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
     /></div>
      }
  

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold mb-8 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-xl text-gray-500">No orders found.</div>
      ) : (
        orders.map((order, index) => (
          <div key={index} className="border p-4 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
            <p className="mb-2 text-gray-600">Payment: {order.paymentMethodType}</p>
            <p className="mb-4 text-green-600">Total Price: {order.totalOrderPrice} EGP</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {order.cartItems?.map((item, i) => (
                <div key={i} className="border p-3 rounded shadow-sm">
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title}
                    className="h-32 w-full object-cover mb-2 rounded"
                  />
                  <h4 className="text-lg font-medium">{item.product.title}</h4>
                  <p>Count: {item.count}</p>
                  <p>Price: {item.price} EGP</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}
