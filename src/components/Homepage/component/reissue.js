import CloseIcon from '@mui/icons-material/Close';
import ForwardIcon from '@mui/icons-material/Forward';
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Box, Divider, Grid, IconButton, Paper } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import axios from 'axios';
import React, { useState } from "react";

import { useAuth } from '../../../contexts/authContext';

export default function Reissue() {
    const {currentUser}=useAuth();
    const issuedBooks= currentUser.issuedBooks;
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState({status:'',message:''});
    const reIssueBooks = issuedBooks.filter((book,index) => {return book.request_accepted===true});
    
  return (
    <Grid container spacing={1} direction="row">
      <Grid item xs={0} md={2} />
      <Grid item xs={12} md={8} >
      <Paper sx={{ width: '100%', }} elevation={24}>
      <Box sx={{ p: 2, border: '1px dashed grey' }}>
        <Typography variant="h4">Re-issue your books</Typography>
    </Box>
    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
    {reIssueBooks.length===0?<h2 style={{textAlign:"center"}}>No Book For Reissue</h2>:
       reIssueBooks.length&&reIssueBooks.map((book,index) => {
        return (
          <><ListItem
            key={book._id}
            
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <img style={{width:'40px',padding:'5px', marginRight:'30px' ,fontSize:'10px'}}
                  alt={book.bookName}
                  src={`https://drive.google.com/uc?export=view&id=${book.bookCoverId}`}
                />
              </ListItemAvatar>
              <ListItemText id={book._id} primary={book.bookName} secondary={`by ${book.bookAuthor}`}/>
              <LoadingButton
                 sx={{marginRight:"20px"}}
                  type="button"
                  variant='outlined' size="small" startIcon={<ForwardIcon/>}
                  loading={loading}
                  loadingPosition="end"
                  onClick={()=>{
                    setLoading(true);
                    
                    axios.post("http://localhost:8080/api/student/re-issue-book-request/",{
                      "requestID":book._id
                    },
  {credentials: 'include',withCredentials: true})
.then(function(res){
  
  setLoading(false);
    
    setInfo({status:res.data.status,message:res.data.message});
})
.catch(function(err){
  setInfo({status:err.response.data.status,message:err.response.data.message});
 
  setLoading(false);
 })
                  }}
                >
                  Send Re-sissue Request
                </LoadingButton>
             
             
             
            </ListItemButton>
          </ListItem>
          <Divider/>
          </>
        );
      })}
    </List>
        <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <br/>
    </Box>
        </Paper>
      </Grid>
      <Grid item xs={0} md={2} />
      {info.status!==''? (<Box sx={{ width: '60%',position:'fixed',left:'20px',bottom:'10px'}}>

<Alert

severity={info.status==='failed'?"error":"success"}
  action={
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={() => {
        setInfo({status:'',message:''});
      }}
    >
      <CloseIcon fontSize="inherit" />
    </IconButton>
  }
  sx={{ mb: 2 }}
> <AlertTitle>Reissue request send {info.status}</AlertTitle>

  {info.message}
</Alert>

</Box>):<></>}
    </Grid>
  )
}
