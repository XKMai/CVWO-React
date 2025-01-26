//Displays a popup with all the details of a User

import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { User } from "../types/User";
import GetAvatarUnclickable from "./GetAvatarUnclickable";

interface Props {
  user: User; // User details to display
  onClose: () => void; // Function to handle dialog closure
}

export default function DisplayUser({ user, onClose }: Props) {
  return (
    <Dialog
      open={true}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      aria-labelledby="user-dialog-title"
      aria-describedby="user-dialog-description"
    >
      <DialogTitle id="user-dialog-title">
        <Grid2 container justifyContent="space-between" alignItems="center">
          <Typography variant="h6">User Details</Typography>
          <IconButton onClick={onClose} aria-label="close"></IconButton>
        </Grid2>
      </DialogTitle>
      <DialogContent id="user-dialog-description">
        <Grid2 container direction="row" alignItems="center" spacing={2}>
          <Grid2>
            <GetAvatarUnclickable user={user} />
          </Grid2>
          <Grid2>
            <Typography variant="h5">{user.name || "Anonymous"}</Typography>
          </Grid2>
        </Grid2>
        <Typography
          variant="body1"
          sx={{ marginTop: 2, whiteSpace: "pre-line" }}
        >
          {user.description || "No description available."}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
