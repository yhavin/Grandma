import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../firebase.config";
import { TextField, Button } from "@material-ui/core";
import { Stack, Box, Paper } from '@mui/material/';

const Register = () => {
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
    <Box sx={{ mx: { xs: "0px", sm: "225px", lg: "475px" }, my: { xs: "0px", sm: "225px" } }}>
      <Paper style={{ padding: 20, borderRadius: "10px" }} elevation={16}>
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
        <Link className="ui-link" to="/">Already have a Grandma account?</Link>
      </Paper>
    </Box>
  )
};

export default Register;