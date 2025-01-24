import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import header from "../components/Header";
import { AspectRatio, Margin, Padding } from "@mui/icons-material";
import SignUp from "../components/SignUp";
import { Navigate, NavLink, redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", { username, password });
      console.log("Login success:", response.data);

      // Redirect to profile or home page on successful login
      navigate("/home");
    } catch (err: any) {
      setError("Invalid credentials. Please try again.");
    }
  };

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
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="Name"
                type="name"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid style={{ width: "30%" }} sx={{ mb: 0 }}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
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
                onClick={handleLogin}
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
