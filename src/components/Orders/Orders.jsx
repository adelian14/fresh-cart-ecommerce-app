import React, { useEffect, useState } from 'react'
import Style from './Orders.module.css'

export default function Orders() {
  useEffect(()=>{

  },[]);

  return <>
    <div className='flex justify-center flex-col items-center h-[75vh]'>
      <h1 className='text-green-600 text-5xl mb-5'>Payment processed successfully</h1>
      <h1 className='text-green-600 text-5xl'><i className='fas fa-check-circle'></i></h1>
    </div>
  </>
}
