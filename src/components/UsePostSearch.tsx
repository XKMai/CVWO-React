import { Category, Filter } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Post } from "../types/Post";
const POSTS = [
  [
    {
      id: 1,
      title: "Exploring TypeScript Interfaces",
      content:
        "In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.",
      category: ["Programming", "TypeScript", "Tech"],
      userId: 101,
      user: {
        id: 101,
        role: "Author",
        name: "John Doe",
        password: "hashedpassword123",
        picture: "https://example.com/avatars/johndoe.png",
        description:
          "John is a software engineer with a passion for teaching others about TypeScript and web development.",
      },
      dateTime: "2025-01-21T14:30:00Z",
      score: 88,
      picture: "https://example.com/posts/1-image.jpg",
      comments: [],
    },
    {
      id: 2,
      title: "Exploring TypeScript Interfaces",
      content:
        "In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.",
      category: ["Programming", "TypeScript", "Tech"],
      userId: 101,
      user: {
        id: 101,
        role: "Author",
        name: "John Doe",
        password: "hashedpassword123",
        picture: "https://example.com/avatars/johndoe.png",
        description:
          "John is a software engineer with a passion for teaching others about TypeScript and web development.",
      },
      dateTime: "2025-01-21T14:30:00Z",
      score: 88,
      picture: "https://example.com/posts/1-image.jpg",
      comments: [],
    },
    {
      id: 3,
      title: "Exploring TypeScript Interfaces",
      content:
        "In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.",
      category: ["Programming", "TypeScript", "Tech"],
      userId: 101,
      user: {
        id: 101,
        role: "Author",
        name: "John Doe",
        password: "hashedpassword123",
        picture: "https://example.com/avatars/johndoe.png",
        description:
          "John is a software engineer with a passion for teaching others about TypeScript and web development.",
      },
      dateTime: "2025-01-21T14:30:00Z",
      score: 88,
      picture: "https://example.com/posts/1-image.jpg",
      comments: [],
    },
    {
      id: 4,
      title: "Exploring TypeScript Interfaces",
      content:
        "In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.",
      category: ["Programming", "TypeScript", "Tech"],
      userId: 101,
      user: {
        id: 101,
        role: "Author",
        name: "John Doe",
        password: "hashedpassword123",
        picture: "https://example.com/avatars/johndoe.png",
        description:
          "John is a software engineer with a passion for teaching others about TypeScript and web development.",
      },
      dateTime: "2025-01-21T14:30:00Z",
      score: 88,
      picture: "https://example.com/posts/1-image.jpg",
      comments: [],
    },
  ],
  [
    {
      id: 5,
      title: "Exploring TypeScript Interfaces",
      content:
        "In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.",
      category: ["Programming", "TypeScript", "Tech"],
      userId: 101,
      user: {
        id: 101,
        role: "Author",
        name: "John Doe",
        password: "hashedpassword123",
        picture: "https://example.com/avatars/johndoe.png",
        description:
          "John is a software engineer with a passion for teaching others about TypeScript and web development.",
      },
      dateTime: "2025-01-21T14:30:00Z",
      score: 88,
      picture: "https://example.com/posts/1-image.jpg",
      comments: [],
    },
    {
      id: 6,
      title: "Exploring TypeScript Interfaces",
      content:
        "In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.",
      category: ["Programming", "TypeScript", "Tech"],
      userId: 101,
      user: {
        id: 101,
        role: "Author",
        name: "John Doe",
        password: "hashedpassword123",
        picture: "https://example.com/avatars/johndoe.png",
        description:
          "John is a software engineer with a passion for teaching others about TypeScript and web development.",
      },
      dateTime: "2025-01-21T14:30:00Z",
      score: 88,
      picture: "https://example.com/posts/1-image.jpg",
      comments: [],
    },
    {
      id: 7,
      title: "Exploring TypeScript Interfaces",
      content:
        "In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.",
      category: ["Programming", "TypeScript", "Tech"],
      userId: 101,
      user: {
        id: 101,
        role: "Author",
        name: "John Doe",
        password: "hashedpassword123",
        picture: "https://example.com/avatars/johndoe.png",
        description:
          "John is a software engineer with a passion for teaching others about TypeScript and web development.",
      },
      dateTime: "2025-01-21T14:30:00Z",
      score: 88,
      picture: "https://example.com/posts/1-image.jpg",
      comments: [],
    },
    {
      id: 8,
      title: "Exploring TypeScript Interfaces",
      content:
        "In this post, we'll dive into how to use TypeScript interfaces for better type safety and code clarity.",
      category: ["Programming", "TypeScript", "Tech"],
      userId: 101,
      user: {
        id: 101,
        role: "Author",
        name: "John Doe",
        password: "hashedpassword123",
        picture: "https://example.com/avatars/johndoe.png",
        description:
          "John is a software engineer with a passion for teaching others about TypeScript and web development.",
      },
      dateTime: "2025-01-21T14:30:00Z",
      score: 88,
      picture: "https://example.com/posts/1-image.jpg",
      comments: [],
    },
  ],
];
export default function UsePostSearch(
  query: string,
  pageNumber: number,
  category: string
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setPosts([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    setPosts((prevPosts) => {
      return [...prevPosts, ...POSTS[pageNumber]];
    });
    setHasMore(POSTS.length - 1 > pageNumber);
    setLoading(false);
    // axios({
    //   method: "GET",
    //   url: "https://openlibrary.org/search.json",
    //   params: { q: query, page: pageNumber, category: category },
    //   cancelToken: new axios.CancelToken((c) => (cancel = c)),
    // })
    //   .then((res) => {
    //     setPosts((prevPosts) => {
    //       return [...prevPosts, ...res.data.docs];
    //     });
    //     setHasMore(res.data.docs.length > 0);
    //     setLoading(false);
    //     console.log(res.data);
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return setError(true);
    //   });
  }, [query, pageNumber]);
  return { loading, error, posts, hasMore };
}
