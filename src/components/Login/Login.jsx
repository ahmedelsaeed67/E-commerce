import React, { useContext, useState } from 'react';
import Style from './Login.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import * as YUP from 'yup';
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../../Context/TokenContextProvider';

export default function Login() {

   let {setToken} = useContext(tokenContext)

  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  function handleLogin(values) {
    setisLoading(true)
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then((res) => {
        console.log(res);
        setToken(res.data.token)
        localStorage.setItem("token",res.data.token)
        navigate('/');
      })
      .catch((error) => {
        console.log(error.response.data.message);
        setErrorMessage(error.response.data.message);
      }) .finally(() => {
    setisLoading(false);

      })
      
  }

  const validationSchema = YUP.object().shape({
    
    email: YUP.string()
      .email('email pattern is invalid')
      .required('email is required'),
    password: YUP.string()
      .matches(/^[A-Za-z0-9]{6,15}$/, 'Password must be 6–15 characters and contain only letters and numbers')
      .required('password is required'),
    
  });

  const LoginFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      {errorMessage && (
        <div
          className="p-4 mb-4 text-sm text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <h2 className="text-4xl py-2 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">Login now</h2>

      <form onSubmit={LoginFormik.handleSubmit} className="px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-auto pb-24">
        
       

       
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
          <input
            name="email"
            value={LoginFormik.values.email}
            onChange={LoginFormik.handleChange}
            onBlur={LoginFormik.handleBlur}
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
          {LoginFormik.errors.email && LoginFormik.touched.email && (
             <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mt-2 text-sm">
      {LoginFormik.errors.email}
    </div>
          )}
        </div>

        
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
          <input
            name="password"
            value={LoginFormik.values.password}
            onChange={LoginFormik.handleChange}
            onBlur={LoginFormik.handleBlur}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            required
          />
          {LoginFormik.errors.password && LoginFormik.touched.password && (
             <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mt-2 text-sm">
      {LoginFormik.errors.password}
    </div>
          )}
        </div>

        

        <div className="flex justify-between">
          <p className="mt-4 text-sm">
 
  <a href="/forget-password" className=" text-2xl hover:text-green-400">
    Forgot your password?{' '}
  </a>
</p>

          <button
            type="submit"
            disabled={isLoading ? true:false}

            className="cursor-pointer text-white my-5 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ?<i className= 'fas fa-spin fa-spinner'></i>: "login"}
          </button>
          

        </div>
      </form>
    </>
  );
}
