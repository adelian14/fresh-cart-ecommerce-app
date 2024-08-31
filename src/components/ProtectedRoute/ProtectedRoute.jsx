import React, { useEffect, useState } from 'react'
import Style from './ProtectedRoute.module.css'
import { userTokenKey } from '../../constansts';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  useEffect(()=>{

  },[]);

  if(localStorage.getItem(userTokenKey)!==null){
    return children;
  }
  else{
    return <Navigate to={'/'}/>
  }
}
