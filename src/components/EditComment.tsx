import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axiosInstance from "./AxiosInstance";
import { Comment } from "../types/Comment";

export default function EditComment(comment: Comment) {
  const [content, setContent] = useState<string>(comment?.content || "");
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  const handleSave = () => {
    axiosInstance
      // pass updated content to your endpoint
      .put(`/api/protected/comments/${comment.ID}`, { content })
      .then((response) => {
        console.log(response);
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ padding: "50px" }}>
      <Paper
        sx={{ padding: "20px", maxWidth: "500px", margin: "auto" }}
        elevation={3}
      >
        <Typography variant="h6" gutterBottom>
          Edit Comment
        </Typography>
        <Typography>Content:</Typography>
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
  );
}
