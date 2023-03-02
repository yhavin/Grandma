import React, { useState } from "react";
import Login from "../components/Login.jsx";
import Reset from "../components/Reset.jsx";
import Register from "../components/Register.jsx";
import { Button } from "@material-ui/core";

const Splash = () => {

  const [loginOpen, setLoginOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <div>
      <Button variant="contained" style={{color: "white", backgroundColor: "#1976d2"}} onClick={() => setLoginOpen(true)}>Login</Button> 
      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} setResetOpen={setResetOpen} setRegisterOpen={setRegisterOpen}/>
      <Reset resetOpen={resetOpen} setResetOpen={setResetOpen} setRegisterOpen={setRegisterOpen} />
      <Register registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} setLoginOpen={setLoginOpen} />
    </div>
  )
};

export default Splash;