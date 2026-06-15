import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import Style from './Navbar.module.css'
import Logo from '../../assets/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext';
import { userTokenKey } from '../../constansts';
import { CartCounterContext } from '../../Context/CartCounterContext';
import toast from 'react-hot-toast';
export default function Navbar() {
  useEffect(() => {

  }, []);

  let [navShown, setNavShown] = useState(false);
  let {userLogin, setUserLogin} = useContext(UserContext);
  let {cartCounter} = useContext(CartCounterContext);

  function toggleNav() {
    setNavShown(!navShown);
  }

  function handleLogout(){
    localStorage.removeItem(userTokenKey);
    setUserLogin(null);
    toast.success('See you soon');
  }

  return <nav className='bg-cream-50/85 backdrop-blur-md border-b border-cream-200 fixed top-0 left-0 right-0 py-3 lg:py-2 z-50'>
    <div className='relative'>
      <span className='absolute right-6 top-0 lg:hidden cursor-pointer w-10 h-10 flex items-center justify-center rounded-full text-forest-700 hover:bg-forest-50 transition-colors' onClick={toggleNav}><i className={`fas ${navShown ? 'fa-close' : 'fa-bars'}`}></i></span>
      <div className={`container mx-auto py-1 lg:flex justify-between lg:flex-row flex-col items-center`}>
        <div className='flex lg:flex-row flex-col lg:items-center'>
          <Link to='' className='flex items-center gap-2 mx-4 group'>
            <span className='w-9 h-9 rounded-full bg-forest-600 text-cream-50 flex items-center justify-center shadow-soft group-hover:bg-forest-700 transition-colors'><i className='fas fa-leaf text-sm'></i></span>
            <span className='font-display text-2xl font-semibold text-forest-800 leading-none'>Fresh<span className='text-clay-500'>Cart</span></span>
          </Link>
          <ul className={`lg:flex lg:flex-row flex-col lg:px-5 lg:pt-0 pt-3 lg:items-center ${navShown ? 'flex' : 'hidden'}`}>
            <li className='mx-1 my-0.5'><NavLink to='' className='block px-3 py-2 rounded-full text-[15px] text-ink/70 font-semibold hover:bg-forest-50 hover:text-forest-700 transition-all'>Home</NavLink></li>
            <li className='mx-1 my-0.5'><NavLink to='products' className='block px-3 py-2 rounded-full text-[15px] text-ink/70 font-semibold hover:bg-forest-50 hover:text-forest-700 transition-all'>Products</NavLink></li>
            <li className='mx-1 my-0.5'><NavLink to='categories' className='block px-3 py-2 rounded-full text-[15px] text-ink/70 font-semibold hover:bg-forest-50 hover:text-forest-700 transition-all'>Categories</NavLink></li>
            <li className='mx-1 my-0.5'><NavLink to='brands' className='block px-3 py-2 rounded-full text-[15px] text-ink/70 font-semibold hover:bg-forest-50 hover:text-forest-700 transition-all'>Brands</NavLink></li>
            {userLogin!==null && <li className='mx-1 my-0.5 relative'>
              <NavLink to='cart' className='block px-3 py-2 rounded-full text-[15px] text-ink/70 font-semibold hover:bg-forest-50 hover:text-forest-700 transition-all'>Cart <i className='fas fa-basket-shopping'></i></NavLink>
              {cartCounter > 0 && <div className=' absolute top-0 right-1 bg-clay-500 ring-2 ring-cream-50 rounded-full text-white size-5 flex justify-center items-center text-xs font-bold shadow'>
                {cartCounter}
              </div>}
            </li>}
          </ul>
        </div>
        <div className={`h-px bg-cream-200 w-full lg:hidden my-1 ${navShown ? 'flex' : 'hidden'}`}></div>
        <div>
          <ul className={`lg:flex lg:flex-row flex-col lg:px-5 lg:items-center ${navShown ? 'flex' : 'hidden'}`}>
            {userLogin===null
            ?<>
              <li className='mx-1 my-0.5'><Link to='login' className='block px-3 py-2 rounded-full text-[15px] text-ink/70 font-semibold hover:bg-forest-50 hover:text-forest-700 transition-all'>Login</Link></li>
              <li className='mx-1 my-0.5'><Link to='register' className='btn-primary text-[15px] py-2 w-full lg:w-auto'>Join us</Link></li>
            </>
            :<li className='mx-1 my-0.5'><Link to='login' onClick={handleLogout} className='block px-3 py-2 rounded-full text-[15px] text-ink/70 font-semibold hover:bg-clay-50 hover:text-clay-600 transition-all'>Logout</Link></li>}
            <li className='flex items-center gap-1 py-2 lg:ml-3 lg:pl-3 lg:border-l lg:border-cream-200'>
              <i className='fab mx-1.5 fa-facebook text-ink/35 hover:text-forest-600 cursor-pointer transition-colors'></i>
              <i className='fab mx-1.5 fa-instagram text-ink/35 hover:text-forest-600 cursor-pointer transition-colors'></i>
              <i className='fab mx-1.5 fa-youtube text-ink/35 hover:text-forest-600 cursor-pointer transition-colors'></i>
              <i className='fab mx-1.5 fa-tiktok text-ink/35 hover:text-forest-600 cursor-pointer transition-colors'></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
}
