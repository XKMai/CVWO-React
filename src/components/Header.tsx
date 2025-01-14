import { Box, CssBaseline } from "@mui/material";

export default function header() {
  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          width: "100vw",
          height: "10vh",
          bgcolor: "#0077B6",
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          color: "white",
        }}
      >
        Header
      </Box>
    </>
  );
}
