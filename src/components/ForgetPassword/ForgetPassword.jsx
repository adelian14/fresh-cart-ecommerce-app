import React, { useContext, useEffect, useState } from 'react'
import Style from './ForgetPassword.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { baseurl, userTokenKey } from '../../constansts';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';
import ResetCode from '../ResetCode/ResetCode';

export default function ForgetPassword() {

  let [apiError, setApiError] = useState('');
  let [Loading, setLoading] = useState(false);
  let [done, setDone] = useState(false);
  let [email, setEmail] = useState('');
  let navigate = useNavigate();

  function handleForget(values) {
    setLoading(true);
    axios.post(`${baseurl}/auth/forgotPasswords`, values)
      .then((apiResponse) => {
        setLoading(false);
        setApiError('');
        toast.success(apiResponse?.data?.message);
        setEmail(JSON.parse(apiResponse?.config?.data)?.email);
        setDone(true);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      })
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email invalid').required('Email is required')
  });

  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: handleForget
  });

  if(done) return <ResetCode email={email}/>

  return <>
    <div className='py-10 max-w-md mx-auto px-4'>
      <div className='card overflow-hidden'>
        <div className='bg-forest-700 text-cream-50 px-8 py-7 text-center'>
          <span className='inline-flex w-12 h-12 rounded-full bg-cream-50/10 items-center justify-center text-clay-300 text-lg mb-3'><i className='fas fa-key'></i></span>
          <h2 className='font-display text-2xl font-semibold'>Reset your password</h2>
          <p className='text-cream-100/70 text-sm mt-1'>We'll send a reset code to your email.</p>
        </div>
        <div className='p-8'>
      {apiError && <div className="p-4 mb-4 text-sm text-clay-700 rounded-2xl bg-clay-50" role="alert">
        {apiError}
      </div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full mb-6">
          <label htmlFor="email" className='field-label'>Email</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.email}
            name="email" id="email"
            type="email" placeholder='you@example.com' className="field-input" />
          {formik.touched.email && formik.errors.email && <p className='text-sm text-clay-600 mt-1'>{formik.errors.email}</p>}
        </div>
        <button type="submit" className="btn-primary w-full text-base">{Loading ? <i className='fas fa-spinner fa-spin'></i> : 'Send reset code'}</button>
      </form>
        </div>
      </div>
    </div>
  </>
}
