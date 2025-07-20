import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getAllBrands() {
    try {
      setIsLoading(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Brands</h2>

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 py-8">
            {brands.map(brand => (
              <div key={brand._id} className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden hover:shadow-xl transition duration-300">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-[200px] object-contain bg-gray-50"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{brand.name}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
