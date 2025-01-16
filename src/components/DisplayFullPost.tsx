//Displays the entire post after clicking on it

import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";
import { Post } from "../types/Post";
import GetAvatar from "./GetAvatar";
import { User } from "../types/User";
import { Height, WidthFull } from "@mui/icons-material";
import DisplayPostCategories from "./DisplayPostCategories";

interface Props {
  post: Post;
  onClose: () => void;
}

export default function DisplayFullPost({ post, onClose }: Props) {
  const user = post.user;

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Grid2 container alignItems="center" justifyContent="space-between">
          <Grid2 container direction="row" alignItems="center">
            <Grid2>
              <GetAvatar user={user} />
            </Grid2>
            <Grid2 paddingLeft="10px">
              <Typography variant="h6">{user.name}</Typography>
            </Grid2>
          </Grid2>

          <IconButton onClick={onClose} sx={{ width: "20px", height: "20px" }}>
            <img
              src="public\Close Icon.png"
              alt="close"
              style={{ width: "20px", height: "20px" }}
            />
          </IconButton>
        </Grid2>
      </DialogTitle>
      <DialogContent>
        <DisplayPostCategories post={post} />
        <Typography variant="h5">{post.title}</Typography>
        {post.picture && (
          <Box
            sx={{
              width: "100%",
              height: "auto",
              marginTop: "16px",
            }}
            component="img"
            src={post.picture}
            alt="Post"
          />
        )}
        <Typography variant="body1" sx={{ marginTop: "16px" }}>
          {post.content}
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
