import Style from './CheckOut.module.css'
import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { baseurl, userTokenKey } from '../../constansts';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function CheckOut() {

  let [Loading, setLoading] = useState(false);
  let {id} = useParams();
  let {checkOut} = useContext(CartContext);

  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city:''
    },
    onSubmit: () => handleCheckout(id, 'http://localhost:5173')
  });

  async function handleCheckout(cartId, url) {
    let {data} = await checkOut(cartId, url, formik.values);
    console.log(data);
    if(data.status==='success'){
      window.location.href = data?.session?.url;
    }
  }

  return <>
    <div className='lg:py-6 py-2 max-w-xl mx-auto'>
      <h2 className='text-3xl font-bold mb-6 text-green-600'>Check Out</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.details}
            name="details" id="details"
            type="text" placeholder=' ' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" />
          <label htmlFor="details" className=" absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your details
          </label>
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
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.city}
            name="city" id="city"
            type="text" placeholder=' ' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" />
          <label htmlFor="city" className=" absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Enter your city
          </label>
        </div>
        <div className='flex items-center gap-3 flex-wrap'>
          <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-cente">{Loading ? <i className='fas fa-spinner fa-spin'></i> : 'Checkout now'}</button>
        </div>
      </form>
    </div>
  </>
}
