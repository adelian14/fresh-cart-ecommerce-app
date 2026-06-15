import React, { useEffect, useState } from 'react'
import Style from './About.module.css'
import { Link } from 'react-router-dom'

export default function About() {
  useEffect(() => {

  }, []);

  let values = [
    { icon: 'fa-leaf', title: 'Grown with care', text: 'We partner with local farms that treat the soil, the seasons, and their people right.' },
    { icon: 'fa-truck-fast', title: 'Picked, then packed', text: 'Orders are gathered the same day they ship, so freshness never sits on a shelf.' },
    { icon: 'fa-hand-holding-heart', title: 'Fair for everyone', text: 'Honest prices for you, honest pay for the growers who make it all possible.' },
  ];

  return <>
    <div className='px-4 md:px-8 py-6'>
      {/* Hero */}
      <section className='card bg-forest-700 border-forest-700 text-cream-50 rounded-4xl p-8 md:p-14 relative overflow-hidden'>
        <div className='absolute -right-12 -top-12 w-56 h-56 rounded-full bg-forest-600/40'></div>
        <div className='absolute -left-10 -bottom-16 w-44 h-44 rounded-full bg-clay-500/20'></div>
        <div className='relative max-w-2xl'>
          <span className='eyebrow text-clay-200 before:bg-clay-300'>Our story</span>
          <h1 className='font-display text-4xl md:text-5xl font-semibold leading-tight mt-4'>A market that feels <span className='italic text-clay-300'>personal</span> again.</h1>
          <p className='text-cream-100/80 text-lg mt-5'>FreshCart started with a simple idea — that the food on your table should come from people you can trust, picked at its peak and delivered with care. No warehouses of mystery produce. Just real food, from real farms.</p>
          <Link to='/products' className='btn-clay text-base mt-8'>Explore the harvest <i className='fas fa-arrow-right'></i></Link>
        </div>
      </section>

      {/* Values */}
      <section className='grid md:grid-cols-3 gap-5 mt-6'>
        {values.map(v => (
          <div key={v.title} className='card p-7 hover:shadow-lift transition-shadow'>
            <span className='inline-flex w-12 h-12 rounded-2xl bg-forest-50 text-forest-600 items-center justify-center text-lg mb-4'><i className={`fas ${v.icon}`}></i></span>
            <h3 className='font-display text-xl font-semibold text-forest-800'>{v.title}</h3>
            <p className='text-ink/55 mt-2 leading-relaxed'>{v.text}</p>
          </div>
        ))}
      </section>

      {/* Stats band */}
      <section className='card mt-6 p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
        {[['5k+','Happy homes'],['120+','Local partners'],['24h','Avg. delivery'],['100%','Freshness promise']].map(([n,l]) => (
          <div key={l}>
            <p className='font-display text-3xl md:text-4xl font-semibold text-forest-700'>{n}</p>
            <p className='text-ink/50 text-sm mt-1'>{l}</p>
          </div>
        ))}
      </section>
    </div>
  </>
}
