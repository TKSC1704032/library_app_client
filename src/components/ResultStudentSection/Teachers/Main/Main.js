import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import bg from "../../../Images/1stb.jfif";
import login from "../../../Images/results.png";
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
  type: {
    textAlign: "center",
  },
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "20%",
  transfrom: "translate(-50%,-50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Main = () => {
  const semester = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
  const course = {
    s2: [
      "Power Electronics",
      "Analog Electronics 2",
      "EM Field & Waves",
      "Complex Variable & Statistics",
      "Communication Theory",
    ],
    f1: [
      "Electrical Circuit Theory",
      "Computer Fundamentals & Programming",
      "Physics",
      "Calculas & Differentil Equation",
      "English Communication",
    ],
    t2: [
      "Information Theory",
      "Antenna & Propagation",
      "Digital Communication",
      "Digital Signal Processing",
      "Microprocessor & Interfacing",
    ],
    f2: [
      "Solid State Device",
      "Digital Electronics",
      "Network Analysis & Synthesis",
      "Energy Coversion",
      "Linear Algebra",
    ],
    s1: [
      "Analog Electronics 1",
      "Signal & System",
      "Data Structure & Algorithm",
      "Economics",
      "Partial Differential Equation",
    ],
    t1: [
      "Random Signal Processing",
      "Microwave Engineering",
      "Numerical Method",
      "Control System",
      "Measurement & Instrumentation",
    ],
    l1: [
      "VLSI Design",
      "Data communication",
      "Wireless Communication",
      "Fiber Optic",
      "Elective 1",
    ],
    l2: [
      "Radio & TV Engineering",
      "Telecommunication Engineering",
      "Satellite Communication",
      "Elective 2",
      "Project Planning",
    ],
  };
  const classes = useStyles();
  const { _id } = useParams();
  const [open, setOpen] = useState(false);
  const [series, setSeries] = useState({ srt: "h1", roll: "all" });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleBlur = (event) => {
    const newUserInfo = { ...series };
    newUserInfo[event.target.name] =
      event.target.name === "cname"
        ? (series.sem === "2-2" && course.s2[event.target.value]) ||
          (series.sem === "1-1" && course.f1[event.target.value]) ||
          (series.sem === "1-2" && course.f2[event.target.value]) ||
          (series.sem === "2-1" && course.s1[event.target.value]) ||
          (series.sem === "3-1" && course.t1[event.target.value]) ||
          (series.sem === "3-2" && course.t3[event.target.value]) ||
          (series.sem === "4-1" && course.l1[event.target.value]) ||
          (series.sem === "4-2" && course.l2[event.target.value])
        : event.target.name === "sem"
        ? semester[event.target.value]
        : event.target.value;
    if (newUserInfo.roll === "") newUserInfo.roll = "all";
    setSeries(newUserInfo);
  };
  return (
    <div>
      {_id === "srt" ? (
        <h3 className="text-center">Semester Result</h3>
      ) : (
        <h3 className="text-center">CT Marks & Attendance</h3>
      )}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        className={classes.grid}
      >
        <Grid item xs={12} sm={6}>
          <Card onClick={handleOpen} className={classes.card}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={login}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Check Details
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <form>
                <TextField
                  onBlur={handleBlur}
                  label="Series"
                  type="number"
                  name="series"
                  required
                  InputLabelProps={{ shrink: true }}
                />
                {/* <TextField
                onBlur={handleBlur}
                label="Semester"
                type="text"
                required
                name="sem"
                InputLabelProps={{ shrink: true }}
              /> */}

                <InputLabel id="semLebel">
                  {!series.sem && "Semester"}
                </InputLabel>
                <Select
                  fullWidth
                  labelId="semLevel"
                  id="sem"
                  value={series.sem}
                  onChange={handleBlur}
                  autoWidth
                  label="Sem"
                  name="sem"
                >
                  {semester.map((val, ind) => {
                    return <MenuItem value={ind}>{val}</MenuItem>;
                  })}
                </Select>
                <TextField
                  onBlur={handleBlur}
                  label="Roll"
                  type="text"
                  name="roll"
                  InputLabelProps={{ shrink: true }}
                />
                <br />
                <br />
                {_id === "srt" ? (
                  <Link
                    to={`/check/${_id}/${series.series}/${series.sem}/${series.srt}/${series.roll}`}
                  >
                    <Button variant="contained" color="success">
                      Search
                    </Button>
                  </Link>
                ) : (
                  <div>
                    {/* <TextField
                      onBlur={handleBlur}
                      label="Course Name "
                      type="text"
                      name="cname"
                      required
                      InputLabelProps={{ shrink: true }}
                    /> */}
                    <InputLabel id="courseLebel">
                      {!series.cname && "Course Name"}
                    </InputLabel>

                    <Select
                      fullWidth
                      labelId="courseLebel"
                      id="course"
                      name="cname"
                      value={series.cname}
                      onChange={handleBlur}
                      label="Course Name"
                      placeholder="ccc"
                    >
                      {series.sem === "1-1" &&
                        course.f1.map((val, ind) => {
                          return <MenuItem value={ind}>{val}</MenuItem>;
                        })}
                      {series.sem === "1-2" &&
                        course.f2.map((val, ind) => {
                          return <MenuItem value={ind}>{val}</MenuItem>;
                        })}
                      {series.sem === "2-1" &&
                        course.s1.map((val, ind) => {
                          return <MenuItem value={ind}>{val}</MenuItem>;
                        })}
                      {series.sem === "2-2" &&
                        course.s2.map((val, ind) => {
                          return <MenuItem value={ind}>{val}</MenuItem>;
                        })}
                      {series.sem === "3-1" &&
                        course.t1.map((val, ind) => {
                          return <MenuItem value={ind}>{val}</MenuItem>;
                        })}
                      {series.sem === "3-2" &&
                        course.t2.map((val, ind) => {
                          return <MenuItem value={ind}>{val}</MenuItem>;
                        })}
                      {series.sem === "4-1" &&
                        course.l1.map((val, ind) => {
                          return <MenuItem value={ind}>{val}</MenuItem>;
                        })}
                      {series.sem === "4-2" &&
                        course.l2.map((val, ind) => {
                          return <MenuItem value={ind}>{val}</MenuItem>;
                        })}
                    </Select>

                    <br />
                    <br />
                    <Link
                      to={`/check/${_id}/${series.series}/${series.sem}/${series.cname}/${series.roll}`}
                    >
                      <Button type="submit" variant="contained" color="success">
                        Search
                      </Button>
                    </Link>
                  </div>
                )}
              </form>
            </Box>
          </Modal>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Link style={{ textDecoration: "none" }} to={`/update/${_id}`}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={login}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Update Details
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default Main;
