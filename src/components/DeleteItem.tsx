import { Post } from "../types/Post";
import axios from "axios";
import { Comment } from "../types/Comment";

interface Props {
  item: Post | Comment;
}

function isPost(item: Post | Comment): item is Post {
  return (item as Post).title !== undefined;
}

export default function DeleteItem(item) {
  if (isPost(item)) {
    axios.delete(`/api/protected/posts/${item.ID}`);
  } else {
    axios.delete(`/api/protected/comments/${item.ID}`);
  }
}
