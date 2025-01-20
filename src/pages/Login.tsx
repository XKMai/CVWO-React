import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import header from "../components/Header";
import { AspectRatio, Margin, Padding } from "@mui/icons-material";
import SignUp from "../components/SignUp";
import { Navigate, NavLink, redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

function Login() {
  const navigate = useNavigate();

  return (
    <>
      {header()}
      <Grid
        container
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box height="90vh" width="50%" overflow={"hidden"}>
          <img src="public\Mountain.webp" style={{ height: "100%" }} />
        </Box>
        <Box height="90vh" width="50%">
          <Grid
            container
            height={"100%"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid style={{ width: "30%" }} sx={{ mb: 2 }}>
              <Typography align="left" fontSize={34}>
                Login
              </Typography>
            </Grid>
            <Grid style={{ width: "30%" }} sx={{ mb: 2 }}>
              <TextField label="Username" variant="outlined" fullWidth />
            </Grid>
            <Grid style={{ width: "30%" }} sx={{ mb: 0 }}>
              <TextField label="Password" variant="outlined" fullWidth />
            </Grid>
            <Grid
              style={{ width: "30%" }}
              sx={{ mb: 2 }}
              justifyContent={"space-between"}
              container
              alignItems={"center"}
            >
              {SignUp()}
              <Button>Forget Password?</Button>
            </Grid>
            <Grid style={{ width: "30%" }}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => Login()}
                // onClick={() => {
                //   navigate("/home");
                // }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default Login;
