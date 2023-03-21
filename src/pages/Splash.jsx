import React, { useState } from "react";
import Login from "../components/Login.jsx";
import Reset from "../components/Reset.jsx";
import Register from "../components/Register.jsx";
import { Button, Typography, Grid, Card, CardContent, CardActions } from "@mui/material/";
import { CardMedia } from "@material-ui/core";
import stewImg from "../stew.jpeg"

const Splash = () => {

  const [loginOpen, setLoginOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
      <Grid item>
        <Card>
          <CardMedia src={stewImg} component="img" title="stew" height="300" />
          <CardContent>
            <Typography variant="h2" style={{ color: "#1976d2", fontWeight: 500 }}>Grandma</Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" style={{color: "white", backgroundColor: "#1976d2"}} onClick={() => setLoginOpen(true)}>Log in</Button>
            <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} setResetOpen={setResetOpen} setRegisterOpen={setRegisterOpen}/>
            <Reset resetOpen={resetOpen} setResetOpen={setResetOpen} setRegisterOpen={setRegisterOpen} />
            <Register registerOpen={registerOpen} setRegisterOpen={setRegisterOpen} setLoginOpen={setLoginOpen} />
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
};

export default Splash;