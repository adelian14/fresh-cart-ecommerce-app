import React, { useEffect, useState } from 'react'
import Style from './Categories.module.css'
import axios from 'axios';
import { baseurl } from '../../constansts';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import SingleProductCol from '../SingleProductCol/SingleProductCol';

export default function Categories() {

  let [products, setProducts] = useState([]);
  let [allProducts, setAllProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [activeCat, setActiveCat] = useState('All');

  function getProducts() {
    setLoading(true)
    axios.get(`${baseurl}/products`)
      .then(response => {
        setLoading(false);
        setProducts(response?.data?.data);
        setAllProducts(response?.data?.data);
      })
      .catch(error => {
        setLoading(false);
      })
  }

  useEffect(() => {
    getProducts();
  }, [])


  let { data: cats, isError: catIsError, error: catError, isLoading: catIsLoading } = useQuery({
    queryKey: ['recentCategories'],
    queryFn: () => axios.get(`${baseurl}/categories`),
    staleTime: 50000
  });

  return <>
    <div className="px-4 md:px-8 py-4">
      <span className='eyebrow'>Find your aisle</span>
      <h1 className='section-title mt-2 mb-6'>Browse by category</h1>
      <div className='flex flex-col lg:flex-row gap-6'>
        <aside className='lg:w-56 shrink-0'>
          <div className='card p-3 lg:sticky lg:top-24'>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-ink/40 px-3 pt-2 pb-1'>Categories</p>
            <button key='All' onClick={() => {
              setActiveCat('All');
              setProducts(allProducts.filter(p => true));
            }} className={`block w-full text-left my-1 cursor-pointer px-3 py-2 rounded-full font-semibold transition-all ${activeCat == 'All' ? 'bg-forest-600 text-cream-50 shadow-soft' : 'text-ink/70 hover:bg-forest-50 hover:text-forest-700'}`}>All</button>
            {cats?.data?.data?.map(cat => <button key={cat?._id} onClick={() => {
              setActiveCat(cat?.name);
              setProducts(allProducts.filter(p => p?.category?.name == cat?.name));
            }} className={`block w-full text-left my-1 cursor-pointer px-3 py-2 rounded-full font-semibold transition-all ${activeCat == cat?.name ? 'bg-forest-600 text-cream-50 shadow-soft' : 'text-ink/70 hover:bg-forest-50 hover:text-forest-700'}`}>{cat?.name}</button>)}
          </div>
        </aside>
        <div className='flex-1'>
          <div className='flex flex-wrap -mx-2'>
            {loading ? <Loading /> : products.length ? products?.map(product => <SingleProductCol layout={'brands/cats'} related={products.filter(p => p?.category?.name == product?.category?.name)} key={product?.id} product={product} />) : <h1 className='m-auto my-12 text-xl font-display text-ink/50'>No products in this category yet</h1>}
          </div>
        </div>
      </div>
    </div>
  </>
}
