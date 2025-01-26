import { useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Post } from "../types/Post";
import GetAvatar from "./GetAvatar";
import DisplayFullPost from "./DisplayFullPost";
import DisplayPostCategories from "./DisplayPostCategories";
import EditPost from "./EditPost";
import DeleteItem from "./DeleteItem";

interface Props {
  post: Post;
}

const DisplayPost: React.FC<Props> = ({ post }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showFullPost, setShowFullPost] = useState(false);
  // Toggle the edit modal
  const [editPostOpen, setEditPostOpen] = useState(false);

  const openMenu = Boolean(anchorEl);
  const maxChar = 200;

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card sx={{ width: "100%" }}>
        <CardContent>
          <Grid2 container direction="row" alignItems="center" spacing={2}>
            <Grid2>
              <GetAvatar user={post.user} />
            </Grid2>
            <Grid2>
              <Typography variant="h6">
                {post.user?.name || "Anonymous"}
              </Typography>
            </Grid2>
          </Grid2>
          <DisplayPostCategories post={post} />

          <Typography variant="h5" sx={{ marginTop: 1 }}>
            {post.title}
          </Typography>

          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {post.content
              ? post.content.length > maxChar
                ? post.content.substring(0, maxChar) + "..."
                : post.content
              : "(No content)"}
          </Typography>
        </CardContent>

        <CardActions>
          <Button size="large" onClick={() => setShowFullPost(true)}>
            Read
          </Button>

          <Button size="small" onClick={handleMenuClick}>
            Options
          </Button>
          <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                setEditPostOpen(true); // Toggle the edit modal open
              }}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={() => DeleteItem(post)}>Delete</MenuItem>
          </Menu>
        </CardActions>
      </Card>

      {/* Full post view */}
      {showFullPost && (
        <DisplayFullPost post={post} onClose={() => setShowFullPost(false)} />
      )}

      {/* Edit modal - only render when editPostOpen is true */}
      {editPostOpen && (
        <EditPost
          post={post}
          open={editPostOpen}
          handleClose={() => setEditPostOpen(false)}
        />
      )}
    </>
  );
};

export default DisplayPost;
