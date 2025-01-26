import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axiosInstance from "./AxiosInstance";
import GetProfile from "./GetProfile";
import { User } from "../types/User";

// Used to edit a comment, includes button and popup

export default function EditProfile() {
  const [user, setUser] = useState<User | null>(null);
  GetProfile().then((profile) => setUser(profile));
  const [content, setContent] = useState(user.description || "");
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    axiosInstance
      .put(`/api/protected/comments/${user.ID}`)
      .then((response) => {
        console.log(response);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} sx={{ padding: "50px" }}>
        <Paper
          sx={{ padding: "20px", maxWidth: "500px", margin: "auto" }}
          elevation={3}
        >
          <Typography variant="h6" gutterBottom>
            Edit Profile
          </Typography>
          <Typography>Description:</Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            maxRows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            sx={{ marginTop: "20px" }}
          >
            Save
          </Button>
        </Paper>
      </Modal>
    </>
  );
}
