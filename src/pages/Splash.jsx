import React, { useState } from "react";
import Login from "../components/Login.jsx";
import Reset from "../components/Reset.jsx";
import Register from "../components/Register.jsx";
import { Box, Button, Typography, Stack, Skeleton } from "@mui/material/";
import stew from "../public/stew.jpg";

const Splash = () => {

  const [loginOpen, setLoginOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    // <Box textAlign="center" sx={{ mx: { xs: "0px", sm: "225px", lg: "475px" }, my: { xs: "0px", sm: "180px" } }}>
    <Box textAlign="center" sx={{ mx: { xs: "0%", sm: "15%", lg: "15%" }, my: { xs: "0%", sm: "15%" } }}>
      <Stack spacing={1}>
        <Box component="img" src={stew} alt="stew image" sx={{ height: 300, width: 300 }} />
      </Stack>
      <br />
      <Typography variant="h2" style={{ color: "#1976d2", fontWeight: 500 }}>Grandma</Typography>
      <br />
      <Button variant="contained" style={{color: "white", backgroundColor: "#1976d2"}} onClick={() => setLoginOpen(true)}>Log in</Button> 
      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} setResetOpen={setResetOpen} setRegisterOpen={setRegisterOpen}/>
      <Reset resetOpen={resetOpen} setResetOpen={setResetOpen} setRegisterOpen={setRegisterOpen} />
      <Register registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} setLoginOpen={setLoginOpen} />
    </Box>
  )
};

export default Splash;