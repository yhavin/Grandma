import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { TextField, Button } from "@material-ui/core";
import { Stack, Dialog, DialogContent, DialogTitle, Link } from '@mui/material/';

const Login = ({ loginOpen, setLoginOpen, setResetOpen, setRegisterOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/recipes");
  }, [user, loading]);

  return (
    <Dialog open={loginOpen} onClose={() => setLoginOpen(false)} fullWidth>
      <DialogTitle>Log in to Grandma</DialogTitle>
      <DialogContent>
          <Stack direction={{ xs: "column" }} spacing={{ xs: 2 }}>
            <TextField 
              type="text"
              variant="outlined"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <TextField 
              type="password"
              variant="outlined"
              size="small"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <Button variant="contained" style={{color: "white", backgroundColor: "#1976d2"}} onClick={() => loginWithEmailAndPassword(email, password)}>Login</Button>
          </Stack>
            <br />
          <Stack spacing={1}>
            <Link style={{ cursor: "pointer" }} underline="hover" onClick={() => {setLoginOpen(false); setResetOpen(true)}}>Forgotten your email or password?</Link>
            <Link style={{ cursor: "pointer" }} underline="hover" onClick={() => {setLoginOpen(false); setRegisterOpen(true)}}>Create a Grandma account</Link>
          </Stack>
      </DialogContent>
    </Dialog>
  )
};

export default Login;