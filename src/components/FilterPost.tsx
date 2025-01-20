import { TextField } from "@mui/material";

export default function FilterPost(
  category: string,
  setCategory: (category: string) => void
) {
  return (
    <>
      <TextField
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      ></TextField>
    </>
  );
}
