import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Preloader from "../components/Pre-loader/Preloader";
  const AuthContext = React.createContext();
  
  export function useAuth() {
    return useContext(AuthContext);
  }
  
  export default function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
   
    const [auth, setAuth] = useState();
   const [searchTerm,setSearchTerm]= useState('all');
    const [currentUser, setCurrentUser] = useState({});
    const [accessToken,setAccessToken]= useState('')
    axios.defaults.baseURL = 'https://ruetonlineservice.onrender.com/api/student/';
   
   
     const checkUser=()=>{
      const userID= JSON.parse(window.localStorage.getItem('userID'));
      console.log(userID);

      if(userID!==null){
        axios.get(`getuser/${userID}`).then((res) => {
          setCurrentUser({...res.data.user});
          setAuth(true);
          setLoading(false)

        }).catch((e)=>{
          setCurrentUser({});
          setAuth(false);
          setLoading(false)

        })

      }
      else{
        setAuth(false);
        setLoading(false)

      }
     }
    useEffect(() => {
      // isAuth().then(res => {
      //   // console.log(res);
      //   console.log(currentUser);
      //   setLoading(false);
      //   setAuth(res);
      // })
      checkUser()
    },[auth,accessToken]) 
    
    


 
    const isAuth = () => {
      if (window === undefined) {
      
        return Promise.resolve(false);
      } else {
          return new Promise(resolve => {
            axios.post('refresh-token', {}, {credentials: 'include', withCredentials: true}).then((res) => {
              setAccessToken(`Bearer ${res.data['AccessToken']}`);
              axios.defaults.headers.common['Authorization'] = `Bearer ${res.data['AccessToken']}`;
              setAccessToken(`Bearer ${res.data['AccessToken']}`);
             
              if(res.status===200 && res.data.AccessToken){ 

              axios.get('getuser').then((res) => {
                setCurrentUser({...res.data.user});
                setAuth(true)
                resolve(true);
              }).catch(error=>{
                setAccessToken('');
                setAuth(false)
                setCurrentUser({});
              axios.defaults.headers.common['Authorization'] = '';
                resolve(false)})
              
             }
            }).catch(error=>{
              setAccessToken('');
              setCurrentUser({});
              setAuth(false)
              axios.defaults.headers.common['Authorization'] = '';
              resolve(false);

            })  
        } )
    }
  }
    






    async function signup( datas={}) {
      try{
        
        const {data}= await axios.post('register', datas, {credentials: 'include',withCredentials: true});
      
      return data;
      }
      catch(error){

        return   error.response.data || error.message;
      }
    }

    async function registerVerify( datas={}) {
      try{
        const response= await axios.post('register/verify', datas, {credentials: 'include',withCredentials: true});
        if (response.status === 201) {
          setAccessToken(`Bearer ${response.data['AccessToken']}`);
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['AccessToken']}`;
        setAuth(true);
        window.localStorage.setItem('userID', JSON.stringify(response.data.userID));

      }
      return response.data;
      }
      catch(error){

        return   error.response.data || error.message;
      }
    }
  
    // login function
    async function login( datas={}) {
      try{
        const response= await axios.post('login', datas, {credentials: 'include',withCredentials: true});
        if (response.status === 201) {
          setAccessToken(`Bearer ${response.data['AccessToken']}`);
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['AccessToken']}`;
          setAuth(true);
          window.localStorage.setItem('userID', JSON.stringify(response.data.userID));
        }
        return response.data;
      }
      catch(error){

        return   error.response.data || error.message;
      }
    }

    // logout function
    async function logout( ) {
      // try{
      //   const response= await axios.post('logout',{}, {credentials: 'include',withCredentials: true});
      //   if(response.status === 200){
      //     setAccessToken('');
      //     setCurrentUser({});
      //     axios.defaults.headers.common['Authorization'] = '';
      //     setAuth(false);

      //   }
      //   console.log(currentUser);
      // return response.data;
      // }
      // catch(error){
      // console.log(error);
      //   return   error.response.data || error.message;
      // }
    
      window.localStorage.removeItem('userID');
      setAuth(false);
    
    }

    async function sendUserPasswordResetEmail( datas={}) {
      try{
        const {data}= await axios.post('send-reset-password-email',datas, {credentials: 'include',withCredentials: true});
        
        console.log(data);
      return data;
      }
      catch(error){
      console.log(error);
        return   error.response.data || error.message;
      }
    }
    async function userPasswordReset( id,token,datas={}) {
      try{
        const res= await axios.post(`/reset-password/${id}/${token}/`,datas, {credentials: 'include',withCredentials: true});
        
      return res.data;
      }
      catch(error){
      
        return   error.response.data || error.message;
      }
    }


    


    const value = {
      // getUser,
      auth,
      isAuth,
      signup,
      registerVerify,
      login,
      logout,
      sendUserPasswordResetEmail,
      userPasswordReset,
      currentUser,setCurrentUser,
      searchTerm,setSearchTerm,checkUser
    };
  
    return (
      <AuthContext.Provider value={value}>
        {loading?(<Preloader/>):(children)}
      </AuthContext.Provider>
    );
  }
