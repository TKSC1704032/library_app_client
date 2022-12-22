import {
    Box,
    Card,
    CardActionArea,
    CardContent,
    Grid, makeStyles, Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/RingLoader";
import bg from "../../../Images/1stb.jfif";

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
    maxWidth: 345,
    margin: "auto",
    background: "transparent",
    boxShadow: "5px 25px 25px ",
  },
  media: {
    height: 140,
  },
  grid: {
    height: "100%",
    alignItems: "center",
    backgroundImage: `url(${bg})`,
  },
  circle: {
    height: "100vh",
    alignItems: "center",
    backgroundImage: `url(${bg})`,
  },
}));

const Check = () => {
  const { id, series, sem, cname,roll } = useParams();
  const [results, setResults] = useState([]);
  const [res, setRes] = useState({});
  
  useEffect(() => {
    if (id === "srt") {
      fetch("http://localhost:5000/semRes/").then(
        (res) =>
          res.json().then((data) => {
            console.log(data);
            setResults(data);
          })
      );
    }
    if (id === "ctt") {
      fetch("http://localhost:5000/ctRes/").then((res) =>
        res.json().then((data) => {
          //console.log(data)
          setResults(data);
        })
      );
    }
  }, []);
  const findRes1 = results.filter((data) => series === data.series);
  //console.log(findRes1);
  
  let findRes = findRes1.filter((data) => sem === data.sem);
  findRes.sort(function (a, b) {
    return a.roll - b.roll;
  });
  if(roll && roll!=='all'){findRes = findRes.filter((data) => roll === data.roll)
    console.log(roll)
    //console.log(findRes)
  }
  //setResults(findRes)
  if (id === "ctt") {
    findRes = findRes.filter((data) => cname === data.cname);
    if(roll && roll!=='all') {findRes = findRes.filter((data) => roll === data.roll);
    }
    //setResults(findRes)
  }
  // const handleBlur=(e)=>{
  //   const newUserInfo={}
  //    newUserInfo[e.target.name]=e.target.value
  //    setRes(newUserInfo)
  // }
  // // const handleClick=()=>
  // // {
  // //   findRes = findRes.filter((data) => res.roll === data.roll);
  // // //  console.log(findRes)
  // //   setResults(findRes)
  // //   console.log(findRes)

  // // }
  
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      className={findRes.length && roll==='all' ? classes.grid : classes.circle}
    >
      {/* <TextField
        type="text"
        name="roll"
        
        onBlur={handleBlur}
        placeholder="Roll"
      />
      <IconButton onClick={handleClick} size="large" aria-label="search" color="inherit">
        <p>Search</p>
        </IconButton> */}
      {!findRes.length ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ClipLoader
            color={"#9013FE"}
            loading={true}
            // cssOverride={override}
            size={150}
          />
        </Box>
      ) : (
        findRes.map((res) => {
          return [
            <Grid item xs={12} sm={4}>
              <Card className={classes.card}>
                {id === "srt" ? (
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {res.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        {res.roll}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        GP:{res.gp}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Semester Earn Credit:{res.sec}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        GPA:{res.gpa}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Yearly Earn Credit:{res.yec}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Total Earn Credit:{res.tec}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        CGPA:{res.cgpa}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Failed Subjects:{res.log}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                ) : (
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {res.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        {res.roll}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Semester:{res.sem}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Course Name:{res.cname}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        CT1:{res.ct1}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        CT2:{res.ct2}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        CT3:{res.ct3}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        CT4:{res.ct4}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        CT Average:
                        {Math.round(
                          (parseInt(res.ct1) +
                            parseInt(res.ct2) +
                            parseInt(res.ct3) +
                            parseInt(res.ct4) -
                            Math.min(
                              parseInt(res.ct1),
                              parseInt(res.ct2),
                              parseInt(res.ct3),
                              parseInt(res.ct4)
                            )) /
                            3
                        )}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Attendance:{res.ap}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Attendance Marks:{res.ap.length===4? 8 :parseInt(res.ap.slice(0,2))>90 && 8  || parseInt(res.ap.slice(0,2))<50 && 0 || parseInt(res.ap.slice(0,2))>80 && 6  || parseInt(res.ap.slice(0,2))>70 && 5  || parseInt(res.ap.slice(0,2))>60 && 3  }
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                )}
              </Card>
            </Grid>,
          ];
        })
      )}
    </Grid>
  );
};

export default Check;
