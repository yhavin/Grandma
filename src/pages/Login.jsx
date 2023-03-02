import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { TextField, Button } from "@material-ui/core";
import { Stack, Box, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material/';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/recipes");
  }, [user, loading]);

  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ mx: { xs: "0px", sm: "225px", lg: "475px" }, my: { xs: "0px", sm: "225px" } }}>
      <Paper style={{ padding: 20, borderRadius: "10px" }}>
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
          <Link className="ui-link" to="/reset">Forgotten your email or password?</Link>
          <Link className="ui-link" to="/register">Create Grandma account</Link>
        </Stack>
      </Paper>
    </Box>
  )
};

export default Login;