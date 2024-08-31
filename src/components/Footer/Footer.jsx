import React, { useEffect, useState } from 'react'
import Style from './Footer.module.css'

export default function Footer() {
  useEffect(()=>{

  },[]);

  return <>
    <div className='row bg-green-800 text-gray-200 items-center justify-center'>
      <h1 className=' text-center text-lg'>All rights reserved <i className='fas fa-copyright'></i> 2024</h1>
    </div>
  </>
}
