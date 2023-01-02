import {
    Box,
    Button,
    Card,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    TextField
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import { LoadingButton } from "@mui/lab";

import { Alert, AlertTitle, IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import axios from "axios";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import "./Update.css";
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
    maxWidth: "75%",
    margin: "auto",
    background: "transparent",
    boxShadow: "5px 25px 25px ",
    border: "4px solid black",
  },
  cardEx: {
    maxWidth: "75%",
    margin: "auto",
    background: "transparent",
    boxShadow: "5px 25px 25px ",
    border: "4px solid black",
    height: "60%",
  },
  media: {
    height: 140,
  },
  grid: {
    height: "100%",
    alignItems: "center",
  },
  gridEx: {
    height: "100vh",
    alignItems: "center",
  },
  type: {
    textAlign: "center",
  },
  textField: {
    backgroundColor: "transparent",
    fontWeight: 900,
    color: "black",
  },
  tab: {
    width: "75%",
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}
const Update = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
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
  const semester = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [details, setDetails] = React.useState({
    series: "",
    dept: "",
    semester: "",
  });
  const updateDetails = (e) => {
    setDetails((prev) => {
      if (e.target.name === "excel") {
        return {
          ...prev,
          [e.target.name]: e.target.files[0],
        };
      } else {
        return {
          ...prev,
          [e.target.name]: e.target.value.trim(),
        };
      }
    });
  };

  const [info, setInfo] = React.useState({ status: "", message: "" });

  const [data, setData] = useState({});
  const handleBlur = (event) => {
    const newUserInfo = { ...data };
    newUserInfo[event.target.name] =
      event.target.name === "cname"
        ? (data.sem === "4" && course.s2[event.target.value]) ||
          (data.sem === "1" && course.f1[event.target.value]) ||
          (data.sem === "2" && course.f2[event.target.value]) ||
          (data.sem === "3" && course.s1[event.target.value]) ||
          (data.sem === "5" && course.t1[event.target.value]) ||
          (data.sem === "6" && course.t3[event.target.value]) ||
          (data.sem === "7" && course.l1[event.target.value]) ||
          (data.sem === "8" && course.l2[event.target.value])
        : event.target.name === "sem"
        ? semester[event.target.value]
        : event.target.value;

    setData(newUserInfo);
  };
  const handleSubmitEx = async (e) => {
    let formData = new FormData();
    for (const property in details) {
      formData.append(property, details[property]);
      console.log(`${property}: ${details[property]}`);
    }
    try {
      const config = {
        method: "post",
        url: "https://ruetonlineservice.onrender.com/api/admin/upload-book/",
        headers: { "Content-type": "multipart/form-data" },
        data: formData,
      };
      const response = await axios(config);

      return response.data;
    } catch (error) {
      return error.response.data || error.message;
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // fetch("https://ruetonlineservice.onrender.com/api/result/upload-result-manually/", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
  };
  const classes = useStyles();
  return (
    <div className="text-center  bgu">
      <h3 style={{ color: "black" }}>Upload Semester Result</h3>

      <h3>Upload Semester Result</h3>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        className={value === 0 ? classes.grid : classes.gridEx}
      >
        <Box className={classes.tab}>
          {/* <Grid item xs={12} sm={6}> */}
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Manual Input" {...a11yProps(0)} />
              <Tab label="With Excel File" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Card className={classes.card}>
                <Box
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "55ch",
                      maxWidth: "90%",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setLoading(true);

                      axios
                        .post(
                          "https://ruetonlineservice.onrender.com/api/result/add-teacher/",
                          details,
                          { credentials: "include", withCredentials: true }
                        )
                        .then(function (res) {
                          setLoading(false);

                          setInfo({
                            status: res.data.status,
                            message: res.data.message,
                          });
                        })
                        .catch(function (err) {
                          setInfo({
                            status: err.response.data.status,
                            message: err.response.data.message,
                          });

                          setLoading(false);
                        });
                    }}
                  >
                    <TextField
                      type="text"
                      name="name"
                      onBlur={handleBlur}
                      placeholder="Full Name"
                      required
                    />
                    <br />
                    <br />
                    <TextField
                      type="text"
                      name="email"
                      onBlur={handleBlur}
                      placeholder="Email"
                      required
                    />
                    <br />
                    <br />
                    <TextField
                      type="number"
                      name="roll"
                      onBlur={handleBlur}
                      placeholder="Your Roll"
                      required
                    />
                    <br />
                    <br />
                    <TextField
                      type="number"
                      name="series"
                      id="series"
                      onBlur={handleBlur}
                      placeholder="Series"
                      required
                    />
                    <br />
                    <br />
                    {/* <TextField
                  type="text"
                  name="sem"
                  onBlur={handleBlur}
                  placeholder="Semester"
                  required
                /> */}
                    <InputLabel id="semLebel">
                      {!data.sem && "Semester"}
                    </InputLabel>
                    <Select
                      labelId="semLevel"
                      id="sem"
                      name="sem"
                      value={data.sem}
                      onChange={handleBlur}
                      autoWidth
                      label="Sem"
                    >
                      {semester.map((val, ind) => {
                        return <MenuItem value={ind}>{val}</MenuItem>;
                      })}
                    </Select>
                    <br />
                    <br />
                    <TextField
                      type="text"
                      name="gp"
                      onBlur={handleBlur}
                      placeholder="GP"
                      required
                    />
                    <br />
                    <br />
                    <TextField
                      type="text"
                      name="sec"
                      onBlur={handleBlur}
                      placeholder="Semester Earn Credit"
                      required
                    />
                    <br />
                    <br />
                    <TextField
                      type="text"
                      name="gpa"
                      onBlur={handleBlur}
                      placeholder="GPA"
                      required
                    />
                    <br />
                    <br />
                    <TextField
                      type="text"
                      name="yec"
                      onBlur={handleBlur}
                      placeholder="Yearly Earn Credit"
                      required
                    />
                    <br />
                    <br />
                    <TextField
                      type="text"
                      name="tec"
                      onBlur={handleBlur}
                      placeholder="Total Earn Credit"
                      required
                    />
                    <br />
                    <br />
                    <TextField
                      type="text"
                      name="cgpa"
                      onBlur={handleBlur}
                      placeholder="CGPA"
                      required
                    />
                    <br />
                    <br />
                    <TextField
                      type="text"
                      name="log"
                      onBlur={handleBlur}
                      placeholder="Failed Subjects"
                      required
                    />
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      className="input submit"
                      type="submit"
                    >
                      Post
                    </Button>
                  </form>
                  <br />
                </Box>
              </Card>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Card className={classes.cardEx}>
                <Box
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "55ch",
                      maxWidth: "90%",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setLoading(true);

                      axios
                        .post(
                          "https://ruetonlineservice.onrender.com/api/result/upload-result/",
                          details,
                          { credentials: "include", withCredentials: true }
                        )
                        .then(function (res) {
                          setLoading(false);

                          setInfo({
                            status: res.data.status,
                            message: res.data.message,
                          });
                        })
                        .catch(function (err) {
                          setInfo({
                            status: err.response.data.status,
                            message: err.response.data.message,
                          });

                          setLoading(false);
                        });
                    }}
                    style={{ minHeight: "400px", marginTop: "5px" }}
                  >
                    <div>
                      <TextField
                        type="text"
                        name="series"
                        onChange={updateDetails}
                        placeholder="Series"
                        value={details.series}
                        required
                      />
                      <br />
                      <TextField
                        type="text"
                        name="semester"
                        onChange={updateDetails}
                        placeholder="Semester"
                        value={details.semester}
                        required
                      />
                      <br />
                      <TextField
                        type="text"
                        name="dept"
                        onChange={updateDetails}
                        value={details.dept}
                        placeholder="Department"
                        required
                      />
                      <br />
                      <label htmlFor="excel" style={{ display: "block" }}>
                        Upload CSV:
                      </label>

                      <input
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        type="file"
                        name="excel"
                        id="excel"
                        required
                        placeholder="Upload Excel"
                        onChange={updateDetails}
                      />
                      <br />
                    </div>
                    <LoadingButton
                  type="submit"
                  size="small"
                  endIcon={<UploadIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                >
                  Update Result
                </LoadingButton>
                  </form>
                </Box>
              </Card>
            </TabPanel>
          </SwipeableViews>

          {/* </Grid> */}
          {/* <Grid item xs={12} sm={6} className={classes.gridEx}> */}

          {/* </Grid> */}
        </Box>
        {info.status !== "" ? (
          <Box
            sx={{
              width: "60%",
              position: "fixed",
              left: "20px",
              bottom: "10px",
            }}
          >
            <Alert
              severity={info.status === "failed" ? "error" : "success"}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setInfo({ status: "", message: "" });
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {" "}
              <AlertTitle>Uploading {info.status}</AlertTitle>
              {info.message}
            </Alert>
          </Box>
        ) : (
          <></>
        )}
      </Grid>
    </div>
  );
};

export default Update;
