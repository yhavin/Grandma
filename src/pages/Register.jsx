import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../firebase.config";
import { TextField, Button } from "@material-ui/core";
import { Stack } from '@mui/material/';

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
    <div>
      <div>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button variant="contained" color="primary" onClick={register}>Register</Button>
        </Stack>
        <br />
      </div>
      <div>
        <Link to="/" style={{ textDecoration: "none" }}>Already have a Grandma account?</Link>
      </div>
    </div>
  )
};

export default Register;