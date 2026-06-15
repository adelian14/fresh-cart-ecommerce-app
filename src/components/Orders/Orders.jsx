import React, { useEffect, useState } from 'react'
import Style from './Orders.module.css'
import { Link } from 'react-router-dom'

export default function Orders() {
  useEffect(()=>{

  },[]);

  return <>
    <div className='flex justify-center items-center min-h-[70vh] px-4'>
      <div className='card p-10 md:p-14 max-w-lg w-full text-center'>
        <span className='inline-flex w-20 h-20 rounded-full bg-forest-50 text-forest-600 items-center justify-center text-4xl mb-6'><i className='fas fa-check'></i></span>
        <span className='eyebrow justify-center'>Order confirmed</span>
        <h1 className='font-display text-3xl md:text-4xl font-semibold text-forest-800 mt-3'>Payment successful!</h1>
        <p className='text-ink/55 mt-3'>Thank you for shopping with FreshCart. Your fresh goods are being packed and will be on their way shortly.</p>
        <div className='flex flex-wrap gap-3 justify-center mt-8'>
          <Link to='/products' className='btn-primary'>Keep shopping <i className='fas fa-arrow-right'></i></Link>
          <Link to='/' className='btn bg-cream-100 text-forest-700 hover:bg-forest-50'>Back home</Link>
        </div>
      </div>
    </div>
  </>
}
