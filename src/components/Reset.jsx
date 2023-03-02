import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, sendPasswordReset } from "../firebase.config";
import { TextField, Button } from "@material-ui/core";
import { Stack, Dialog, DialogContent, DialogTitle, Link } from '@mui/material/';

const Reset = ({ resetOpen, setResetOpen, setRegisterOpen })  => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/recipes");
  }, [user, loading]);

  return (
    <Dialog open={resetOpen} onClose={() => setResetOpen(false)} fullWidth>
      <DialogTitle>Reset your password</DialogTitle>
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
          <Button variant="contained" style={{color: "white", backgroundColor: "#1976d2"}} onClick={() => sendPasswordReset(email)}>Send reset email</Button>
        </Stack>
        <br />
        <Link style={{ cursor: "pointer" }} underline="hover" onClick={() => {setResetOpen(false); setRegisterOpen(true)}}>Don't have a Grandma account?</Link>
      </DialogContent>
    </Dialog>
  )
};

export default Reset;