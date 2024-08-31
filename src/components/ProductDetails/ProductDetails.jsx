import React, { useContext, useEffect, useRef, useState } from 'react'
import Style from './ProductDetails.module.css'
import axios from 'axios';
import { baseurl, cartCounterKey } from '../../constansts';
import { useParams } from 'react-router-dom';
import Notfound from '../Notfound/Notfound';
import Loading from '../Loading/Loading';
import { useReducer } from 'react';
import { UserContext } from '../../Context/UserContext';
import { RelatedProductContext } from '../../Context/RelatedProductContext';
import SingleProductCol from '../SingleProductCol/SingleProductCol';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { CartCounterContext } from '../../Context/CartCounterContext';

export default function ProductDetails() {
  let [product, setProduct] = useState({});
  let [loading, setLoading] = useState(false);
  let [btnLoading, setBtnLoading] = useState(false);
  let [activeImage, setActiveImage] = useState('');
  let [clicked, setClicked] = useState(false);
  let [productNotFound, setProductNotFound] = useState(false);
  let { userLogin } = useContext(UserContext);
  let { relatedProducts, setRelatedProducts } = useContext(RelatedProductContext);
  let newRelated = relatedProducts.filter(p => p?.id != product?.id).slice(0, Math.min(relatedProducts.length, 4));
  let mainImage = useRef();
  let { id } = useParams();
  let { addProductToCart } = useContext(CartContext);
  let { setCartCounter } = useContext(CartCounterContext);

  function getProductDetails(id) {
    setLoading(true);
    axios.get(`${baseurl}/products/${id}`)
      .then((response) => {
        setLoading(false);
        setProductNotFound(false);
        response?.data?.data?.images?.unshift(response?.data?.data?.imageCover);
        setProduct(response?.data?.data);
        setActiveImage(response?.data?.data?.imageCover);

      })
      .catch((error) => {
        setLoading(false);
        setProductNotFound(true);
      })
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);


  if (productNotFound) return <Notfound msg={'Product not found'} />
  if (loading) return <Loading />
  return <>
    <div className="row">
      <h1 className='text-3xl font-semibold w-full md:hidden block'>{product?.brand?.name} {product?.title}</h1>
      <p className='text-green-600 md:hidden block mb-4'>{product?.category?.name}, {product?.subcategory?.[0]?.name}</p>
      <div className="md:w-[30%] w-[80%]">
        <img ref={mainImage} src={product?.imageCover} alt={product?.title} className="w-full rounded-lg border-4 border-gray-200"></img>
        <div className='flex flex-wrap gap-3 mt-3 px-2'>
          {
            product?.images?.map(image => <img key={image} onClick={() => {
              mainImage.current.setAttribute('src', image);
              setActiveImage(image);
            }} className={`size-14 object-cover object-center rounded-md cursor-pointer ${image == activeImage ? 'border-2 border-green-500' : 'border-2'}`} src={image}></img>)
          }
        </div>
      </div>

      <div className='md:w-[70%] md:p-8 p-4 w-full'>
        <h1 className='text-3xl font-semibold w-full hidden md:block'>{product?.brand?.name} {product?.title}</h1>
        <p className='text-green-600 hidden md:block'>{product?.category?.name}, {product?.subcategory?.[0]?.name}</p>
        <p className='text-gray-700 mt-4'>{product?.description}</p>
        <div className='flex justify-between flex-wrap items-center w-full py-1 pb-2 relative my-3'>
          <p className='text-xl font-semibold'>{product?.price} EGP</p>
          <div className='w-full my-3'>
            <button onClick={(e) => {
              e.stopPropagation();
              setClicked(true);
              if (!userLogin || btnLoading) return;
              setBtnLoading(true);
              addProductToCart(product?.id)
                .then(response => {
                  setBtnLoading(false);
                  toast.success('Product added successfully');
                  setCartCounter(response?.data?.numOfCartItems);
                  localStorage.setItem(cartCounterKey+userLogin,response?.data?.numOfCartItems);
                })
                .catch(error => {
                  setBtnLoading(false);
                  toast.error('Something went wrong');
                });
            }} className={`duration-500 btn bg-green-700 ${!userLogin || btnLoading ? 'cursor-default bg-opacity-50' : ''} w-1/2 shadow-lg`}>Add to cart</button>
            {!userLogin && clicked && <span className='mx-4 text-red-600 text-center'>You have to login first</span>}
          </div>
          <p className='px-3'>{product?.ratingsAverage} <i className='fas fa-star text-yellow-600'></i></p>
          <p className='px-3'>Sold {product?.sold} units</p>
          <div className="row w-full">
            <h1 className='text-3xl font-semibold w-full mb-2'>Related Products</h1>
            {newRelated.map(p => <SingleProductCol isRelated={true} related={relatedProducts} key={p?.id} product={p} />)}
          </div>
        </div>
      </div>
    </div>
  </>
}
