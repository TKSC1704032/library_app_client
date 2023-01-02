import BeenhereIcon from '@mui/icons-material/Beenhere';
import CloseIcon from '@mui/icons-material/Close';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import SearchIcon from '@mui/icons-material/Search';
import { LoadingButton } from '@mui/lab';
import { Alert, AlertTitle, AppBar, Box, Button, Container, Grid, IconButton, List, Paper, TextField, Toolbar } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import InputBase from '@mui/material/InputBase';
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import { alpha, styled } from '@mui/material/styles';
import Typography from "@mui/material/Typography";
import axios from 'axios';
import React, { useEffect, useState } from "react";

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'secondary',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      }
    },
  },
}));

export default function ReturnBook() {
    const [loading, setLoading] = useState(false);
 const [info, setInfo] = useState({status:'',message:''});
  const [searchTerm,setSearchTerm]=useState('all');
  const [  load,setLoad  ]=useState(false);
  const [issuedBooks,setIssuedBooks]=useState([]);
  const [fine,setFine]= useState({});
  const handleSearch = (e) => {
    
    let tempSearchTerm = e.target.value.trim();
    if((tempSearchTerm.replace(/[^\w\s]/gi,"")).length === 0){
      setSearchTerm("all");
    } else {
      setSearchTerm(e.target.value.trim());
      setLoad(true);
    }
    console.log(e.target.value.trim());
  }; 

  const getIssueRequest= ()=>{
    setLoad(true);
    axios.post('https://ruetonlineservice.onrender.com/api/admin/findAllIssueRequestbySearch/',{"searchTerm":searchTerm},
    {credentials: 'include',withCredentials: true}
    ).then((res)=>{
    setLoad(false);
  
    setIssuedBooks(res.data.issuedBooks);
    }).catch(e=>{
      setLoad(false);
      setIssuedBooks([]);
    console.log(e);
    })
  }
 useEffect(()=>{
    getIssueRequest()
 },[searchTerm])
 const isNumber = function isNumber(value) 
 {
    return typeof value === 'number' && isFinite(value);
 }

  return (
    <Grid container spacing={1} direction="row">
      <Grid item xs={0} md={2} />
      <Grid item xs={12} md={8} >
      
      <Paper sx={{ width: '100%', }} elevation={24}>
      <Box sx={{ p: 1, border: '1px dashed grey' }}>
      <AppBar position="static" sx={{padding:"10px"}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:'flex',flexDirection:'row',justifyContent:'space-between', flexWrap: 'wrap'}}>
        <Typography variant="h4">Issued Books</Typography>

<Search>
      <SearchIconWrapper >
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search by roll…"
        inputProps={{ 'aria-label': 'search' } }  type="search" sx={{fontSize:'14px'}} onChange={handleSearch}
      />
    </Search>
          </Toolbar>
       </Container>
        
      
        </AppBar>
        

      
  
     
    


    </Box>
      
        <List
          sx={{ width: "100%", bgcolor: "background.paper" }}
        >
            {load?<h2>Loading...</h2>:!load&&(issuedBooks.length>0)?issuedBooks.map((s,index)=>{
              
             return <>
               <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={s.userID.fname} src={s.userID.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={`${s.userID.fname} ${s.userID.lname}`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "block" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`Roll: ${s.userID.roll} , Dept: ${s.userID.dept}, Series:${s.userID.series}`}
                  </Typography>
                  <h3>{`Book name:${s.bookName}, BookID:${s.book_recognized_id} , Expiration Date:${s.expiration_date}`}</h3>
                   <div>
                   <TextField
                  id={s._id}
                  name={s._id}
                  label="Fine:"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={fine[s._id]}
                  required
                  onChange={
                    (e)=>{
                        setFine((prev)=>{
                            return { ...prev,[e.target.name]:e.target.value}
                        })}}
                />
                <br/>

                <LoadingButton
                 sx={{marginRight:"20px"}}
                  type="button"
                  size="small"
                  startIcon={<BeenhereIcon/>}
                  loading={loading}
                  loadingPosition="end"
                  color='success'variant="outlined"
                  onClick={()=>{

                    if(!isNumber(parseInt(fine[s._id]))){
                        setInfo({status:"failed",message:"please enter number type"});

                    }
                    else{
                    setLoading(true);
                    
                    axios.post("https://ruetonlineservice.onrender.com/api/admin/return-book/",{
                      "requestID":s._id,
                      "fine":fine[s._id]
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
                  }}}
                >
                  Returned
                </LoadingButton>

                   </div>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
              
              </>
            }):<h2>No Issued Books found</h2>}
            
          
        </List>
        <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <Button endIcon={<HourglassBottomIcon/>}>load more</Button>
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
> <AlertTitle>Returned {info.status}</AlertTitle>

  {info.message}
</Alert>

</Box>):<></>}
    </Grid>
  );
}
