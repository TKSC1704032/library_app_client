import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import SearchIcon from '@mui/icons-material/Search';
import { AppBar, Box, Button, Container, Grid, List, Paper, Toolbar } from "@mui/material";
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

export default function StudentsInfo() {
  const [searchTerm,setSearchTerm]=useState('all');
  const [  load,setLoad  ]=useState(false);
  const [students,setStudents]=useState([]);
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
 useEffect(()=>{
  setLoad(true);
  axios.post('http://localhost:8080/api/admin/find-students/',{"searchTerm":searchTerm},
  {credentials: 'include',withCredentials: true}
  ).then((res)=>{
  setLoad(false);

  console.log(res.data.students)
  setStudents(res.data.students);
  }).catch(e=>{
    setLoad(false);
    setStudents([]);
  console.log(e);
  })
 },[searchTerm])


  return (
    <Grid container spacing={1} direction="row">
      <Grid item xs={0} md={2} />
      <Grid item xs={12} md={8} >
      
      <Paper sx={{ width: '100%', }} elevation={24}>
      <Box sx={{ p: 1, border: '1px dashed grey' }}>
      <AppBar position="static" sx={{padding:"10px"}} >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display:'flex',flexDirection:'row',justifyContent:'space-between', flexWrap: 'wrap'}}>
        <Typography variant="h4">Students Information</Typography>

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
            {load?<h2>Loading...</h2>:!load&&(students.length>0)?students.map((s,index)=>{
              
             return <>
               <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt={s.fname} src={s.avatar} />
            </ListItemAvatar>
            <ListItemText
              primary={`${s.fname} ${s.lname}`}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "block" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {`Roll: ${s.roll} , Dept: ${s.dept}, Series:${s.series}`}
                  </Typography>
                  {s.issuedBooks.filter((i)=>{
                   return i.request_accepted===true
                  }).map((i)=>{
                    return <h3>{`Book name:${i.bookName}, BookID:${i.book_recognized_id} , Expire time:${i.expiration_date} `}</h3>
                  })}
                  {s.issuedBooks.filter((i)=>{
                   return i.request_accepted===false
                  }).map((i)=>{
                    return <h3>{`Book name:${i.bookName}, BookID:${i.book_recognized_id} , request pending`}</h3>
                  })}

                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
              
              </>
            }):<h2>No students found</h2>}
            
          {/* <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Fayed" src="/static/images/avatar/2.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Fayed Al Mamun"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "block" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Roll: 1704032 , Dept: ETE, Series:17
                  </Typography>
                  <h3>Borrow Request:01 ,Borrowed Books:2 , Expire time:11/07/2022 </h3>
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Mehedi" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Mehedi Hasan"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "Block" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Roll: 1704032 , Dept: ETE, Series:17
                  </Typography>
                  <h3>Borrow Request:01 ,Borrowed Books:2 , Expire time:11/07/2022 </h3>

                </React.Fragment>
              }
            />
          </ListItem> */}
        </List>
        <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <Button endIcon={<HourglassBottomIcon/>}>load more</Button>
    </Box>
        </Paper>
      </Grid>
      <Grid item xs={0} md={2} />
    </Grid>
  );
}
