import { Box, Stack } from "@mui/material";
import { useCallback, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DisplayPost from "../components/DisplayPost";
import UsePostSearch from "../components/UsePostSearch";
import CreatePost from "../components/CreatePost";
import HomeHeader from "../components/HomeHeader";
import FilterPost from "../components/FilterPost";

function Home() {
  const [category, setCategory] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  // Custom hook for fetching posts
  const { loading, error, posts, hasMore } = UsePostSearch(
    category,
    pageNumber
  );

  console.log(posts);

  const navigate = useNavigate();

  // Whenever user changes category or query, reset to page 1 and clear posts
  // (We'll do the clearing in the custom hook or right here, depending on your design)
  useEffect(() => {
    setPageNumber(1);
  }, [category]);

  // IntersectionObserver setup
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return; // If still fetching, don't attach a new observer
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

  // If you want to avoid rendering any posts before data arrives, you can do:
  if (loading && posts.length === 0) {
    return (
      <>
        <HomeHeader />
        <Box sx={{ paddingTop: "10vh" }}>Loading initial data...</Box>
      </>
    );
  }

  return (
    <>
      <HomeHeader />

      <Box sx={{ paddingTop: "10vh" }}>
        <FilterPost
          category={category}
          setCategory={setCategory}
          setPageNumber={setPageNumber}
        />

        <Stack gap="10px" marginX="auto" width="60vw">
          {posts.map((post, index) => {
            const isLastPost = index === posts.length - 1;
            return (
              <div key={post.ID} ref={isLastPost ? lastPostElementRef : null}>
                <DisplayPost post={post} />
              </div>
            );
          })}
        </Stack>

        {loading && <div>Loading more...</div>}
        {error && <div style={{ color: "red" }}>Error loading posts!</div>}

        <CreatePost />
      </Box>
    </>
  );
}

export default Home;
