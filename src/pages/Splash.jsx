import React, { useState } from "react";
import Login from "../components/Login.jsx";
import Reset from "../components/Reset.jsx";
import Register from "../components/Register.jsx";
import { Box, Button, Typography, Stack, Skeleton } from "@mui/material/";

const Splash = () => {

  const [loginOpen, setLoginOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    // <Box textAlign="center" sx={{ mx: { xs: "0px", sm: "225px", lg: "475px" }, my: { xs: "0px", sm: "180px" } }}>
    <Box textAlign="center" sx={{ mx: { xs: "0%", sm: "15%", lg: "15%" }, my: { xs: "0%", sm: "15%" } }}>
      <Stack spacing={1}>
        <Skeleton variant="rounded" height={300} />
        {/* <Skeleton variant="rounded" height={60} />
        <Skeleton variant="rounded" height={60} /> */}
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