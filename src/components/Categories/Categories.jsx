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
    <div className="row">
      <h1 className='text-3xl font-semibold w-full mb-2'>Browse by category</h1>
      <div className='lg:w-[12%] w-1/4 my-6 border-r px-1'>
        <h1 key='All' onClick={() => {
          setActiveCat('All');
          setProducts(allProducts.filter(p => true));
        }} className={`my-4 cursor-pointer p-1 rounded-md ${activeCat == 'All' ? ' bg-green-600 text-white' : ''}`}>All</h1>
        {cats?.data?.data?.map(cat => <h1 key={cat?._id} onClick={() => {
          setActiveCat(cat?.name);
          setProducts(allProducts.filter(p => p?.category?.name == cat?.name));
        }} className={`my-4 cursor-pointer p-1 rounded-md ${activeCat == cat?.name ? ' bg-green-600 text-white' : ''}`}>{cat?.name}</h1>)}
      </div>
      <div className='lg:w-[88%] w-3/4'>
        <div className='row'>
          {loading ? <Loading /> : products.length ? products?.map(product => <SingleProductCol layout={'brands/cats'} related={products.filter(p => p?.category?.name == product?.category?.name)} key={product?.id} product={product} />) : <h1 className='m-auto my-6 text-xl font-medium'>No products in this category yet</h1>}
        </div>
      </div>
    </div>
  </>
}
