import React, { useEffect, useState } from 'react'
import Style from './Notfound.module.css'

export default function Notfound({msg}) {
  useEffect(()=>{

  },[]);

  return <>
    <div className='flex justify-center items-center h-[75vh]'>
      <h1 className='text-red-600 text-7xl'>{msg?msg:'This page is not found'}</h1>
    </div>
  </>
}
