import { Category, Filter } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function UsePostSearch(
  query: string,
  pageNumber: number,
  category: string
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [posts, setPosts] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPosts([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "https://openlibrary.org/search.json",
      params: { q: query, page: pageNumber, category: category },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPosts((prevPosts) => {
          return [...prevPosts, ...res.data.docs];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
        console.log(res.data);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return setError(true);
      });
  }, [query, pageNumber]);
  return { loading, error, posts, hasMore };
}
