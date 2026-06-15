import React, { useEffect, useState } from 'react'
import Style from './Loading.module.css'

export default function Loading() {
  useEffect(()=>{

  },[]);

  return <>
      <div className='flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-forest-900/20 backdrop-blur-sm z-[40]'>
        <div className='card px-8 py-6 flex flex-col items-center gap-3'>
          <i className='text-4xl fas fa-leaf fa-spin text-forest-600'></i>
          <span className='font-display text-forest-700 font-semibold'>Gathering fresh goods…</span>
        </div>
      </div>
  </>
}
