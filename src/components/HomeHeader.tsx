import {
  Box,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState, useEffect } from "react";
import Logout from "./Logout";
import GetAvatar from "./GetAvatar";
import GetProfile from "./GetProfile";
import { User } from "../types/User";

export default function HomeHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add a loading state

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    Logout();
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await GetProfile(); // Fetch the user profile
        setUser(profile); // Set the fetched user
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false); // Stop loading after fetching is complete
      }
    };
    fetchUser();
  }, []);

  const open = Boolean(anchorEl);

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
          alignItems: "center",
          color: "white",
          position: "fixed",
          zIndex: "1",
          px: 2,
        }}
      >
        <img
          src="public/MaiSpace.png"
          alt="MaiSpace Logo"
          style={{ height: "100%" }}
        />
        <Box sx={{ flexGrow: 1 }} />
        {loading ? (
          // Show a loading indicator while the user is being fetched
          <CircularProgress color="inherit" size={24} />
        ) : (
          // Conditionally render the GetAvatar component only when user is available
          <GetAvatar user={user} />
        )}
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Box>
    </>
  );
}
