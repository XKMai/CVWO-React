//Displays a single post for the stream of posts

import {
  Button,
  CardActions,
  Chip,
  Grid2,
  Menu,
  MenuItem,
} from "@mui/material";
import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { User } from "../types/User";
import { Post } from "../types/Post";
import GetAvatar from "./GetAvatar";
import DisplayFullPost from "./DisplayFullPost";
import DisplayPostCategories from "./DisplayPostCategories";

interface Props {
  post: Post;
}

const DisplayPost: React.FC<Props> = ({ post }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showFullPost, setShowFullPost] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const maxChar = 200; //To limit number of characters in post

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
          <Typography variant="h5">{post.title}</Typography>

          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {post.content.length > maxChar
              ? post.content.substring(0, maxChar) + "..."
              : post.content}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" onClick={() => setShowFullPost(true)}>
            Read
          </Button>
          <Button size="small" onClick={handleClick}>
            Options
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
          </Menu>
        </CardActions>
      </Card>
      {showFullPost && (
        <DisplayFullPost post={post} onClose={() => setShowFullPost(false)} />
      )}
    </>
  );
};
export default DisplayPost;
