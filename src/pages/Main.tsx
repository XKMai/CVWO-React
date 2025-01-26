import { Box, Stack } from "@mui/material";
import DisplayPost from "../components/DisplayPost";
import UsePostSearch from "../components/UsePostSearch";
import { useCallback, useRef, useState } from "react";
import CreatePost from "../components/CreatePost";
import { useNavigate } from "react-router-dom";
import HomeHeader from "../components/HomeHeader";
import FilterPost from "../components/FilterPost";

function Home() {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const { loading, error, posts, hasMore } = UsePostSearch(
    query,
    pageNumber,
    category
  );
  const navigate = useNavigate();

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
    <>
      {HomeHeader()}
      <Box sx={{ paddingTop: "10vh" }}>
        {FilterPost(category, setCategory, setPageNumber)}
        <Stack gap={"10px"} marginX={"auto"} width={"60vw"}>
          {posts.map((post, index) => {
            // If this is the last post, assign the observer ref
            if (posts.length === index + 1) {
              return (
                <div ref={lastPostElementRef} key={post.ID}>
                  <DisplayPost post={post} />
                </div>
              );
            } else {
              return (
                <div key={post.ID}>
                  <DisplayPost post={post} />
                </div>
              );
            }
          })}
        </Stack>
        <CreatePost />
      </Box>
    </>
  );
}

export default Home;
