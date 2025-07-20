import React  from 'react'
import Style from "./Layout.module.css"
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
    <Navbar/>

    <div className="container mx-auto grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 xl:grid-cols-6 mt-[50px]">
      <Outlet/>
    </div>

    <Footer/>
    
    
    </>

  )
}
