import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";

export default function SignUp() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const postUser = () => {
    axios
      .post("./api/auth/register", { name: name, password: password })
      .then((response) => {
        handleClose();
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          You have successfully registered!
        </Alert>;
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Button onClick={handleClickOpen}>Sign Up</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Username and Password here to sign up.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={(event) => setPassword(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={postUser}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
