import React, { useEffect, useState } from 'react'
import Style from './Footer.module.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  useEffect(()=>{

  },[]);

  return <>
    <footer className='relative bg-forest-800 text-cream-100 overflow-hidden'>
      {/* Newsletter strip */}
      <div className='container mx-auto px-6 pt-12'>
        <div className='card bg-clay-500 border-clay-500 text-white rounded-4xl p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-lift'>
          <div>
            <h3 className='font-display text-2xl md:text-3xl font-semibold'>Fresh news, straight to your basket</h3>
            <p className='text-white/80 mt-1'>Seasonal picks, recipes and member-only deals — once a week, no spam.</p>
          </div>
          <div className='flex gap-2 w-full md:w-auto'>
            <input type='email' placeholder='you@example.com' className='flex-1 md:w-64 px-4 py-3 rounded-full text-ink placeholder:text-ink/40 focus:outline-none' />
            <button className='btn bg-forest-700 hover:bg-forest-800 whitespace-nowrap'>Subscribe</button>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
          {/* Brand */}
          <div className='md:col-span-2 max-w-sm'>
            <div className='flex items-center gap-2 mb-4'>
              <span className='w-9 h-9 rounded-full bg-clay-500 text-white flex items-center justify-center'><i className='fas fa-leaf text-sm'></i></span>
              <span className='font-display text-2xl font-semibold text-cream-50'>Fresh<span className='text-clay-300'>Cart</span></span>
            </div>
            <p className='text-cream-100/70 leading-relaxed'>Hand-picked, farm-fresh groceries delivered to your door. Real food from people who care — the way a market should feel.</p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className='font-display text-lg text-cream-50 mb-4'>Explore</h3>
            <ul className='space-y-2.5'>
              <li><Link to='' className='text-cream-100/70 hover:text-clay-200 transition-colors'>Home</Link></li>
              <li><Link to='products' className='text-cream-100/70 hover:text-clay-200 transition-colors'>Products</Link></li>
              <li><Link to='categories' className='text-cream-100/70 hover:text-clay-200 transition-colors'>Categories</Link></li>
              <li><Link to='brands' className='text-cream-100/70 hover:text-clay-200 transition-colors'>Brands</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className='font-display text-lg text-cream-50 mb-4'>Stay connected</h3>
            <div className='flex gap-2.5'>
              <span className='w-10 h-10 flex items-center justify-center rounded-full bg-cream-50/10 hover:bg-clay-500 cursor-pointer transition-colors'><i className='fab fa-facebook'></i></span>
              <span className='w-10 h-10 flex items-center justify-center rounded-full bg-cream-50/10 hover:bg-clay-500 cursor-pointer transition-colors'><i className='fab fa-instagram'></i></span>
              <span className='w-10 h-10 flex items-center justify-center rounded-full bg-cream-50/10 hover:bg-clay-500 cursor-pointer transition-colors'><i className='fab fa-youtube'></i></span>
              <span className='w-10 h-10 flex items-center justify-center rounded-full bg-cream-50/10 hover:bg-clay-500 cursor-pointer transition-colors'><i className='fab fa-tiktok'></i></span>
            </div>
          </div>
        </div>

        <div className='border-t border-cream-50/10 mt-10 pt-6 text-center text-cream-100/60 text-sm'>
          Made with <i className='fas fa-seedling text-clay-300'></i> · All rights reserved <i className='fas fa-copyright'></i> 2024 FreshCart
        </div>
      </div>
    </footer>
  </>
}
