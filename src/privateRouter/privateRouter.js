import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
export default function PrivateRouter() {
  const [isAuthTrue, setIsAuthTrue] = useState();
  const {auth}=useAuth();
   
  return(
    <>
      {auth? (<Outlet/>):(<Navigate to='/seba-login'/>)}
      
    </>
  )
}
