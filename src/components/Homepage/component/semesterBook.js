import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import Bookcard from "./bookcard";

export default function SemesterBook() {
const {currentUser} =useAuth();
let { sem } = useParams();
  
 const [books, setBooks] = useState([]);
 const [bookLoad,setBookLoad]=useState(true);
 const [bookMessage,setBookMessage]=useState('');
 useEffect(()=>{
  axios.get(`http://localhost:8080/api/student/find-sem-books/${currentUser.dept}/${sem}/`,
  {credentials: 'include',withCredentials: true})
.then(function(res){
  
  console.log(res.data.books)
  setBookLoad(false);
  if(res.data){
    setBooks(res.data.books);
    setBookMessage("success")
    console.log(books);
  }
})
.catch(function(err){ 
  setBookLoad(false);
  setBooks([]);

  setBookMessage("failed")

  console.log(err) })
 },[sem])
  return (
    <Grid container direction='column' sx={{marginTop:'10px',paddingBottom:'50px',paddingTop:'40px',backgroundColor:'white'}}>
     <Grid item container xs={12} md={12}  direction="row" >
      <Grid item xs={0} md={1} />
      <Grid item xs={12} md={10} ><Typography sx={{paddingLeft:'50px'}} variant='h6'>{`Department of ${currentUser.dept} semester ${sem} books`}</Typography></Grid>
      <Grid item xs={0} md={1} />
      </Grid>
      <Grid item container xs={12} md={12} direction="row" >
      <Grid item xs={0} md={1} />
      <Grid item container spacing={1} xs={12} md={10} direction="row" justifyContent='center' sx={{ margin:0, flexWrap:'wrap'}} >
      {bookLoad&&<h2>loading....</h2>}
      {((bookMessage==="failed")&&!bookLoad)?<p>No Books found</p>:
      
       books.length &&books.map((book,index)=>{
        
       return <Grid item key={book._id}><Link to={`/book-details/${book._id}`} state={book}><Bookcard book={book}/> </Link></Grid>
       })}
        
      </Grid>
      <Grid item xs={0} md={1} />
      </Grid>
      
    </Grid>
  );
}
