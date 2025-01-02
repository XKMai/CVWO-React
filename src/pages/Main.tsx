import { Stack } from "@mui/material";
import PostCard from "../components/PostCard";
import CreateCard from "../components/CreateCard";

const POSTS = [
  {
    name: "bob",
    text: "apple",
  },
  {
    name: "alice",
    text: "pear",
  },
  {
    name: "carl",
    text: "orange",
  },
  {
    name: "richard",
    text: "mango",
  },
];

function Home() {
  return (
    <>
      <Stack gap={"10px"} marginX={"auto"} width={"60vw"}>
        {POSTS.map(({ name, text }) => (
          <PostCard name={name} text={text} />
        ))}
      </Stack>
      <CreateCard />
    </>
  );
}

export default Home;
