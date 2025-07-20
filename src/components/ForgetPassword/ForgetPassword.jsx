import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
        navigate('/verify-code'); 
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Something went wrong');
      }
    },
  });

  return (
    <div className="container py-10">
      <h2 className="text-2xl font-bold mb-6 px-10">Please enter your email</h2>

      {errorMessage && <div className="bg-red-100 text-red-700 p-3 rounded mb-3">{errorMessage}</div>}

      <form onSubmit={formik.handleSubmit} className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-auto pb-24">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
        />
        {formik.errors.email && formik.touched.email && (
          <div className="text-red-500 text-sm">{formik.errors.email}</div>
        )}

        <button
          type="submit"
          className="text-white my-5 bg-green-700 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
