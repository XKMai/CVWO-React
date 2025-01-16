import { Stack } from "@mui/material";
import DisplayPost from "../components/DisplayPost";
import UsePostSearch from "../components/UsePostSearch";
import { useCallback, useRef, useState } from "react";
import { Description } from "@mui/icons-material";
import CreatePost from "../components/CreatePost";
import header from "../components/Header";

const POSTS = [
  {
    id: 1,
    title: "Understanding Golang Structs",
    content: "Golang structs are powerful and flexible...",
    category: ["Programming", "Golang", "Tutorials"],
    userId: 1,
    user: {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "User",
      password: "password",
      description: "test",
      picture: "",
    },
    dateTime: "2025-01-14T10:30:00Z",
    score: 12,
    picture: "",
  },
  {
    id: 2,
    title: "Understanding Golang Structs",
    content: "Golang structs are powerful and flexible...",
    category: ["Programming", "Golang", "Tutorials"],
    userId: 1,
    user: {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "User",
      password: "password",
      description: "test",
      picture: "",
    },
    dateTime: "2025-01-14T10:30:00Z",
    score: 12,
    picture: "",
  },
  {
    id: 3,
    title: "Understanding Golang Structs",
    content: "Golang structs are powerful and flexible...",
    category: ["Programming", "Golang", "Tutorials"],
    userId: 1,
    user: {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "User",
      password: "password",
      description: "test",
      picture: "",
    },
    dateTime: "2025-01-14T10:30:00Z",
    score: 12,
    picture: "",
  },
  {
    id: 4,
    title: "Understanding Golang Structs",
    content: "Golang structs are powerful and flexible...",
    category: ["Programming", "Golang", "Tutorials"],
    userId: 1,
    user: {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "User",
      password: "password",
      description: "test",
      picture: "",
    },
    dateTime: "2025-01-14T10:30:00Z",
    score: 12,
    picture: "",
  },
];
function Home() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { loading, error, posts, hasMore } = UsePostSearch(
    query,
    pageNumber,
    ""
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
          }
        },
        { threshold: 1 }
      ).observe(node as Element);
      if (node) {
        if (observer.current) {
          observer.current.observe(node);
        }
      }
      console.log(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <>
      {header()}
      {posts.map((book, index) => {
        if (posts.length === index + 1) {
          return (
            <div ref={lastPostElementRef} key={book}>
              {book}
            </div>
          );
        }
        return (
          <div ref={lastPostElementRef} key={book}>
            {book}
          </div>
        );
      })}
      <Stack gap={"10px"} marginX={"auto"} width={"60vw"}>
        {POSTS.map((post) => (
          <DisplayPost post={post} key={post.id} />
        ))}
      </Stack>
      <CreatePost />
    </>
  );
  // return (
  //   <>
  //     <Stack gap={"10px"} marginX={"auto"} width={"60vw"}>
  //       <DisplayPost post={POSTS} />
  //     </Stack>
  //   </>
  // );
}

export default Home;
