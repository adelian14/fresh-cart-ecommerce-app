import React, { useContext, useEffect, useState } from 'react'
import Style from './CreatePassword.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { baseurl, userTokenKey } from '../../constansts';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';

export default function CreatePassword({email}) {

  let [apiError, setApiError] = useState('');
  let [Loading, setLoading] = useState(false);
  let {userLogin, setUserLogin} = useContext(UserContext);
  let navigate = useNavigate();

  function handleCreatePassword(values) {
    setLoading(true);
    axios.put(`${baseurl}/auth/resetPassword`, values)
      .then((apiResponse) => {
        setLoading(false);
        setApiError('');
        navigate('/');
        localStorage.setItem(userTokenKey, apiResponse?.data?.token);
        setUserLogin(apiResponse?.data?.token);
        toast.success('Password changed successfully');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
        console.log(error);
      })
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email invalid').required('Email is required'),
    newPassword: Yup.string().min(6, 'Too short').matches(/^[A-Z][a-zA-Z0-9]{5,}$/, 'Password must start with a capital letter and containes only english letters and/or numbers').required('Password is required'),
  });

  let formik = useFormik({
    initialValues: {
      email: email,
      newPassword: ''
    },
    validationSchema,
    onSubmit: handleCreatePassword
  });

  return <>
    <div className='py-10 max-w-md mx-auto px-4'>
      <div className='card overflow-hidden'>
        <div className='bg-forest-700 text-cream-50 px-8 py-7 text-center'>
          <span className='inline-flex w-12 h-12 rounded-full bg-cream-50/10 items-center justify-center text-clay-300 text-lg mb-3'><i className='fas fa-lock'></i></span>
          <h2 className='font-display text-2xl font-semibold'>Set a new password</h2>
          <p className='text-cream-100/70 text-sm mt-1'>For {email}</p>
        </div>
        <div className='p-8'>
      {apiError && <div className="p-4 mb-4 text-sm text-clay-700 rounded-2xl bg-clay-50" role="alert">
        {apiError}
      </div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full mb-6">
          <label htmlFor="newPassword" className='field-label'>New password</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.newPassword}
            name="newPassword" id="newPassword"
            type="password" placeholder='••••••••' className="field-input" />
          {formik.touched.newPassword && formik.errors.newPassword && <p className='text-sm text-clay-600 mt-1'>{formik.errors.newPassword}</p>}
        </div>
        <button type="submit" className="btn-primary w-full text-base">{Loading?<i className='fas fa-spinner fa-spin'></i>:'Change password'}</button>
      </form>
        </div>
      </div>
    </div>
  </>
}
