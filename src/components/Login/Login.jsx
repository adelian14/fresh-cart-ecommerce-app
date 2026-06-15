import React, { useContext, useEffect, useState } from 'react'
import Style from './Login.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { baseurl, userTokenKey } from '../../constansts';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';

export default function Login() {

  let [apiError, setApiError] = useState('');
  let [Loading, setLoading] = useState(false);
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();

  function handleLogin(values) {
    setLoading(true);
    axios.post(`${baseurl}/auth/signin`, values)
      .then((apiResponse) => {
        setLoading(false);
        setApiError('');
        navigate('/');
        localStorage.setItem(userTokenKey, apiResponse?.data?.token);
        setUserLogin(apiResponse?.data?.token);
        toast.success('Welcome back, '+values?.email);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      })
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email invalid').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  let formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema,
    onSubmit: handleLogin
  });

  return <>
    <div className='py-10 max-w-md mx-auto px-4'>
      <div className='card overflow-hidden'>
        <div className='bg-forest-700 text-cream-50 px-8 py-7 text-center'>
          <span className='inline-flex w-12 h-12 rounded-full bg-cream-50/10 items-center justify-center text-clay-300 text-lg mb-3'><i className='fas fa-leaf'></i></span>
          <h2 className='font-display text-3xl font-semibold'>Welcome back</h2>
          <p className='text-cream-100/70 text-sm mt-1'>Log in to continue shopping fresh.</p>
        </div>
        <div className='p-8'>
      {apiError && <div className="p-4 mb-4 text-sm text-clay-700 rounded-2xl bg-clay-50" role="alert">
        {apiError}
      </div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full mb-5">
          <label htmlFor="email" className='field-label'>Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.email}
            name="email" id="email"
            type="email" placeholder='you@example.com' className="field-input" />
          {formik.touched.email && formik.errors.email && <p className='text-sm text-clay-600 mt-1'>{formik.errors.email}</p>}
        </div>
        <div className="w-full mb-6">
          <label htmlFor="password" className='field-label'>Password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.password}
            name="password" id="password"
            type="password" placeholder='••••••••' className="field-input" />
          {formik.touched.password && formik.errors.password && <p className='text-sm text-clay-600 mt-1'>{formik.errors.password}</p>}
        </div>
        <div className='flex flex-col gap-4'>
          <button type="submit" className="btn-primary w-full text-base">{Loading ? <i className='fas fa-spinner fa-spin'></i> : 'Log in'}</button>
          <div className='flex flex-wrap justify-between gap-2 text-sm'>
            <p className='text-ink/60'>New here? <Link to={'/register'} className='font-semibold text-forest-700 hover:text-clay-500 cursor-pointer'>Create an account</Link></p>
            <p><Link to={'/forgotpassword'} className='font-semibold text-forest-700 hover:text-clay-500 cursor-pointer'>Forgot password?</Link></p>
          </div>
        </div>
      </form>
        </div>
      </div>
    </div>
  </>
}
