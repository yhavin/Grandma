import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase.config";
import { TextField, Button } from "@material-ui/core";
import { Stack, Box, Paper } from '@mui/material/';

const Reset = ()  => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/recipes");
  }, [user, loading]);

  return (
    <Box sx={{ mx: { xs: "0px", sm: "225px", lg: "475px" }, my: { xs: "0px", sm: "225px" } }}>
      <Paper style={{ padding: 20, borderRadius: "10px" }} >
        <Stack direction={{ xs: "column" }} spacing={{ xs: 2 }}>
          <TextField
            type="text"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Button variant="contained" style={{color: "white", backgroundColor: "#1976d2"}} onClick={() => sendPasswordReset(email)}>Send reset email</Button>
        </Stack>
        <br />
        <Link className="ui-link" to="/register" >Don't have an account?</Link>
      </Paper>
    </Box>
  )
};

export default Reset;