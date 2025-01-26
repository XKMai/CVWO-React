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
  const [pageNumber, setPageNumber] = useState(1); // Start at page 1
  const { loading, error, comments, hasMore } = UseCommentSearch(
    post.ID,
    pageNumber
  );

  // Infinite scroll logic with IntersectionObserver
  const observer = useRef<IntersectionObserver | null>(null);
  const lastCommentRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
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
        {/* Map over comments, attach ref to the last one */}
        {comments.map((comment, index) => {
          const isLastComment = index === comments.length - 1;
          return (
            <div
              key={comment.ID}
              ref={isLastComment ? lastCommentRef : undefined}
            >
              <DisplayComment comment={comment} />
            </div>
          );
        })}
      </DialogContent>
      <DialogActions>
        <CreateComment post_id={post.ID} />
      </DialogActions>
    </Dialog>
  );
}
