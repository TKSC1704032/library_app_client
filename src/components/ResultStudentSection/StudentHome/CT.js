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

const CT = () => {
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
    axios.post("http://localhost:8080/api/result/get-ct-result/",{roll:currentUser.roll},
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
                 Roll: {findRes && findRes.roll}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                 Course Title: {findRes && findRes.courseTitle}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  CT1:{findRes && findRes.CT1}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                 CT2:{findRes && findRes.CT2}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  CT3:{findRes&& findRes.CT3}
                </Typography>
               
                <Typography gutterBottom variant="h5" component="h2">
                  CT4:{findRes&& findRes.CT4}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                Attendance:{findRes && findRes.attendance}
                </Typography>
                {/* <Typography gutterBottom variant="h5" component="h2">
                  Failed Subjects:{findRes && findRes.failedSubject}
                </Typography> */}
              </CardContent>
            </Card>
          </Grid>
           )
         })} 
        </Grid>
   
     
    
  );
};

export default CT;
