import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState } from "react";
import axiosInstance from "./AxiosInstance";

interface Props {
  post_id: number;
}

const CreateComment: React.FC<Props> = ({ post_id }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState("");

  const userID = parseInt(localStorage.getItem("userID"));

  const handleClick = () => {
    axiosInstance
      .post("/api/protected/comments", {
        content: content,
        post_id: post_id,
        user_id: userID,
      })
      .then((r) => {
        console.log(r);
        handleClose();
      })
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
