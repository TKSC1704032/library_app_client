import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from "@mui/icons-material/Upload";
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, IconButton, Paper, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import axios from "axios";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../../../contexts/adminContext";

export default function UpdateSemRes() {
  let navigate = useNavigate();
  const { uploadBook } = useAdmin();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [loading, setLoading] = React.useState(false);
  const [details, setDetails] = React.useState({
      series: "",
    semester: "",
    dept: "",
    excel: "",
    
  });
  const [info, setInfo] = React.useState({status:'',message:''});

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
  return (
    <Box p={5} component="body">
      <Typography color="secondary" variant="h4">
        Update Sem. Result
      </Typography>
      <Paper sx={{ width: "100%", padding: "10px" }}>
        <Grid container>
          <Grid item xs={false} md={2} />
          <Grid item xs={12} md={8}>
            <form
              onSubmit={async (e) => {
                setLoading(true);
                e.preventDefault();
                console.log(details);
                // const data = await uploadBook(details);
                // setInfo({status:data.status,message:data.message});
                // console.log(data);
                // if (data) {
                //   setLoading(false);
                // }
                    let formData = new FormData();
                    for (const property in details) {
                        formData.append(property,details[property]);
                        console.log(`${property}: ${details[property]}`);
                      }
                        try{
                            const config = {
                                method: 'post',
                                url: 'http://localhost:8080/api/result/upload-result/',
                                headers: { "Content-type": "multipart/form-data" },
                                data:formData
                
                            }
                          const response= await axios(config);
                          
                          setLoading(false);
                        console.log(response.data);
                        if(response){
                            setLoading(false);
                            setInfo({
                              status: response.data.status,
                              message: response.data.message,
                            });
                          }
                        }
                        catch(error){
                            setLoading(false);
                            setInfo({
                                status: error.response.data.status,
                                message: error.response.data.message,
                              });
          
                        //   return   error.response.data || error.message;
                        }
                      }
                

              }
            >
              <div>
                <TextField
                  id="series"
                  name="series"
                  label="Series:"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={details.series}
                  onChange={updateDetails}
                />
              </div>
              <div>
                <TextField
                  id="semester"
                  name="semester"
                  label="semester:"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={details.semester}
                  onChange={updateDetails}
                />
              </div>
              <div>
                <TextField
                  id="dept"
                  name="dept"
                  label="dept:"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  required
                  value={details.dept}
                  onChange={updateDetails}
                />
              </div>
              
              <div>
                
              <label htmlFor='book_pdf' style={{display:'block'}}>Upload books pdf:</label>
              
                  <input
                    
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    type="file"
                    name="excel"
                    id='excel'
                    required 
                    placeholder='Upload'
                    onChange={updateDetails}
                  />
                  <br/>
                
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
                  Add 
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
> <AlertTitle>Uploading {info.status}</AlertTitle>

  {info.message}
</Alert>

</Box>):<></>}
    </Box>
  );
}
