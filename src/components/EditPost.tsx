import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axiosInstance from "./AxiosInstance";
import { Post } from "../types/Post";

interface EditPostProps {
  post: Post;
  open: boolean;
  handleClose: () => void;
}

export default function EditPost({ post, open, handleClose }: EditPostProps) {
  const [title, setTitle] = useState(post?.title || "");
  // 1. Store categories as a single text string, joined by space
  const [categoriesField, setCategoriesField] = useState<string>(
    (post?.category || []).join(" ")
  );
  const [content, setContent] = useState(post?.content || "");

  const handleSave = () => {
    // 3. Convert the string back into an array of tags before sending
    const categoryArray = categoriesField.split(" ").filter(Boolean);

    axiosInstance
      .put(`/api/protected/posts/${post.ID}`, {
        title,
        content,
        category: categoryArray,
      })
      .then((response) => {
        console.log("Edit post response:", response);
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
          Edit Post
        </Typography>

        {/* Title Field */}
        <Typography>Title:</Typography>
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />

        {/* 2. Categories as a single text field */}
        <Typography>Categories (separated by space):</Typography>
        <TextField
          fullWidth
          value={categoriesField}
          onChange={(e) => setCategoriesField(e.target.value)}
          margin="normal"
        />

        {/* Content Field */}
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

        {/* Save Button */}
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
