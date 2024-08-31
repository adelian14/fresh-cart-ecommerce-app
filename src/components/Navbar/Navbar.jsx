import React, { useContext, useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import Style from './Navbar.module.css'
import Logo from '../../assets/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext';
import { userTokenKey } from '../../constansts';
import { CartCounterContext } from '../../Context/CartCounterContext';

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
  }

  return <nav className='bg-gray-200 fixed top-0 left-0 right-0 py-4 lg:py-2 z-50'>
    <div className='relative'>
      <span className='absolute right-8 top-[2px] lg:hidden cursor-pointer' onClick={toggleNav}><i className={`fas ${navShown ? 'fa-close' : 'fa-bars'}`}></i></span>
      <div className={`container mx-auto py-1 lg:flex justify-between lg:flex-row flex-col items-center`}>
        <div className='flex lg:flex-row flex-col lg:items-center'>
          <img width={110} className='mx-4' src={Logo} alt="fresh cart logo" />
          <ul className={`lg:flex lg:flex-row flex-col lg:px-5 lg:pt-0 pt-3 lg:items-center ${navShown ? 'flex' : 'hidden'}`}>
            <li className='mx-2 py-2 text-lg text-slate-900 font-light'><NavLink to=''>Home</NavLink></li>
            <li className='mx-2 py-2 text-lg text-slate-900 font-light'><NavLink to='products'>Products</NavLink></li>
            <li className='mx-2 py-2 text-lg text-slate-900 font-light'><NavLink to='categories'>Categories</NavLink></li>
            <li className='mx-2 py-2 text-lg text-slate-900 font-light'><NavLink to='brands'>Brands</NavLink></li>
            {userLogin!==null && <li className='mx-2 py-2 text-lg text-slate-900 font-light relative'>
              <NavLink to='cart'>Cart <i className='fas fa-shopping-cart'></i></NavLink>
              {cartCounter > 0 && <div className=' absolute top-0 right-3 bg-red-500 rounded-full text-white size-4 flex justify-center items-center text-xs'>
                {cartCounter}
              </div>}
            </li>}
          </ul>
        </div>
        <div className={`h-[2px] bg-black bg-opacity-25 w-full lg:hidden ${navShown ? 'flex' : 'hidden'}`}></div>
        <div>
          <ul className={`lg:flex lg:flex-row flex-col lg:px-5 lg:items-center ${navShown ? 'flex' : 'hidden'}`}>
            {userLogin===null
            ?<>
              <li className='mx-2 py-2 text-lg text-slate-900 font-light'><Link to='login'>Login</Link></li>
              <li className='mx-2 py-2 text-lg text-slate-900 font-light'><Link to='register'>Register</Link></li>
            </>
            :<li className='mx-2 py-2 text-lg text-slate-900 font-light'><Link to='login' onClick={handleLogout}>Logout</Link></li>}
            <li className='flex items-center gap-1 py-2'>
              <i className='fab mx-2  fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
}
