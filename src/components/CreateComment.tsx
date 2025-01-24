import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Post } from "../types/Post";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState } from "react";
import axios from "axios";
import GetAvatar from "./GetAvatar";

interface Props {
  post: Post;
}

const CreateComment: React.FC<Props> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState("");
  const handleClick = () => {
    axios
      .post("/comment", { post: post, content: content })
      .then()
      .catch((err) => {
        return console.error(err);
      });
  };
  return (
    <>
      <IconButton onClick={handleOpen}>
        <ReplyIcon />
      </IconButton>
      {/* <Modal
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{ maxWidth: "md" }}
      >
        <Paper sx={{ display: "flex", height: "100%" }}>
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
        </Paper>
      </Modal> */}

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>
          <Typography gutterBottom variant="h6">
            Enter a Comment:
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            maxRows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClick}>Post</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateComment;
