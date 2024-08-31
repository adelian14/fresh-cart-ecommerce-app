import React, { useContext, useEffect, useState } from 'react'
import Style from './Register.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { baseurl, userTokenKey } from '../../constansts';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';

export default function Register() {

  let [apiError, setApiError] = useState('');
  let [Loading, setLoading] = useState(false);
  let {userLogin, setUserLogin} = useContext(UserContext);
  
  let navigate = useNavigate();

  function handleRegister(values) {
    setLoading(true);
    axios.post(`${baseurl}/auth/signup`, values)
      .then((apiResponse) => {
        setLoading(false);
        setApiError('');
        navigate('/');
        localStorage.setItem(userTokenKey, apiResponse?.data?.token);
        setUserLogin(apiResponse?.data?.token);
        toast.success('Account created successfully');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      })
  }

  let validationSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Name must has at least 3 characters').required('Name is required'),
    email: Yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email invalid').required('Email is required'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Phone invalid').required('Phone is required'),
    password: Yup.string().min(6, 'Too short').matches(/^[A-Z][a-zA-Z0-9]{5,}$/, 'Password must start with a capital letter and containes only english letters and/or numbers').required('Password is required'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], 'Not matching').required('Password must be confirmed')
  });

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: handleRegister
  });

  return <>
    <div className='lg:py-6 py-2 max-w-xl mx-auto'>
      {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        {apiError}
      </div>}
      <h2 className='text-3xl font-bold mb-6 text-green-600'>Register now</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.name}
            name="name" id="name"
            type="text" placeholder=' ' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" />
          <label htmlFor="name" className=" absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your Name
          </label>
          {formik.touched.name && formik.errors.name && <p className=' text-sm text-red-500'>{formik.errors.name}</p>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.email}
            name="email" id="email"
            type="email" placeholder=' ' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" />
          <label htmlFor="email" className=" absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your Email
          </label>
          {formik.touched.email && formik.errors.email && <p className=' text-sm text-red-500'>{formik.errors.email}</p>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.phone}
            name="phone" id="phone"
            type="tel" placeholder=' ' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" />
          <label htmlFor="phone" className=" absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your phone
          </label>
          {formik.touched.phone && formik.errors.phone && <p className=' text-sm text-red-500'>{formik.errors.phone}</p>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.password}
            name="password" id="password"
            type="password" placeholder=' ' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" />
          <label htmlFor="password" className=" absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your password
          </label>
          {formik.touched.password && formik.errors.password && <p className=' text-sm text-red-500'>{formik.errors.password}</p>}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.rePassword}
            name="rePassword" id="rePassword"
            type="password" placeholder=' ' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" />
          <label htmlFor="rePassword" className=" absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Re-enter your assword
          </label>
          {formik.touched.rePassword && formik.errors.rePassword && <p className=' text-sm text-red-500'>{formik.errors.rePassword}</p>}
        </div>
        <div className='flex items-center gap-3 flex-wrap'>
          <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-cente">{Loading?<i className='fas fa-spinner fa-spin'></i>:'Sign Up'}</button>
          <p>Already have an account? <Link to={'/login'} className='font-semibold text-green-700 underline cursor-pointer'>Login Now</Link></p>
        </div>
      </form>
    </div>
  </>
}
