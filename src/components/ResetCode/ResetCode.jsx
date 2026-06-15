import React, { useContext, useEffect, useState } from 'react'
import Style from './ResetCode.module.css'
import { useFormik } from 'formik';
import axios from 'axios';
import { baseurl, userTokenKey } from '../../constansts';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';
import toast from 'react-hot-toast';
import CreatePassword from '../CreatePassword/CreatePassword';

export default function ResetCode({email}) {

  let [apiError, setApiError] = useState('');
  let [Loading, setLoading] = useState(false);
  let [done, setDone] = useState(false);
  let navigate = useNavigate();

  function handleReset(values) {
    setLoading(true);
    axios.post(`${baseurl}/auth/verifyResetCode`, values)
      .then((apiResponse) => {
        setLoading(false);
        setApiError('');
        toast.success(apiResponse?.data?.status);
        setDone(true);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error?.response?.data?.message);
      })
  }

  let validationSchema = Yup.object().shape({
    resetCode: Yup.string().required('Reset code is required')
  });

  let formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: handleReset
  });

  if(done) return <CreatePassword email={email}/>

  return <>
    <div className='py-10 max-w-md mx-auto px-4'>
      <div className='card overflow-hidden'>
        <div className='bg-forest-700 text-cream-50 px-8 py-7 text-center'>
          <span className='inline-flex w-12 h-12 rounded-full bg-cream-50/10 items-center justify-center text-clay-300 text-lg mb-3'><i className='fas fa-envelope-open-text'></i></span>
          <h2 className='font-display text-2xl font-semibold'>Check your inbox</h2>
          <p className='text-cream-100/70 text-sm mt-1'>We sent a reset code to {email}</p>
        </div>
        <div className='p-8'>
      {apiError && <div className="p-4 mb-4 text-sm text-clay-700 rounded-2xl bg-clay-50" role="alert">
        {apiError}
      </div>}
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full mb-6">
          <label htmlFor="resetCode" className='field-label'>Reset code</label>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.resetCode}
            name="resetCode" id="resetCode"
            type="text" placeholder='Enter the code' className="field-input" />
          {formik.touched.resetCode && formik.errors.resetCode && <p className='text-sm text-clay-600 mt-1'>{formik.errors.resetCode}</p>}
        </div>
        <button type="submit" className="btn-primary w-full text-base">{Loading ? <i className='fas fa-spinner fa-spin'></i> : 'Verify code'}</button>
      </form>
        </div>
      </div>
    </div>
  </>
}
