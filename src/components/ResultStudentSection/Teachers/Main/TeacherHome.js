import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
  //import { userContext } from "../../App";
  import Footer from "../../../Homepage/component/footer";
import bg from "../../../Images/1stb.jfif";
import book from "../../../Images/book.jpg";
import TeacherHeader from "./TeacherHeader";
  
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
    },
    media: {
      height: 140,
    },
    grid: {
      height: "100vh",
      alignItems: "center",
      backgroundImage: `url(${bg})`,
    },
  }));
  const style = {
    position: "absolute",
    top: "50%",
    transfrom: "translate(-50%,-50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
  const TeacherHome = () => {
    const navigate = useNavigate();
    const semester = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
    const [open1, setOpen1] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [series, setSeries] = useState({});
    const handleOpen1 = () => setOpen1(true);
    const handleOpen2 = () => setOpen2(true);
    const handleClose1 = () => setOpen1(false);
    const handleClose2 = () => setOpen2(false);
   // const [loggedInUser, setLoggedInUser] = useContext(userContext);
    //const [admins, setAddmins] = useState([]);
    const handleBlur = (event) => {
      const newUserInfo = { ...series };
      newUserInfo[event.target.name] = event.target.name==='sem' ? semester[event.target.value] :event.target.value ;
      setSeries(newUserInfo);
    };
    // useEffect(() => {
    //   fetch("http://localhost:5000/teachers/").then(
    //     (res) =>
    //       res.json().then((data) => {
    //         console.log(data);
    //         setAddmins(data);
    //       })
    //   );
    // }, []);
    const classes = useStyles();
    // const findAdmin = admins.find((admin) => loggedInUser.email === admin.email);
    // console.log(findAdmin);
    return (
      <>
      <TeacherHeader/>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        className={classes.grid}
        sx={{position:'relative'}}
      >
        <Grid item xs={12} sm={6}>
          {/* {findAdmin ? (
            <Link style={{ textDecoration: "none" }} to="/tupdate/srt">
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={book}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Check/Update Semester Results!
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ) : ( */}
            <div>
              <Card onClick={(e)=>{navigate('/teacherHomePage/updatesem/')}} className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={book}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Update Semester Results
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

            </div>
          {/* )} */}
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* {findAdmin ? (
            <Link style={{ textDecoration: "none" }} to="/tupdate/srt">
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={book}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Check/Update Semester Results!
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ) : ( */}
            <div>
              <Card onClick={(e)=>{navigate('/teacherHomePage/checksem/')}} className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={book}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Check Semester Results
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

            </div>
          {/* )} */}
        </Grid>
        <Grid item xs={12} sm={6}>
          {/* {findAdmin ? (
            <Link style={{ textDecoration: "none" }} to="/tupdate/ctt">
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={result}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Check/Update CT Marks & Attendance!
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ) : ( */}
            <div>
              <Card onClick={(e)=>{navigate('/teacherHomePage/updateCT/')}} className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={book}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                     Update CT Marks & Attendance
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              
            </div>
        
        </Grid>

        <Grid item xs={12} sm={6}>
          {/* {findAdmin ? (
            <Link style={{ textDecoration: "none" }} to="/tupdate/srt">
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={book}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Check/Update Semester Results!
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ) : ( */}
            <div>
              <Card onClick={(e)=>{navigate('/teacherHomePage/checkct/')}} className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={book}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Check CT Marks & Attendance
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>

            </div>
          {/* )} */}
        </Grid>
        
      </Grid>
      <Footer/>
      </>);
  };
  
  export default TeacherHome;
  