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
    <div className='lg:py-6 py-2 max-w-xl mx-auto'>
      {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
        {apiError}
      </div>}
      <h2 className='text-xl font-semibold mb-6 text-green-600'>Reset code is sent to {email}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            vlaue={formik.values.resetCode}
            name="resetCode" id="resetCode"
            type="text" placeholder=' ' className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer" />
          <label htmlFor="resetCode" className=" absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Verify code
          </label>
          {formik.touched.resetCode && formik.errors.resetCode && <p className=' text-sm text-red-500'>{formik.errors.resetCode}</p>}
        </div>
        <div className='flex items-center gap-3 flex-wrap'>
          <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-cente">{Loading ? <i className='fas fa-spinner fa-spin'></i> : 'Verify'}</button>
        </div>
      </form>
    </div>
  </>
}
