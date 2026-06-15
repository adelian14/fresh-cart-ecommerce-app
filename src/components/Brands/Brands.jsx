import React, { useEffect, useState } from 'react'
import Style from './Brands.module.css'
import axios from 'axios';
import { baseurl } from '../../constansts';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import SingleProductCol from '../SingleProductCol/SingleProductCol';
import BrandSlider from '../BrandSlider/BrandSlider';
export default function Brands() {

  let [products, setProducts] = useState([]);
  let [allProducts, setAllProducts] = useState([]);
  let [loading, setLoading] = useState(false);
  let [activeBrand, setActiveBrand] = useState('All');

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


  let { data: brands, isError: brandIsError, error: brandError, isLoading: brandIsLoading } = useQuery({
    queryKey: ['recentBrands'],
    queryFn: () => axios.get(`${baseurl}/brands`),
    staleTime: 50000
  });

  return <>
    <BrandSlider/>
    <div className="px-4 md:px-8 py-4">
      <span className='eyebrow'>Curated makers</span>
      <h1 className='section-title mt-2 mb-6'>Browse by brand</h1>
      <div className='flex flex-col lg:flex-row gap-6'>
        <aside className='lg:w-56 shrink-0'>
          <div className='card p-3 lg:sticky lg:top-24'>
            <p className='text-xs font-bold uppercase tracking-[0.18em] text-ink/40 px-3 pt-2 pb-1'>Brands</p>
            <button key='All' onClick={() => {
              setActiveBrand('All');
              setProducts(allProducts.filter(p => true));
            }} className={`block w-full text-left my-1 cursor-pointer px-3 py-2 rounded-full font-semibold transition-all ${activeBrand == 'All' ? 'bg-forest-600 text-cream-50 shadow-soft' : 'text-ink/70 hover:bg-forest-50 hover:text-forest-700'}`}>All brands</button>
            {brands?.data?.data?.map(brand => <button key={brand?._id} onClick={() => {
              setActiveBrand(brand?.name);
              setProducts(allProducts.filter(p => p?.brand?.name == brand?.name));
            }} className={`block w-full text-left my-1 cursor-pointer px-3 py-2 rounded-full font-semibold transition-all ${activeBrand == brand?.name ? 'bg-forest-600 text-cream-50 shadow-soft' : 'text-ink/70 hover:bg-forest-50 hover:text-forest-700'}`}>{brand?.name}</button>)}
          </div>
        </aside>
        <div className='flex-1'>
          <div className='flex flex-wrap -mx-2'>
            {loading ? <Loading /> : products.length ? products?.map(product => <SingleProductCol layout={'brands/cats'} related={products.filter(p => p?.category?.name == product?.category?.name)} key={product?.id} product={product} />) : <h1 className='m-auto my-12 text-xl font-display text-ink/50'>No products from this brand yet</h1>}
          </div>
        </div>
      </div>
    </div>
  </>
}

