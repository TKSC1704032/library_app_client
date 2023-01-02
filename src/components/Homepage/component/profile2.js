import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Alert,
    AlertTitle,
    Box,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/authContext";

function Editfield() {
  const { currentUser,setCurrentUser } = useAuth();

  return (
    <Grid container>
      <Grid item></Grid>
      <Grid item>
        <Typography>{`Name: ${currentUser.fname} ${currentUser.lname}`}</Typography>
        <br />
        <Typography>{`Roll: ${currentUser.roll}`}</Typography>
        <br />
        <Typography>{`Department: ${currentUser.dept}`}</Typography> <br />
        <Typography>{`The number of books you issued: ${currentUser.issuedBooks.length}`}</Typography>{" "}
        <br />
        <Typography>
          The number of books that expired date of return: 00
        </Typography>
        <br />
        <Typography>{`You have total ${currentUser.fine}tk fine.`}</Typography>{" "}
        <br />
      </Grid>
    </Grid>
  );
}
export default function Profile() {
  const { currentUser, setCurrentUser } = useAuth();
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [details, setDetails] = useState({
    old_password: "",
    new_password: "",
    password_confirmation: "",
  });

  const [message, setMessage] = useState({
    old_password: "",
    new_password: "",
    password_confirmation: "",
  });
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const [showPassword, setShowPassword] = useState(false);
  const [info, setInfo] = useState({ status: "", message: "" });
  const handleClickShowPassword = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const onHandleChange = (e) => {
    setDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value.trim() };
    });
  };

  const handleNewPasswordValidation = () => {
    if (details.new_password === "") {
      setMessage((prev) => {
        return { ...prev, new_password: "" };
      });
    }

    if (!passwordPattern.test(details.new_password)) {
      setMessage((prev) => {
        return {
          ...prev,
          new_password:
            "Password should contain atleast 1 uppercase and 1 lowercase and 1 digit. And minimum length should be 8.",
        };
      });
    } else {
      setMessage((prev) => {
        return { ...prev, new_password: "" };
      });
    }
  };

  const handleConfirmPasswordValidation = () => {
    if (details.password_confirmation === "") {
      setMessage((prev) => {
        return { ...prev, password_confirmation: "" };
      });
    }

    if (!passwordPattern.test(details.password_confirmation)) {
      setMessage((prev) => {
        return {
          ...prev,
          password_confirmation:
            "Password should contain atleast 1 uppercase and 1 lowercase and 1 digit. And minimum length should be 8.",
        };
      });
    } else {
      setMessage((prev) => {
        return { ...prev, password_confirmation: "" };
      });
    }
  };

  return (
    <Container maxWidth="xl">
      <Box
        mt={2}
        sx={{ bgcolor: "#F3F4F6", height: "100vh", borderRadius: "15px" }}
      >
        <Grid container spacing={1} direction="row">
          <Grid item xs={12} md={4}>
            <Typography variant="h5">Profile</Typography>
            <p>
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              mt={2}
              sx={{
                bgcolor: "#FFFFFF",
                height: "auto",
                borderRadius: "15px",
                padding: "20px",
              }}
            >
              {Editfield()}
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h5">Change your Profile Avatar </Typography>
            <p>
              Your avatar will be displayed publicly so be careful what you
              share.
            </p>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              mt={2}
              sx={{
                bgcolor: "#FFFFFF",
                height: "auto",
                borderRadius: "15px",
                padding: "20px",
              }}
            >
              <div>
                <input
                  type="file"
                  accept="image/*"
                  name="avatar"
                  id="avatar"
                  onChange={(e) => {
                    setAvatar(e.target.files[0]);
                  }}
                  required
                />
              </div>
              <br />
              <div>
                <LoadingButton
                  sx={{ marginRight: "20px" }}
                  type="button"
                  size="small"
                  loading={loading}
                  loadingPosition="end"
                  color="success"
                  variant="contained"
                  onClick={async () => {
                    setLoading(true);
                    if (avatar === "") {
                      setInfo({
                        status: "failed",
                        message: "please select your avatar",
                      });

                      setLoading(false);
                    }
                    if (avatar !== "") {
                      let formData = new FormData();
                      formData.append("userID", currentUser._id);
                      formData.append("avatar", avatar);
                      axios
                        .post(
                          "http://localhost:8080/api/student/change-avatar/",
                          formData,
                          {
                            headers: { "Content-type": "multipart/form-data" },

                            credentials: "include",
                            withCredentials: true,
                          }
                        )
                        .then(function (res) {
                          setLoading(false);
                          setInfo({
                            status: res.data.status,
                            message: res.data.message,
                          });
                          setCurrentUser((prev)=>{
                            return {...prev, avatar:res.data.img_url}
                          });
                        })
                        .catch(function (err) {
                          setInfo({
                            status: err.response.data.status,
                            message: err.response.data.message,
                          });

                          setLoading(false);

                          console.log(err);
                        });
                    }
                  }}
                >
                  Change Avatar
                </LoadingButton>
              </div>
              <br />
              <div>
                <LoadingButton
                  sx={{ marginRight: "20px" }}
                  type="button"
                  size="small"
                  loading={loading2}
                  loadingPosition="end"
                  color="error"
                  variant="contained"
                  onClick={async () => {
                    setLoading2(true);

                    axios
                      .delete(
                        `http://localhost:8080/api/student/remove-avatar/${currentUser._id}/`,
                        { credentials: "include", withCredentials: true }
                      )
                      .then(function (res) {
                        setLoading2(false);
                        setInfo({
                          status: res.data.status,
                          message: res.data.message,
                        });
                        setCurrentUser((prev)=>{
                          return {...prev, avatar:''}
                        });
                      })
                      .catch(function (err) {
                        setInfo({
                          status: err.response.data.status,
                          message: err.response.data.message,
                        });

                        setLoading2(false);

                        console.log(err);
                      });
                  }}
                >
                  Delete Avatar
                </LoadingButton>
              </div>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h5">Change your password</Typography>
            <p>It will be kept secret </p>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              mt={2}
              sx={{
                bgcolor: "#FFFFFF",
                height: "auto",
                borderRadius: "15px",
                padding: "20px",
              }}
            >
              <div>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="old_password">Old Password:</InputLabel>
                  <OutlinedInput
                    autoComplete="off"
                    id="old_password"
                    name="old_password"
                    label="Old password:"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={details.old_password}
                    required
                    onChange={onHandleChange}
                    type={showPassword ? "text" : "password"}
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
                  />
                </FormControl>
              </div>

              <br />

              <div>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="new_password">New password:</InputLabel>
                  <OutlinedInput
                    autoComplete="off"
                    id="new_password"
                    name="new_password"
                    label="New password:"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={details.new_password}
                    required
                    onChange={onHandleChange}
                    type={showPassword ? "text" : "password"}
                    onBlur={handleNewPasswordValidation}
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
                  />
                </FormControl>
                {message.new_password !== "" ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {message.new_password}
                  </p>
                ) : (
                  <></>
                )}
              </div>

              <br />
              <div>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="password_confirmation">
                    Confirm password:
                  </InputLabel>
                  <OutlinedInput
                    autoComplete="off"
                    id="password_confirmation"
                    name="password_confirmation"
                    label="Confirm password:"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={details.password_confirmation}
                    required
                    onChange={onHandleChange}
                    type={showPassword ? "text" : "password"}
                    onBlur={handleConfirmPasswordValidation}
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
                  />
                </FormControl>
                {message.password_confirmation !== "" ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {message.password_confirmation}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <br />
              <LoadingButton
                sx={{ marginRight: "20px" }}
                type="button"
                size="small"
                loading={loading3}
                loadingPosition="end"
                color="success"
                variant="contained"
                onClick={async () => {
                  setLoading3(true);
                  if (
                    details.old_password !== "" ||
                    details.new_password !== "" ||
                    details.password_confirmation !== ""
                  ) {
                    setInfo({
                      status: "failed",
                      message: "please fill all fields",
                    });

                    setLoading3(false);
                  }
                  if (
                    details.old_password !== "" &&
                    message.new_password === "" &&
                    message.password_confirmation === ""
                  ) {
                    axios
                      .post(
                        "http://localhost:8080/api/student/refresh-token/",
                        {},
                        { credentials: "include", withCredentials: true }
                      )
                      .then((res) => {

                        axios
                        .post(
                          `http://localhost:8080/api/student/changepassword/${currentUser._id}`,
                          details,
                          {
                            headers: { "Authorization":`Bearer ${res.data["AccessToken"]}` },
                            credentials: "include",
                            withCredentials: true,
                          }
                        )
                        .then(function (res) {
                          setLoading3(false);
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
  
                          setLoading3(false);
  
                          console.log(err);
                        });


                      })
                      .catch((e) => {
                        setLoading3(false);
                          setInfo({
                            status: e.response.data.status,
                            message: e.response.data.message,
                          });
                        });   
                  }
                }}
              >
                Change Password
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
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
            
            <AlertTitle>{info.status}</AlertTitle>
            {info.message}
          </Alert>
        </Box>
      ) : (
        <></>
      )}
    </Container>
  );
}
