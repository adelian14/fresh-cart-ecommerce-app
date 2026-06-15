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
    onSubmit: () => handleCheckout(id, 'https://fresh-cart-ecommerce-app-delta.vercel.app')
  });

  async function handleCheckout(cartId, url) {
    let {data} = await checkOut(cartId, url, formik.values);
    console.log(data);
    if(data.status==='success'){
      window.location.href = data?.session?.url;
    }
  }

  return <>
    <div className='py-8 max-w-lg mx-auto px-4'>
      <div className='card overflow-hidden'>
        <div className='bg-forest-700 text-cream-50 px-8 py-6'>
          <span className='eyebrow text-clay-200 before:bg-clay-300'>Almost there</span>
          <h2 className='font-display text-3xl font-semibold mt-2'>Delivery details</h2>
          <p className='text-cream-100/70 text-sm mt-1'>Tell us where to bring your fresh goods.</p>
        </div>
        <div className='p-8'>
        <form onSubmit={formik.handleSubmit}>
          <div className="w-full mb-5">
            <label htmlFor="details" className='field-label'>Address details</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              vlaue={formik.values.details}
              name="details" id="details"
              type="text" placeholder='Street, building, apartment…' className="field-input" />
          </div>
          <div className="w-full mb-5">
            <label htmlFor="phone" className='field-label'>Phone number</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              vlaue={formik.values.phone}
              name="phone" id="phone"
              type="tel" placeholder='01xxxxxxxxx' className="field-input" />
          </div>
          <div className="w-full mb-6">
            <label htmlFor="city" className='field-label'>City</label>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              vlaue={formik.values.city}
              name="city" id="city"
              type="text" placeholder='Your city' className="field-input" />
          </div>
          <button type="submit" className="btn-primary w-full text-base">{Loading ? <i className='fas fa-spinner fa-spin'></i> : <><i className='fas fa-lock'></i> Pay securely</>}</button>
        </form>
        </div>
      </div>
    </div>
  </>
}
