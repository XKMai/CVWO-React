import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../types/Post";

export default function UsePostSearch(
  query: string,
  pageNumber: number,
  category: string
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPosts([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios
      .get<{ docs: Post[] }>("/api/protected/posts/", {
        params: { category: category, page: pageNumber },
        cancelToken: new axios.CancelToken((c) => (cancel = c)),
      })
      .then((res) => {
        const docs = res.data?.docs || []; // Fallback to empty array if docs is undefined
        setPosts((prevPosts) => [...prevPosts, ...docs]);
        setHasMore(docs.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel && cancel(); // Cleanup on unmount or dependency change
  }, [query, pageNumber, category]);

  return { loading, error, posts, hasMore };
}
