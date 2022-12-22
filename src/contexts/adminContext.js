import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Preloader from '../components/Pre-loader/Preloader';
  const AdminContext = React.createContext();
  
  export function useAdmin() {
    return useContext(AdminContext);
  }
  
  export default function AdminProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState();
   const [searchTerm,setSearchTerm]= useState('all');
    const [currentUser, setCurrentUser] = useState({});
    const [accessToken,setAccessToken]= useState('')
   
    useEffect(()=>{
      setLoading(true);
      axios.get('https://ruetonlineservice.onrender.com/api/admin/getAdmin/', {credentials: 'include',withCredentials: true}).then((res)=>{
        setAuth(true);
        setLoading(false);

      }).catch((e)=>{
        setAuth(false);
        setLoading(false);

      })
    },[])


    async function adminLogin( datas={}) {
      try{
        const response= await axios.post('https://ruetonlineservice.onrender.com/api/admin/login-admin/', datas, {credentials: 'include',withCredentials: true});
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
    async function adminLogout( ) {
      try{
        const response= await axios.post('https://ruetonlineservice.onrender.com/api/admin/adminLogout',{}, {credentials: 'include',withCredentials: true});
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

 
    

   const uploadBook= async ( datas={}) =>{
    let formData = new FormData();
    for (const property in datas) {
        formData.append(property,datas[property]);
        console.log(`${property}: ${datas[property]}`);
      }
        try{
            const config = {
                method: 'post',
                url: 'https://ruetonlineservice.onrender.com/api/admin/upload-book/',
                headers: { "Content-type": "multipart/form-data" },
                data:formData

            }
          const response= await axios(config);
          
          
        return response.data;
        }
        catch(error){
  
          return   error.response.data || error.message;
        }
      }


    const value = {
        uploadBook,
        auth,
        adminLogout,
        adminLogin,
        searchTerm,
        setSearchTerm
      
    };
  
    return (
      <AdminContext.Provider value={value}>
        {loading?<Preloader/>:(children)}
      </AdminContext.Provider>
    );
  }
