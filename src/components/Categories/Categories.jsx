import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllCategories() {
    try {
      setIsLoading(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);
return (
  <div className="px-4 sm:px-6 lg:px-8 py-10">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Categories</h2>

      {isLoading ? (
        <div className='flex justify-center items-center h-64'>
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8">
          {categories.map(category => (
            <div key={category._id} className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[320px] object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-medium text-green-500">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

}
