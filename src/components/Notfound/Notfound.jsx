import React, { useEffect, useState } from 'react'
import Style from './Notfound.module.css'

export default function Notfound({msg}) {
  useEffect(()=>{

  },[]);

  return <>
    <div className='flex justify-center items-center min-h-[70vh] px-4'>
      <div className='card p-10 md:p-14 max-w-lg w-full text-center'>
        <span className='inline-flex w-20 h-20 rounded-full bg-clay-50 text-clay-500 items-center justify-center text-4xl mb-6'><i className='fas fa-magnifying-glass'></i></span>
        <p className='font-display text-7xl font-semibold text-forest-800'>404</p>
        <h1 className='font-display text-2xl font-semibold text-forest-700 mt-2'>{msg ? msg : 'This page is not found'}</h1>
        <p className='text-ink/55 mt-3'>The page you're looking for may have wandered off to the farm.</p>
        <a href='/' className='btn-primary mt-8'><i className='fas fa-arrow-left'></i> Back home</a>
      </div>
    </div>
  </>
}
