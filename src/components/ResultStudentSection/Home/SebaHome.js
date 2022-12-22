import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useNavigate } from "react-router-dom";
import Clock from '../../Homepage/component/clock';
import Footer from "../../Homepage/component/footer";
import back from "../../Images/1stb.jfif";
import login from "../../Images/lin.jpg";
import "./Home.css";
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
    height: "100vh",
    alignItems: "center",
    backgroundImage: `url(${back})`,
    backgroundRepeat: "no-repeat" /* Do not repeat the image */,
    backgroundSize: "cover",
    backgroundPosition: "center",
    background: "green",
  },
  type: {
    textAlign: "center",
  },
}));

const SebaHome = () => {
  const classes = useStyles();
  const navigate=useNavigate();
  return (
    <>
    <Clock/>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        className={classes.grid}
      >
        <Grid item xs={12} sm={4}>
          
            <Card className={classes.card} onClick={(e)=>{
              navigate('/login/')
            }}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={login}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h2">
                    As a Student!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
         
        </Grid>
        <Grid item xs={12} sm={4}>
            <Card className={classes.card} onClick={(e)=>{navigate('/admin-login/')}}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={login}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h2">
                    As a Admin!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          
        </Grid>

        <Grid item xs={12} sm={4}>
            <Card className={classes.card} onClick={(e)=>{navigate('/teacher-login/')}}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={login}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h4" component="h2">
                    As a Teacher!
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default SebaHome;
