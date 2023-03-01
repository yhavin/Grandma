import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase.config";
import { TextField, Button } from "@material-ui/core";
import { Stack } from '@mui/material/';

const Reset = ()  => {
  const [email, setEmail] = useState("");
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
        <Button variant="contained" color="primary" onClick={() => sendPasswordReset(email)}>Send reset email</Button>
      </Stack>
      <div>
        <Link to="/register">Don't have an account?</Link>
      </div>
    </div>
  )
};

export default Reset;