//Displays the entire post after clicking on it

import {
  Box,
  Dialog,
  DialogActions,
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
import CreateComment from "./CreateComment";
import UseCommentSearch from "./UseCommentSearch";
import { useCallback, useRef, useState } from "react";
import DisplayComment from "./DisplayComment";

interface Props {
  post: Post;
  onClose: () => void;
}

export default function DisplayFullPost({ post, onClose }: Props) {
  const user = post.user;
  const [pageNumber, setPageNumber] = useState(0);
  const { loading, error, comments, hasMore } = UseCommentSearch(
    post,
    pageNumber
  );

  const observer = useRef<IntersectionObserver | null>(null); // Type useRef for IntersectionObserver
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      // Type the node parameter
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });

      if (node) observer.current.observe(node); // Observe the node
    },
    [loading, hasMore]
  );

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
            alt="Picture"
          />
        )}
        <Typography variant="body1" sx={{ marginTop: "16px" }}>
          {post.content}
        </Typography>
        {comments.map((comment, index) => {
          // If this is the last comment, assign the observer ref
          if (comments.length === index + 1) {
            return (
              <div ref={lastPostElementRef} key={comment.id}>
                <DisplayComment comment={comment} />
              </div>
            );
          } else {
            return (
              <div key={post.id}>
                <DisplayComment comment={comment} />
              </div>
            );
          }
        })}
      </DialogContent>
      <DialogActions>
        <CreateComment post={post} />
      </DialogActions>
    </Dialog>
  );
}
