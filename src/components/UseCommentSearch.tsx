import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "./AxiosInstance";
import { Comment } from "../types/Comment";

/**
 * Custom hook to load comments for a given postID, with pagination (pageNumber).
 */
export default function UseCommentSearch(postID: number, pageNumber: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasMore, setHasMore] = useState(false);

  // Whenever the post changes, reset comments so we don't mix them
  useEffect(() => {
    setComments([]);
  }, [postID]);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel: (() => void) | undefined;
    axiosInstance
      .get<Comment[]>("/api/protected/comments", {
        params: { post_id: postID, page: pageNumber },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        // Append new comments to existing ones
        setComments((prev) => [...prev, ...res.data]);
        // If we got some data back, assume more might exist
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return; // Request was canceled
        setError(true);
      });

    // Cleanup the request on component unmount or effect re-run
    return () => {
      if (cancel) cancel();
    };
  }, [postID, pageNumber]);

  return { loading, error, comments, hasMore };
}
