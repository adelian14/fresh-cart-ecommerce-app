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
    <main className="min-h-screen">
      <div className="mx-auto lg:w-[95%] min-h-[85vh] py-6 pt-24">
        <Outlet></Outlet>
      </div>
    </main>
    <Footer></Footer>
  </>
}
