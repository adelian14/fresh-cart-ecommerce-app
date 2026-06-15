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
    <div className='py-10 max-w-md mx-auto px-4'>
      <div className='card overflow-hidden'>
        <div className='bg-forest-700 text-cream-50 px-8 py-7 text-center'>
          <span className='inline-flex w-12 h-12 rounded-full bg-cream-50/10 items-center justify-center text-clay-300 text-lg mb-3'><i className='fas fa-seedling'></i></span>
          <h2 className='font-display text-3xl font-semibold'>Join FreshCart</h2>
          <p className='text-cream-100/70 text-sm mt-1'>Create an account and start shopping today.</p>
        </div>
        <div className='p-8'>
      {apiError && <div className="p-4 mb-4 text-sm text-clay-700 rounded-2xl bg-clay-50" role="alert">
        {apiError}
      </div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full mb-4">
          <label htmlFor="name" className='field-label'>Full name</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.name}
            name="name" id="name"
            type="text" placeholder='Jane Doe' className="field-input" />
          {formik.touched.name && formik.errors.name && <p className='text-sm text-clay-600 mt-1'>{formik.errors.name}</p>}
        </div>
        <div className="w-full mb-4">
          <label htmlFor="email" className='field-label'>Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.email}
            name="email" id="email"
            type="email" placeholder='you@example.com' className="field-input" />
          {formik.touched.email && formik.errors.email && <p className='text-sm text-clay-600 mt-1'>{formik.errors.email}</p>}
        </div>
        <div className="w-full mb-4">
          <label htmlFor="phone" className='field-label'>Phone</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.phone}
            name="phone" id="phone"
            type="tel" placeholder='01xxxxxxxxx' className="field-input" />
          {formik.touched.phone && formik.errors.phone && <p className='text-sm text-clay-600 mt-1'>{formik.errors.phone}</p>}
        </div>
        <div className="w-full mb-4">
          <label htmlFor="password" className='field-label'>Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.password}
            name="password" id="password"
            type="password" placeholder='••••••••' className="field-input" />
          {formik.touched.password && formik.errors.password && <p className='text-sm text-clay-600 mt-1'>{formik.errors.password}</p>}
        </div>
        <div className="w-full mb-6">
          <label htmlFor="rePassword" className='field-label'>Confirm password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.rePassword}
            name="rePassword" id="rePassword"
            type="password" placeholder='••••••••' className="field-input" />
          {formik.touched.rePassword && formik.errors.rePassword && <p className='text-sm text-clay-600 mt-1'>{formik.errors.rePassword}</p>}
        </div>
        <div className='flex flex-col gap-4'>
          <button type="submit" className="btn-primary w-full text-base">{Loading?<i className='fas fa-spinner fa-spin'></i>:'Create account'}</button>
          <p className='text-sm text-ink/60'>Already have an account? <Link to={'/login'} className='font-semibold text-forest-700 hover:text-clay-500 cursor-pointer'>Log in</Link></p>
        </div>
      </form>
        </div>
      </div>
    </div>
  </>
}
