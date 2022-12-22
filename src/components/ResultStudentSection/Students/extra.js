import CloseIcon from '@mui/icons-material/Close';
import UploadIcon from "@mui/icons-material/Upload";
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, IconButton, Paper, TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";


export default function AddBooks() {
  let navigate = useNavigate();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const uploadResult= async ( datas={}) =>{
    let formData = new FormData();
    for (const property in datas) {
        formData.append(property,datas[property]);
        console.log(`${property}: ${datas[property]}`);
      }
        // try{
             fetch("http://localhost:5000/addExtra/", {
                 method: "POST",
                 headers: { 'Accept': 'application/json',
                
                 'Content-Type': 'multipart/form-data' },
                 body:formData
               })
               .then(
                response => response.json() // if the response is a JSON object
               ).then(
                 success => console.log(success) // Handle the success response object
               ).catch(
                 error => console.log(error) // Handle the error response object
               );
             }
            // }
    //        const config = {
    //              method: 'POST',
    //              url: 'http://localhost:5000/addExtra/',
    //              headers: { "Content-type": "multipart/form-data" },
    //              data:formData

    //          }
    //        const response= await axios(config);
          
          
    //      return response.data;

    //      }
    //      catch(error){
  
    //        return   error.response.data || error.message;
    //      }
    //   }
  const [loading, setLoading] = React.useState(false);
  const [details, setDetails] = React.useState({
    series: "",
    dept: "",
    semester:"",
    result_csv: "",
  });
  const [info, setInfo] = React.useState({status:'',message:''});

  const updateDetails = (e) => {
    setDetails((prev) => {
      if (e.target.name === "result_csv") {
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
        Add Books Information
      </Typography>
      <Paper sx={{ width: "100%", padding: "10px" }}>
        <Grid container>
          <Grid item xs={false} md={2} />
          <Grid item xs={12} md={8}>
            <form
              onSubmit={async (e) => {
                setLoading(true);
                e.preventDefault();
                // console.log(details);
                const data = await uploadResult(details);
                setInfo({status:true,message:true});
                console.log(data);
                if (data) {
                  setLoading(false);
                }
              }}
            >
              <div>
                <TextField
                  id="series"
                  name="series"
                  label="series:"
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
                  id="dept"
                  name="dept"
                  label="Dept:"
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
                
              <label htmlFor='result_csv' style={{display:'block'}}>Upload CSV:</label>
              
                  <input
                    
                    accept="application/pdf"
                    type="file"
                    name="result_csv"
                    id='result_csv'
                    required 
                    placeholder='Upload CSV'
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
                  Add Book
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