import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useTeacher } from '../contexts/teacherContext';
export default function TeacherPrivateRouter() {
  const {auth}=useTeacher();
   
  return(
    <>
      {auth? (<Outlet/>):(<Navigate to='/seba-login/'/>)}
      
    </>
  )
}