import {
  Box,
  Button,
  Fab,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

export default function CreateCard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = () => console.log("Click");

  return (
    <>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <Modal open={open} onClose={handleClose} sx={{ padding: "50px" }}>
        <Paper sx={{ height: "100%" }} elevation={3}>
          <Typography gutterBottom>Enter Text Below:</Typography>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            maxRows={6}
          ></TextField>
          <Button onClick={handleClick}>Post</Button>
        </Paper>
      </Modal>
    </>
  );
}
