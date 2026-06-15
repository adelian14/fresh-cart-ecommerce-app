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
    <div className="px-4 md:px-8 py-6">
      <div className='card p-4 md:p-8 flex flex-col md:flex-row gap-8'>
        {/* Gallery */}
        <div className="md:w-[38%] w-full">
          <div className='rounded-3xl overflow-hidden border border-cream-200 bg-cream-50'>
            <img ref={mainImage} src={product?.imageCover} alt={product?.title} className="w-full object-cover object-center"></img>
          </div>
          <div className='flex flex-wrap gap-3 mt-4'>
            {
              product?.images?.map(image => <img key={image} onClick={() => {
                mainImage.current.setAttribute('src', image);
                setActiveImage(image);
              }} className={`size-16 object-cover object-center rounded-2xl cursor-pointer transition-all ${image == activeImage ? 'ring-2 ring-clay-500 ring-offset-2 ring-offset-white' : 'ring-1 ring-cream-200 hover:ring-forest-300'}`} src={image}></img>)
            }
          </div>
        </div>

        {/* Info */}
        <div className='md:w-[62%] w-full'>
          <p className='eyebrow'>{product?.category?.name} · {product?.subcategory?.[0]?.name}</p>
          <h1 className='font-display text-3xl md:text-4xl font-semibold text-forest-800 mt-3 leading-tight'>{product?.brand?.name} {product?.title}</h1>

          <div className='flex items-center gap-3 mt-4'>
            <span className='inline-flex items-center gap-1.5 bg-clay-50 text-clay-600 rounded-full text-sm font-semibold px-3 py-1'><i className='fas fa-star'></i> {product?.ratingsAverage}</span>
            <span className='inline-flex items-center bg-forest-50 text-forest-700 rounded-full text-sm font-semibold px-3 py-1'>{product?.sold} sold</span>
          </div>

          <p className='text-ink/60 leading-relaxed mt-5'>{product?.description}</p>

          <div className='mt-6 pt-6 border-t border-cream-200 flex flex-wrap items-center gap-5'>
            <p className='font-display text-4xl font-semibold text-forest-700'>{product?.price} <span className='text-lg text-ink/40 font-sans'>EGP</span></p>
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
            }} className={`btn-primary text-base px-8 py-3 ${!userLogin || btnLoading ? 'cursor-default bg-opacity-60' : ''}`}>{btnLoading ? <i className='fas fa-spinner fa-spin'></i> : <><i className='fas fa-basket-shopping'></i> Add to cart</>}</button>
            {!userLogin && clicked && <span className='text-clay-600 font-semibold'>Please log in to add items</span>}
          </div>
        </div>
      </div>

      {newRelated.length > 0 && <div className="pt-12">
        <span className='eyebrow'>You may also like</span>
        <h2 className='section-title mt-2 mb-2'>Related products</h2>
        <div className='flex flex-wrap -mx-2'>
          {newRelated.map(p => <SingleProductCol isRelated={true} related={relatedProducts} key={p?.id} product={p} />)}
        </div>
      </div>}
    </div>
  </>
}
