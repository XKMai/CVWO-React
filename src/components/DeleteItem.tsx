import { IconButton } from "@mui/material";
import { Post } from "../types/Post";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { Comment } from "../types/Comment";

interface Props {
  item: Post | Comment;
}

function isPost(item: Post | Comment): item is Post {
  return (item as Post).title !== undefined;
}

const DeleteItem: React.FC<Props> = ({ item }) => {
  const handleClick = () => {
    if (isPost(item)) {
      axios.delete(`/api/protected/posts/${item.ID}`);
    } else {
      axios.delete(`/api/protected/comments/${item.ID}`);
    }
  };
  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
    </>
  );
};

export default DeleteItem;
