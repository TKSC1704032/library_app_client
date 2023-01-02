import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField
} from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../contexts/adminContext";

export default function AddTeacher() {
  let navigate = useNavigate();
  const { uploadBook } = useAdmin();

  const [showPassword, setShowPassword] = React.useState(false);
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [message, setMessage] = React.useState("");
  const handleEmailValidation = () => {
    if (details.email === "") {
      setMessage("");
    } else if (!emailPattern.test(details.email)) {
      setMessage("Invalid email. Please correct it.");
    } else {
      setMessage("");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [loading, setLoading] = React.useState(false);
  const [details, setDetails] = React.useState({
    name: "",
    designation: "",
    dept: "",
    email: "",
    password: "",
  });
  const [info, setInfo] = React.useState({ status: "", message: "" });

  const updateDetails = (e) => {
    setDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  return (
    <Box p={5} component="body">
      <Typography color="secondary" variant="h4">
        Create Teacher Account
      </Typography>
      <Paper sx={{ width: "100%", padding: "10px" }}>
        <Grid container>
          <Grid item xs={false} md={2} />
          <Grid item xs={12} md={8}>
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
              <div>
                <TextField
                  id="name"
                  name="name"
                  label="Name of Teacher:"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={details.name}
                  onChange={updateDetails}
                />
              </div>
              <div>
                <TextField
                  id="designation"
                  name="designation"
                  label="Designation:"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={details.designation}
                  onChange={updateDetails}
                />
              </div>
              <div>
                <TextField
                  id="dept"
                  name="dept"
                  label="Department:"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={details.dept}
                  onChange={updateDetails}
                />
              </div>
              <div>
                <TextField
                  id="email"
                  name="email"
                  label="Email:"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={details.email}
                  required
                  onChange={updateDetails}
                  onBlur={handleEmailValidation}
                />
                {message !== "" ? (
                  <p style={{ color: "red", fontSize: "12px" }}>{message}</p>
                ) : (
                  <></>
                )}
              </div>
              <div>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={details.password}
                    onChange={updateDetails}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>

              <br />
              <div>
                <LoadingButton
                  type="submit"
                  size="small"
                  endIcon={<UploadIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                >
                  Create Teacher Account
                </LoadingButton>

                {/* <Button type="submit" variant="contained" color="secondary">
                  Submit
                </Button> */}
              </div>
            </form>
          </Grid>
          <Grid item xs={false} md={2} />
        </Grid>
      </Paper>
      {info.status !== "" ? (
        <Box
          sx={{ width: "60%", position: "fixed", left: "20px", bottom: "10px" }}
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
    </Box>
  );
}
