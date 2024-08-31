import React, { useEffect, useState } from 'react'
import Style from './Loading.module.css'

export default function Loading() {
  useEffect(()=>{

  },[]);

  return <>
      <div className='flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-15 z-[40]'>
        <i className='text-7xl fas fa-spinner fa-spin text-green-600'></i>
      </div>
  </>
}
