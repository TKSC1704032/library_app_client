import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Preloader from '../components/Pre-loader/Preloader';
  const TeacherContext = React.createContext();
  
  export function useTeacher() {
    return useContext(TeacherContext);
  }
  
  export default function TeacherProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState();
   const [searchTerm,setSearchTerm]= useState('all');
    const [currentUser, setCurrentUser] = useState({});
    const [accessToken,setAccessToken]= useState('')
   
    useEffect(()=>{
      setLoading(true);
      axios.get('http://localhost:8080/api/result/get-teacher/', {credentials: 'include',withCredentials: true}).then((res)=>{
        setAuth(true);
        setLoading(false);

      }).catch((e)=>{
        setAuth(false);
        setLoading(false);

      })
    },[])


    async function teacherLogin( datas={}) {
      try{
        const response= await axios.post('http://localhost:8080/api/result/teacher-login/', datas, {credentials: 'include',withCredentials: true});
        if (response.status === 201) {
          
          setAuth(true);
          
        }
        return response.data;
      }
      catch(error){
        setAuth(false);
        return   error.response.data || error.message;
      }
    }

    // logout function
    async function teacherLogout( ) {
      try{
        const response= await axios.post('http://localhost:8080/api/result/teacherlogout/',{}, {credentials: 'include',withCredentials: true});
        if(response.status === 200){
         
          setAuth(false);

        }
      return response.data;
      }
      catch(error){
      console.log(error);
        return   error.response.data || error.message;
      }
    }

 
    

  


    const value = {
        
        auth,
        teacherLogout,
        teacherLogin,
        
      
    };
  
    return (
      <TeacherContext.Provider value={value}>
        {loading?<Preloader/>:(children)}
      </TeacherContext.Provider>
    );
  }
