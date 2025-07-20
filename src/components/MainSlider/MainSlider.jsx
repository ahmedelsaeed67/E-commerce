import React, {useState, useEffect } from 'react'
import Style from "./MainSlider.module.css"
import img1 from "../../assets/banner1.jpg"
import img2 from "../../assets/banner2.jpg"
import img3 from "../../assets/slider1.jpg"
import img4 from "../../assets/slider2.jpg"
import img5 from "../../assets/slider3.jpg"
import Slider from 'react-slick';

export default function MainSlider() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{},[])
     var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoPlay:true,
    arrows:false
  };
  return (
    <>
    <div className='flex '>
        <div className="w-3/4">
        <Slider {...settings}>
            <img src={img5} className=' h-[400px] '></img>
            <img src={img4} className='h-[400px] '></img>
            <img src={img3} className='h-[400px]'></img>
          
        </Slider>

        </div>
        <div className="w-1/4 ">
        <img src={img2} alt="" className='w-full h-[200px]'></img>
         <img src={img1} alt="" className='w-full h-[200px]'></img>
        </div>

    </div>
   
    
    </>
  )
}
