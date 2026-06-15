import React, { useContext, useEffect, useState } from 'react'
import Style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext';
import { useQuery } from '@tanstack/react-query';
import CartRow from '../CartRow/CartRow';
import Loading from '../Loading/Loading';
import { CartCounterContext } from '../../Context/CartCounterContext';
import { cartCounterKey } from '../../constansts';
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext';
import { Link } from 'react-router-dom';


export default function Cart() {
  let { getLoggedUserCart, clearCart } = useContext(CartContext);
  let { userLogin } = useContext(UserContext);
  let {cartCounter,setCartCounter} = useContext(CartCounterContext);
  let [cartDetails,setCartDetails] = useState(null);
  let [isLoading, setIsLoading] = useState(0);
  let [btnLoading, setBtnLoading] = useState(false);

  function getCart(){
    setIsLoading(true);
    getLoggedUserCart()
    .then((response)=>{
      setIsLoading(false);
      setCartDetails(response?.data?.data);
      setCartCounter(response?.data?.numOfCartItems);
      localStorage.setItem(cartCounterKey+userLogin,response?.data?.numOfCartItems);
    })
    .catch(error=>{
      setIsLoading(false);
    });  
  }

  let clearUserCart = () => {
    if(btnLoading) return;
    setBtnLoading(true);
    clearCart().then(response=>{
      toast.success('Cart cleared');
      setBtnLoading(false);
      setCartDetails(response?.data?.data);
      setCartCounter(response?.data?.numOfCartItems);
      localStorage.setItem(cartCounterKey+userLogin,response?.data?.numOfCartItems);
    }).catch(error=>{
      setBtnLoading(false);
      toast.error('Something went wrong');
      console.log(error);
    })
  }

  useEffect(()=>{
    getCart();
  },[])

  return <>
    <div className='px-4 md:px-8 py-4'>
      <span className='eyebrow'>Your basket</span>
      <h1 className='section-title mt-2 mb-6 flex items-center gap-3'><i className='fas fa-basket-shopping text-clay-500'></i> Shopping cart{!cartCounter ? ' is empty' : ''}</h1>
      {isLoading && <Loading/>}
      {!isLoading && !cartCounter && <div className='card p-12 text-center'>
        <span className='inline-flex w-16 h-16 rounded-full bg-cream-100 text-clay-400 items-center justify-center text-2xl mb-4'><i className='fas fa-basket-shopping'></i></span>
        <p className='font-display text-xl text-forest-800 mb-1'>Your basket is feeling light</p>
        <p className='text-ink/50 mb-6'>Fill it up with something fresh from our aisles.</p>
        <Link to='/products' className='btn-primary'>Start shopping <i className='fas fa-arrow-right'></i></Link>
      </div>}
      {cartCounter > 0 && cartDetails &&
      <div className='flex flex-col lg:flex-row gap-6'>
        <div className='flex-1'>
          <div className="card overflow-hidden">
            <div className='overflow-x-auto'>
              <table className="w-full text-sm text-left text-ink/70">
                <thead className="text-xs text-ink/40 uppercase tracking-wider bg-cream-50 border-b border-cream-200">
                  <tr>
                    <th scope="col" className="px-6 py-4"></th>
                    <th scope="col" className="px-6 py-4 max-w-64">Product</th>
                    <th scope="col" className="px-6 py-4">Quantity</th>
                    <th scope="col" className="px-6 py-4">Price</th>
                    <th scope="col" className="px-6 py-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                {
                  cartDetails?.products?.map((product)=><CartRow key={product?.product?.id} product={product} setCart={setCartDetails} setCounter={setCartCounter}/>)
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className='lg:w-80 shrink-0'>
          <div className='card p-6 lg:sticky lg:top-24'>
            <h2 className='font-display text-xl font-semibold text-forest-800 mb-4'>Order summary</h2>
            <div className='flex justify-between py-2 text-ink/60'>
              <span>Total items</span><span className='font-semibold text-ink'>{cartCounter}</span>
            </div>
            <div className='flex justify-between py-2 text-ink/60 border-b border-cream-200'>
              <span>Delivery</span><span className='font-semibold text-forest-600'>Free</span>
            </div>
            <div className='flex justify-between py-4 items-baseline'>
              <span className='font-semibold text-ink'>Total</span>
              <span className='font-display text-2xl font-semibold text-forest-700'>{cartDetails?.totalCartPrice} <span className='text-sm text-ink/40 font-sans'>EGP</span></span>
            </div>
            <Link to={`/checkout/${cartDetails?._id}`} className='block'>
              <button className='btn-primary w-full mb-3'>Proceed to checkout <i className='fas fa-arrow-right'></i></button>
            </Link>
            <button onClick={clearUserCart} className={`btn w-full bg-cream-100 text-clay-600 hover:bg-clay-50 ${btnLoading? 'cursor-default opacity-60':''}`}><i className='fas fa-trash-can'></i> Clear cart</button>
          </div>
        </aside>
      </div>
      }
    </div>
  </>
}
