import { Category, Filter } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Comment } from "../types/Comment";
import { Post } from "../types/Post";

export default function UseCommentSearch(postID: number, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    // setComments((prevComments) => {
    //   return [...prevComments, ...COMMENTS[pageNumber]];
    // });
    // setHasMore(COMMENTS.length - 1 > pageNumber);
    // setLoading(false);
    axios({
      method: "GET",
      url: "/api/protected/comments/",
      params: { page: pageNumber, postID: postID },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setComments((prevComments) => {
          return [...prevComments, ...res.data.docs];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return setError(true);
      });
  }, [pageNumber]);
  return { loading, error, comments, hasMore };
}
