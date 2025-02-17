import {
  Button,
  Fab,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import UploadButton from "./UploadButton";
import axiosInstance from "./AxiosInstance";

//Used to create a card, includes button and popup

export default function CreatePost() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const formData = new FormData();
  const handleClick = () => {
    if (!formData.has("picture")) {
      formData.append("picture", "");
    }
    const userID = localStorage.getItem("userID");
    const data = {
      picture: "",
      category,
      title,
      content,
      user_id: parseInt(userID, 10),
    };
    console.log(data);
    const response = axiosInstance
      .post("/api/protected/posts", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        handleClose();
      })
      .catch((err) => console.log(err)); //Post request to posts
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{ position: "fixed", bottom: "10vh", left: "10vh" }}
      >
        <AddIcon />
      </Fab>
      <Modal open={open} onClose={handleClose} sx={{ padding: "50px" }}>
        <Paper sx={{ height: "100%" }} elevation={3}>
          <Typography>Title:</Typography>
          <TextField
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></TextField>
          <Typography>
            Categories:(In the form of Category1 Category2)
          </Typography>
          <TextField
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          ></TextField>
          <Typography gutterBottom>Content:</Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            maxRows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></TextField>
          {UploadButton(formData)}
          <Button onClick={handleClick}>Post</Button>
        </Paper>
      </Modal>
    </>
  );
}
