import { TextField } from "@mui/material";

export default function FilterPost(
  category: string,
  setCategory: (category: string) => void,
  setPageNumber: (pageNumber: number) => void
) {
  return (
    <>
      <TextField
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setPageNumber(1);
        }}
        sx={{ position: "fixed" }}
      ></TextField>
    </>
  );
}
