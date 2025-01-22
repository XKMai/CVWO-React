import { Category, Filter } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Comment } from "../types/Comment";
import { Post } from "../types/Post";
const COMMENTS = [
  [
    {
      id: 1,
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
    },
  ],
];
export default function UseCommentSearch(post: Post, pageNumber: number) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    setComments((prevComments) => {
      return [...prevComments, ...COMMENTS[pageNumber]];
    });
    setHasMore(COMMENTS.length - 1 > pageNumber);
    setLoading(false);
    // axios({
    //   method: "GET",
    //   url: "https://openlibrary.org/search.json",
    //   params: { q: query, page: pageNumber, category: category },
    //   cancelToken: new axios.CancelToken((c) => (cancel = c)),
    // })
    //   .then((res) => {
    //     setComments((prevComments) => {
    //       return [...prevComments, ...res.data.docs];
    //     });
    //     setHasMore(res.data.docs.length > 0);
    //     setLoading(false);
    //     console.log(res.data);
    //   })
    //   .catch((e) => {
    //     if (axios.isCancel(e)) return setError(true);
    //   });
  }, [pageNumber]);
  return { loading, error, comments, hasMore };
}
