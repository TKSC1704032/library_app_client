import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Button, Divider, IconButton } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Grid from "@mui/material/Grid";
import axios from 'axios';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
export default function BookDetails() {
  const {currentUser}=useAuth();
    const navigate=useNavigate();
    const location = useLocation();
     const book = location.state;
     const [loading, setLoading] = React.useState(false);
     const [info, setInfo] = React.useState({status:'',message:''});

  return (
    <Grid container direction='column' sx={{marginTop:'20px', paddingBottom:'50px',paddingTop:'40px',backgroundColor:'white'}}>
     <Grid item container xs={12} md={12}  direction="row" >
      <Grid item xs={0} md={1} />
      <Grid item xs={12} md={10} >
     <Button startIcon={<ArrowBackIcon/>} onClick={()=>{
        navigate('/')
     }}>Go Back</Button>
     </Grid>
      <Grid item xs={0} md={1} />
      </Grid>
      <Grid item container xs={12} md={12} direction="row" >
      <Grid item xs={0} md={1} />
      <Grid item container spacing={1} xs={12} md={10} direction="row" justifyContent='center' sx={{ margin:0, flexWrap:'wrap'}} >
       <Grid item xs={12} md={4}>
        <img style={{width:'100%'}} src={`https://drive.google.com/uc?export=view&id=${book.cover_image_id}`} alt={`${book.name}`}/>
       </Grid>
       <Grid item xs={12} md={6}>
        <p style={{fontSize:'20px'}}>{book.name}</p>
        
        <p style={{fontSize:'15px',fontWeight:700}}>by {book.author}</p>
        <p style={{fontSize:'10px'}}> <span style={{fontWeight:800}}>Edition:</span>{book.edition}</p>
       <br/>
       <p style={{fontSize:'14px'}}> <span style={{fontWeight:800}}>Avaiable copies:</span>{book.number_of_books_available}</p>
        <Divider/>
        <br/>
        <p style={{fontSize:'12px'}}><span style={{fontWeight:800}}>Description:</span> 
        A fast-paced guide to designing and building scalable and maintainable web apps with React.jsAbout This Book• Build maintainable and performant user interfaces for your web applications using React.js• Create reusable React.js components to save time and effort in maintaining your user interfaces• Learn how to build a ready-to-deploy React.js web application, following our step-by-step tutorialWho This Book Is ForIf you're a front-end developer with knowledge of jQuery and its libraries, along with frameworks, such as Angular.JS and Backbone.JS, or native JavaScript development, and you wish to use the fastest web user interface library there is, then this book is ideal for you.What You Will Learn• Install powerful React.js tools to make development much more efficient• Create React elements with properties and children• Get started with stateless and stateful React components• Use JSX to speed up your React.js development process• Add reactivity to your React components with lifecycle methods• Integrate your React components with other JavaScript libraries• Utilize the Flux application architecture with your React components• Test your React components with Jest test frameworkIn DetailBuilding web applications with maintainable and performant user interfaces is a challenge that many have faced for more than a decade, but no one has risen to this challenge quite like React.js. Today React.js is used by Facebook, Instagram, Khan Academy, and Imperial College London, to name a few. Many new users recognize the benefits of React.js and adopt it in their own projects, forming a fast-growing community. The speed at which React.js has evolved promises a bright future for those who invest in learning it today.React.js Essentials will take you on a fast-paced journey through building your own maintainable React.js application. Begin by exploring how you can create single and multiple user interface elements. Create stateless and stateful components and make them reactive, learn to interact between your components and lifecycle methods and gauge how to effectively integrate your user interface components with other JavaScript libraries. Delve deep into the core elements of the Flux architecture and learn how to manage your application using stores. Finish by going that extra mile with the Jest test framework, running multiple tests on your application and find solutions to scale it further without complexity.Style and approachThe book adopts a step-by-step, hands-on approach with ample codes to ensure you learn React.js at a fast pace.
        
        </p>
        <Divider/>
        <br/>
       <div>
       <LoadingButton
                 sx={{marginRight:"20px"}}
                  type="button"
                  size="small"
                  endIcon={<CallMadeIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  color='success'
                  onClick={()=>{
                    setLoading(true);
                    console.log(book._id, currentUser._id);
                    
                    axios.post("https://ruetonlineservice.onrender.com/api/student/issue-book-request/",{
                      "bookID":book._id,
                      "userID":currentUser._id
                    },
  {credentials: 'include',withCredentials: true})
.then(function(res){
  
  console.log(res.data.status==='success')
  setLoading(false);

    
    setInfo({status:res.data.status,message:res.data.message});
})
.catch(function(err){
  setInfo({status:err.response.data.status,message:err.response.data.message});
 
  setLoading(false);



  console.log(err) })
                  }}
                >
                  Request
                </LoadingButton>
        <a href={`https://drive.google.com/uc?export=download&id=${book.pdf_id}`}><Button size="small" variant="contained" color='error' endIcon={<DownloadIcon />}>PDF</Button></a>
       </div>
       <br/><br/><br/>
       </Grid>
      </Grid>
      <Grid item xs={0} md={1} />
      </Grid>
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
> <AlertTitle>Issue Request {info.status}</AlertTitle>

  {info.message}
</Alert>

</Box>):<></>}
    </Grid>
  )
}
