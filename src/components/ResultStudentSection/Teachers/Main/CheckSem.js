import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@material-ui/core";
import axios from "axios";
import "firebase/compat/auth";
import React, { useEffect, useState } from "react";
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

const CheckSem = () => {
  const [result, setResult] = useState([]);
  const [resultLoad, setResultLoad] = useState();
  const [resultMessage, SetResultMessage] = useState();
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/api/student/find-books/",
        {},
        { credentials: "include", withCredentials: true }
      )
      .then(function (res) {
        console.log(res.data.books);
        setResultLoad(false);
        if (res.data) {
          setResult(res.data.books);
        }
      })
      .catch(function (err) {
        setResultLoad(false);
        setResult({});

        SetResultMessage("failed");

        console.log(err);
      });
  }, []);
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
  return (
    <Grid container spacing={0} className={classes.circle} direction="row">
      <Grid item xs={0} sm={2} />
      <Grid item container xs={12} sm={8} spacing={0} direction="row">
        <Grid item xs={12} sm={12}>
          <Card className={classes.card}>
            <TextField required id="series" placeholder="Series" type='text' name="series" onBlur={handleBlur} />
            <TextField  id="roll" placeholder="Roll" type='text' name="roll" onBlur={handleBlur} />
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
          {findRes.map((res) => {
            return [
              <Grid item xs={12} sm={4}>
                <Card className={classes.card}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {res.name}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Roll:{res.roll}
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
                        ) || " "}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="h2">
                        Attendance Marks:
                        {res.ap.length === 4
                          ? 8
                          : (parseInt(res.ap.slice(0, 2)) > 90 && 8) ||
                            (parseInt(res.ap.slice(0, 2)) < 50 && 0) ||
                            (parseInt(res.ap.slice(0, 2)) > 80 && 6) ||
                            (parseInt(res.ap.slice(0, 2)) > 70 && 5) ||
                            (parseInt(res.ap.slice(0, 2)) > 60 && 3)}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>,
            ];
          })}
        </Grid>
      </Grid>
      <Grid item xs={0} sm={2} />
    </Grid>
  );
};

export default CheckSem;
