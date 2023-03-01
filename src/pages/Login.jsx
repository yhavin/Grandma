import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { TextField, Button } from "@material-ui/core";
import { Stack } from '@mui/material/';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/recipes");
  }, [user, loading]);

  return (
    <div>
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
          <Button variant="contained" color="primary" onClick={() => loginWithEmailAndPassword(email, password)}>Login</Button>
        </Stack>
        <br />
      <Stack spacing={1}>
        <Button size="small" variant="outlined" component={Link} to="/reset">Forgot password</Button>
        <Button size="small" variant="outlined" component={Link} to="/register">Create an account</Button>
      </Stack>
    </div>
  )
};

export default Login;