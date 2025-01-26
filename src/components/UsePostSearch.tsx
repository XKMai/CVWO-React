import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../types/Post";
import axiosInstance from "./AxiosInstance";

export default function UsePostSearch(category: string, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    // Clear old results whenever category changes
    setPosts([]);
  }, [category]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axiosInstance
      .get<Post[]>("/api/protected/posts/", {
        params: { category: category, page: pageNumber },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        console.log(res.data);
        setPosts((prevPosts) => [...prevPosts, ...res.data]);
        setHasMore(res.data.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel && cancel(); // Cleanup on unmount or dependency change
  }, [category, pageNumber]);

  return { loading, error, posts, hasMore };
}
