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
          alignContent: "left",
          justifyContent: "left",
          display: "flex",
          color: "white",
        }}
      >
        <img src="MaiSpace.png" style={{ width: "Auto", height: "Auto" }} />
      </Box>
    </>
  );
}
