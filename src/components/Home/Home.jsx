import React, { useEffect, useState } from 'react'
import Style from './Home.module.css'
import RecentProducts from '../RecentProducts/RecentProducts';
import CategorySlider from '../CategorySlider/CategorySlider';
import MainSlider from '../MainSlider/MainSlider';
export default function Home() {
  useEffect(()=>{

  },[]);
  let perks = [
    { icon: 'fa-truck-fast', title: 'Next-day delivery', text: 'Order today, unpack fresh tomorrow.' },
    { icon: 'fa-leaf', title: 'Sourced locally', text: 'Straight from nearby farms & makers.' },
    { icon: 'fa-shield-heart', title: 'Quality promise', text: 'Not fresh? We make it right, always.' },
    { icon: 'fa-tags', title: 'Honest prices', text: 'Fair to you and to our growers.' },
  ];

  return <>
    <MainSlider/>

    <section className='px-4 md:px-8 py-6'>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {perks.map(perk => (
          <div key={perk.title} className='card p-5 flex items-start gap-4 hover:shadow-lift transition-shadow'>
            <span className='shrink-0 w-12 h-12 rounded-2xl bg-forest-50 text-forest-600 flex items-center justify-center text-lg'><i className={`fas ${perk.icon}`}></i></span>
            <div>
              <h3 className='font-display font-semibold text-forest-800'>{perk.title}</h3>
              <p className='text-sm text-ink/55 mt-0.5'>{perk.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    <CategorySlider/>
    <RecentProducts/>
  </>
}
