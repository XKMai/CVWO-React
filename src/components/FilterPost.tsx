import { TextField, Button, Stack } from "@mui/material";
import React, { useState } from "react";

interface FilterPostProps {
  category: string;
  setCategory: (val: string) => void;
  setPageNumber: (val: number) => void;
}

export default function FilterPost({
  category,
  setCategory,
  setPageNumber,
}: FilterPostProps) {
  // local temp state for text field
  const [localValue, setLocalValue] = useState(category);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  };

  // only update parent state when "Search" is clicked
  const handleSearch = () => {
    setCategory(localValue);
    setPageNumber(1);
  };

  return (
    <Stack direction="column" spacing={2} sx={{ position: "fixed" }}>
      <TextField value={localValue} onChange={handleChange} label="Category" />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Stack>
  );
}
