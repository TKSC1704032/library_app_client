import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../contexts/adminContext';
export default function AdminPrivateRouter() {
  const {auth}=useAdmin();
   
  return(
    <>
      {auth? (<Outlet/>):(<Navigate to='/seba-login/'/>)}
      
    </>
  )
}