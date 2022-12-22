import { Box, Container } from "@mui/material";
import React from "react";
import Clock from '../../Homepage/component/clock';
import SebaHeader from "../SebaHeader/SebaHeader";
export default function StudentHomeRapper({ children }) {
  return (
    <>
    <Clock/>
      <SebaHeader />
      <Container maxWidth="xl">
        <Box
          mt={2}
          sx={{ bgcolor: "#F3F4F6", minHeight: "100vh", borderRadius: "15px" ,padding:"20px"}}
        >
          {children}
        </Box>
        
      </Container>
    </>
  );
}