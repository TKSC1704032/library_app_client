import {
    Card,
    CardContent,
    Grid, makeStyles, Typography
} from "@material-ui/core";
import axios from "axios";
import "firebase/compat/auth";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import bg from "../../Images/1stb.jfif";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: "100%",
    margin: "auto",
    background: "transparent",
    boxShadow: "5px 25px 25px ",
    padding: "10px",
  },
  circle: {
    height: "100vh",

    backgroundImage: `url(${bg})`,
  },
}));

const Semester = () => {
    const [result,setResult]=useState([])
    const [resultLoad,setResultLoad]=useState()
    const [resultMessage,SetResultMessage]=useState();
    const {currentUser}=useAuth();

  const classes = useStyles();
  const semester = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const [findResult, setFindResult] = useState([]);

  const [series, setSeries] = useState({});
  const handleBlur = (event) => {
    const newUserInfo = { ...series };
    newUserInfo[event.target.name] =
      event.target.name === "sem"
        ? semester[event.target.value]
        : event.target.value;
    setSeries(newUserInfo);
  };
  useEffect(()=>{
    axios.post("https://ruetonlineservice.onrender.com/api/result/get-result/",{roll:currentUser.roll},
    {credentials: 'include',withCredentials: true})
  .then(function(res){
    
    console.log(res.data.results)
    setResultLoad(false);
    if(res.data){
      setResult(res.data.results);
     
    }
  })
  .catch(function(err){ 
    setResultLoad(false);
    setResult({});
  
    SetResultMessage("failed")
  
    console.log(err) })
   },[])
  return (
    <Grid container spacing={0} className={classes.circle} direction="row">
      

         {result.map((findRes,index)=>{
           return(
            <Grid item xs={12} sm={6}>
            <Card className={classes.card}>
              <CardContent>
                {/* <Typography gutterBottom variant="h5" component="h2">
                  {findRes[0] && findRes[0].name}
                </Typography> */}
                <Typography gutterBottom variant="h5" component="h2">
                  {findRes && findRes.roll}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  GP:{findRes && findRes.gp}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  Semester Earn Credit:{findRes && findRes.semesterEarnCredit}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  GPA:{findRes&& findRes.gpa}
                </Typography>
               
                <Typography gutterBottom variant="h5" component="h2">
                  Total Earn Credit:{findRes&& findRes.totalEarnCredit}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  CGPA:{findRes && findRes.cgpa}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  Failed Subjects:{findRes && findRes.failedSubject}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
           )
         })} 
        </Grid>
   
     
    
  );
};

export default Semester;
