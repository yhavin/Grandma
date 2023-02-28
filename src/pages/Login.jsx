import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { TextField, Button } from "@material-ui/core";
import { Stack } from '@mui/material/';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <TextField 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <Button type="submit" onClick={() => loginWithEmailAndPassword(email, password)}>Login</Button>
        </Stack>
      </div>
      <div>
        <Link to="/reset">Forgot password?</Link>
      </div>
      <div>
        <Link to="/register">Create an account</Link>
      </div>
    </div>
  )
};

export default Login;