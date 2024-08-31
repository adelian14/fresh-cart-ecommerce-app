import React, { useEffect, useState } from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  useEffect(()=>{

  },[]);

  return <>
    <Navbar></Navbar>
    <div className="mx-auto lg:w-[95%] min-h-[85vh] my-6 py-6 pt-9">
      <Outlet></Outlet>
    </div>
    <Footer></Footer>
  </>
}
