import CloseIcon from '@mui/icons-material/Close';
import Visibility from "@mui/icons-material/Visibility";

import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Alert, AlertTitle, Grid, IconButton, Paper, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useTeacher } from '../../contexts/teacherContext';
import classes from "../../style/loginpage.module.css";
export default function TeacherLogin () {
 let navigate = useNavigate();
 const {teacherLogin}=useTeacher();
 const [info, setInfo] = React.useState({status:'',message:''});
  const [showPassword, setShowPassword] = React.useState(false);
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const [message,setMessage]=React.useState('');
  const handleEmailValidation=()=>{
    if (details.email===''){
      setMessage("");
    }

    else if (!emailPattern.test(details.email)) {
      setMessage("Invalid email. Please correct it.");
    } else {
      setMessage("");
    }

  }


  const handleClickShowPassword = () => {
    setShowPassword((prev) => {
      return !prev;
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [verified, setVerified] = React.useState(false);
 
  const [details, setDetails] = React.useState({
    email: null,
    password: null,
  });

  const updateDetails = (e) => {
    setDetails((prev) => {
      return {
        ...prev,
        [e.target.name]:e.target.value,
      };
    });
  };
  return (
    <Box p={5} component="body" className={classes.box}>
      <Typography className={classes.title} color="secondary" variant="h4">
        Teacher Login Page!!
      </Typography>
      <Paper sx={{ width: "100%" ,padding:"10px"}} >
      
      <Grid container>
        <Grid item xs={false} md={2} />
        <Grid item xs={12} md={8}>
            <form
              onSubmit={async(e) => {
                e.preventDefault();
                console.log(details);
                if(message===''){
                const data= await teacherLogin(details);
                setInfo({status:data.status,message:data.message});
                console.log(data);
                if(data.status==='success'){
                   
                  navigate('/teacherHomePage/');
                }
              }
              }} >
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
                  <p style={{ color: "red", fontSize: "12px" }}>
                    {message}
                  </p>
                ) : <></>}
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

              <br/>
              <div>
                  <Button type="submit" variant="contained" color="secondary">Log In</Button>
              </div>
            </form>
        </Grid>
        <Grid item xs={false} md={2} />
      </Grid>
      </Paper>
      {info.status!==''? (<Box sx={{ width: '60%',position:'fixed',left:'20px',bottom:'10px'}}>

        <Alert
        
        severity={info.status==='failed'?"error":"success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setInfo({status:'',message:''});
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        > <AlertTitle>Login {info.status}</AlertTitle>

          {info.message}
        </Alert>
      
    </Box>):<></>}
    </Box>
  );
}
