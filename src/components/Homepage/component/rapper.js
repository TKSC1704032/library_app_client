import { Box, Container } from "@mui/material";
import React from "react";
import Clock from './clock';
import Footer from "./footer";
import ResponsiveAppBar from "./header";
export default function Rapper({ profile,children }) {
  return (
    <>
    <Clock/>
      <ResponsiveAppBar profile/>
      <Container maxWidth="xl">
        <Box
          mt={2}
          sx={{ bgcolor: "#F3F4F6", minHeight: "100vh", borderRadius: "15px" ,padding:"20px"}}
        >
          {children}
        </Box>
        {!profile&&<Footer/>}

      </Container>
    </>
  );
}
