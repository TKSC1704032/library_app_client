import {
  Card,
  CardContent,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import axios from "axios";
import "firebase/compat/auth";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/authContext";
import bg from "../../Images/1stb.jfif";
import res from '../../Images/resd.jpg';
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
    const [result,setResult]=useState({})
    const [resultLoad,setResultLoad]=useState()
    const [resultMessage,SetResultMessage]=useState();
    const {currentUser}=useAuth();

  const findRes = [];
  const classes = useStyles();
  const semester = ["1", "2", "3", "4", "5", "6", "7", "8"];
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
    axios.post("https://ruetonlineservice.onrender.com/api/result/get-result/",{semester:series.sem,roll:currentUser.roll},
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
      <Grid item xs={0} sm={2} />
      <Grid item container xs={12} sm={8} spacing={0} direction="row">
        <Grid item xs={12} sm={12}>
          <Card className={classes.card}>
            <InputLabel id="semLebel">{!series.sem && "Semester"}</InputLabel>
            <Select
              labelId="semLevel"
              id="sem"
              name="sem"
              fullWidth
              value={series.sem}
              onChange={handleBlur}
              autoWidth
              label="Sem"
              style={{ textAlign: "center" }}
            >
              {semester.map((val, ind) => {
                return (
                  <MenuItem style={{ width: "75px" }} value={ind}>
                    {val}
                  </MenuItem>
                );
              })}
            </Select>
            <button
              style={{
                marginTop: "5px",
                backgroundColor: "goldenrod",
                border: "none",
                borderRadius: "10px",
                width: "100%",
                fontWeight: "700",
              }}
            >
              Search
            </button>
          </Card>
        </Grid>

        <Grid item container xs={12} sm={12} spacing={0}>
          <Grid item xs={12} sm={4}>
            <Card className={classes.card} >
           <img src={res} className=' img-fluid 'height='400px' alt="" srcset="" />
            </Card>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Card className={classes.card}>
              <CardContent>
                {/* <Typography gutterBottom variant="h5" component="h2">
                  {findRes[0] && findRes[0].name}
                </Typography> */}
                <Typography gutterBottom variant="h5" component="h2">
                  {findRes[0] && findRes[0].roll}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  GP:{findRes[0] && findRes[0].gp}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  Semester Earn Credit:{findRes[0] && findRes[0].sec}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  GPA:{findRes[0] && findRes[0].gpa}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  Yearly Earn Credit:{findRes[0] && findRes[0].yec}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  Total Earn Credit:{findRes[0] && findRes[0].tec}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  CGPA:{findRes[0] && findRes[0].cgpa}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  Failed Subjects:{findRes[0] && findRes[0].log}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={2} />
    </Grid>
  );
};

export default Semester;
