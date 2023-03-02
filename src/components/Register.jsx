import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../firebase.config";
import { TextField, Button } from "@material-ui/core";
import { Stack, Dialog, DialogContent, DialogTitle, Link } from '@mui/material/';

const Register = ({ registerOpen, setRegisterOpen, setLoginOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!firstName || !lastName) alert("Please complete your name.");
    registerWithEmailAndPassword(firstName, lastName, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/recipes");
  }, [user, loading]);

  return (
    <Dialog open={registerOpen} onClose={() => setRegisterOpen(false)} fullWidth>
      <DialogTitle>Create a Grandma account</DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: "column" }} spacing={{ xs: 2 }}>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
          />
          <TextField
            type="text"
            variant="outlined"
            size="small"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
          />
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button variant="contained" style={{color: "white", backgroundColor: "#1976d2"}} onClick={register}>Register</Button>
        </Stack>
        <br />
        <Link style={{ cursor: "pointer" }} underline="hover" onClick={() => {setRegisterOpen(false); setLoginOpen(true)}}>Already have a Grandma account?</Link>
      </DialogContent>
    </Dialog>
  )
};

export default Register;