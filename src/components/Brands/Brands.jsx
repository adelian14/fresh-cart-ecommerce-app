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
    <div className="row">
      <h1 className='text-3xl font-semibold w-full mb-2'>Browse by brand</h1>
      <div className='lg:w-[12%] w-1/4 my-6 border-r px-1'>
        <h1 key='All' onClick={() => {
          setActiveBrand('All');
          setProducts(allProducts.filter(p => true));
        }} className={`my-4 cursor-pointer p-1 rounded-md ${activeBrand == 'All' ? ' bg-green-600 text-white' : ''}`}>All brands</h1>
        {brands?.data?.data?.map(brand => <h1 key={brand?._id} onClick={() => {
          setActiveBrand(brand?.name);
          setProducts(allProducts.filter(p => p?.brand?.name == brand?.name));
        }} className={`my-4 cursor-pointer p-1 rounded-md ${activeBrand == brand?.name ? ' bg-green-600 text-white' : ''}`}>{brand?.name}</h1>)}
      </div>
      <div className='lg:w-[88%] w-3/4'>
        <div className='row'>
          {loading ? <Loading /> : products.length ? products?.map(product => <SingleProductCol layout={'brands/cats'} related={products.filter(p => p?.category?.name == product?.category?.name)} key={product?.id} product={product} />) : <h1 className='m-auto my-6 text-xl font-medium'>No products from this brand yet</h1>}
        </div>
      </div>
    </div>
  </>
}

