import React, { useEffect, useState } from 'react'
import Style from "./SliderCategory.module.css"

import Slider from 'react-slick';
import axios from 'axios';

export default function SliderCategory() {
  const [categories, setCategories] = useState([]);

  async function getCategory() {
    try {
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
      setCategories(data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <>
      <div className='container mx-auto pb-10'>
        <Slider {...settings} className='py-8'>
          {categories.map((category) => (
            <div key={category._id} className='text-center px-2'>
              <img src={category.image} alt={category.name} className='mx-auto rounded-lg w-100 object-cover h-[250px]' />
              <h3 className='mt-2 text-lg font-xl'>{category.name}</h3>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
