import React, { createContext, useState } from 'react';
import axios from 'axios';

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [products, setProducts] = useState(null);
  const [priceOfCart, setPriceOfCart] = useState(null);
  const [isloading, setIsLoading] = useState(false)
  const [cartId, setCartId] = useState(null)
  async function addToCart(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        {
          headers: {
            token: localStorage.getItem('token')
          }
        }
      );

      if (data.status === 'success') {
        setNumOfCartItems(data.numOfCartItems);
        return { status: 'success', numOfCartItems: data.numOfCartItems }; 
      } else {
        return { status: 'fail' };
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      return { status: 'fail' };
    }
  }


        function getCart(){
          setIsLoading(true)
          axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
              token:localStorage.getItem('token')
            }
          })
          .then((res)=>{
            console.log(res)
            setProducts(res.data.data.products)
            setNumOfCartItems(res.data.numOfCartItems)
            setPriceOfCart(res.data.data.totalCartPrice)
            setCartId(res.data.cartId)
            

          })
          .catch((error)=>{
            console.log(error)
          }).finally(()=>{
            setIsLoading(false)
          })
        }

        async function removeItem(id){
         return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers:{
              token:localStorage.getItem('token')
            }
          })

          .then((res)=>{
            console.log(res)
            setProducts(res.data.data.products)
            setNumOfCartItems(res.data.numOfCartItems)
            setPriceOfCart(res.data.data.totalCartPrice)
            return true
            
          },[])
          .catch((error)=>{
            console.log(error)

            return false
          },[])
        }

       async   function updateQuantityProduct(id,count){
           return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},{
              headers:{
                 token:localStorage.getItem('token')
              }
            })
            .then((res)=>{
              console.log(res);
               setProducts(res.data.data.products)
            setNumOfCartItems(res.data.numOfCartItems)
            setPriceOfCart(res.data.data.totalCartPrice)
              return true
            })
            .catch((error)=>{
              console.log(error);
              return false
            })
          }

          function deleteCart(){
            axios.delete("https://ecommerce.routemisr.com/api/v1/cart",{
              headers:{
                token:localStorage.getItem('token')
              }
            })
            .then((res)=>{
              console.log(res)
              setProducts([])
            setNumOfCartItems(0)
            setPriceOfCart(0)
            })
            .catch((error)=>{
              console.log(error)
            })
          }
  return (
    <cartContext.Provider value={{ addToCart, numOfCartItems,deleteCart, setNumOfCartItems,cartId ,getCart ,products,priceOfCart ,isloading,removeItem, updateQuantityProduct}}>
      {children}
    </cartContext.Provider>
  );
}
