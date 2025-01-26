import { Chip, Grid2, Typography } from "@mui/material";

interface Post {
  category?: string[]; // category might be undefined
}

interface Props {
  post: Post;
}

export default function DisplayPostCategories({ post }: Props) {
  return (
    <>
      {post.category && post.category[0] != "" && post.category.length > 0 ? (
        <Grid2
          container
          direction="row"
          alignItems="center"
          spacing={2}
          marginTop={"10px"}
          marginBottom={"10px"}
        >
          {post.category.map((category) => (
            <Grid2 key={category}>
              <Chip label={category} />
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <></>
      )}
    </>
  );
}
