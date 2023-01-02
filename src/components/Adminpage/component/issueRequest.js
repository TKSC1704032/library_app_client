import BeenhereIcon from '@mui/icons-material/Beenhere';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, Box, Divider, Grid, IconButton, Paper } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Typography from "@mui/material/Typography";
import axios from 'axios';
import React, { useEffect, useState } from "react";
export default function IssueRequest() {
    const [issueReq, setIssueReq] = useState([]);
 const [load,setLoad]=useState(true); 
 const [loading, setLoading] = useState(false);
 const [info, setInfo] = useState({status:'',message:''});
 const getIssueRequest=()=>{
  axios.get("http://localhost:8080/api/admin/find-all-issue-request/",
  {credentials: 'include',withCredentials: true})
.then((res)=>{
  
  setLoad(false);
  setIssueReq(res.data.issueReq);
   
})
.catch((err)=>{ 
  setIssueReq([]);

  setLoad(false);
   })
 }
 useEffect(()=>{
  getIssueRequest();
 },[])
  return (
    <Grid container spacing={1} direction="row">
      <Grid item xs={0} md={2} />
      <Grid item xs={12} md={8} >
      <Paper sx={{ width: '100%', }} elevation={24}>
      <Box sx={{ p: 2, border: '1px dashed grey' }}>
        <Typography variant="h4">Issue Requests for Books</Typography>
    </Box>
    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
      
      {load?<h1>Loading...</h1>:(issueReq.length===0)?<h2 style={{textAlign:"center"}}>No Issue Request</h2>:
       issueReq.length&&issueReq.map((i,index) => {
        const labelId = `checkbox-list-secondary-label-${index}`;
        return (
          <><ListItem
            key={labelId}
          >
              <ListItemAvatar>
                <img
                  alt={`${i.bookName}`}
                  src={`https://drive.google.com/uc?export=view&id=${i.bookCoverId}`}
                 style={{width:'70px',marginRight:'15px'}}/>
              </ListItemAvatar>
              <ListItemText id={labelId}>
              
              <h3>Requested by: </h3>
              <h3>{`Name: ${i.userID.fname} ${i.userID.lname} 
              Roll: ${i.userID.roll} Dept:${i.userID.dept} Current Issued Books:${i.userID.issuedBooks.length}`}</h3>
              <p>{`Request Book: ${i.bookName} by ${i.bookAuthor}`}</p>
              <p>{`BookID: ${i.book_recognized_id}`}</p>


              <LoadingButton
                 sx={{marginRight:"20px"}}
                  type="button"
                  size="small"
                  startIcon={<BeenhereIcon/>}
                  loading={loading}
                  loadingPosition="end"
                  color='success'variant="outlined"
                  onClick={()=>{
                    setLoading(true);
                    
                    axios.post("http://localhost:8080/api/admin/response-issue-request/",{
                      "requestID":i._id,
                      "accept":true
                    },
  {credentials: 'include',withCredentials: true})
.then(function(res){
  
  setLoading(false);

    
    setInfo({status:res.data.status,message:res.data.message});
    getIssueRequest();

})
.catch(function(err){
  setInfo({status:err.response.data.status,message:err.response.data.message});
 
  setLoading(false);



  console.log(err) })
                  }}
                >
                  Accept
                </LoadingButton>
                <LoadingButton
                 sx={{marginRight:"20px"}}
                  type="button"
                  size="small"
                  variant="outlined" startIcon={<ClearIcon/>}
                  loading={loading}
                  loadingPosition="end"
                  color='error'
                  onClick={()=>{
                    setLoading(true);
                    
                    axios.post("http://localhost:8080/api/admin/response-issue-request/",{
                      "requestID":i._id,
                      "accept":false
                    },
  {credentials: 'include',withCredentials: true})
.then(function(res){
  
  setLoading(false);
    
    setInfo({status:res.data.status,message:res.data.message});
    getIssueRequest();
})
.catch(function(err){
  setInfo({status:err.response.data.status,message:err.response.data.message});
 
  setLoading(false);
 })
                  }}
                >
                  Reject
                </LoadingButton>
              </ListItemText>
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
> <AlertTitle>Response {info.status}</AlertTitle>

  {info.message}
</Alert>

</Box>):<></>}
    </Grid>
  )
}
