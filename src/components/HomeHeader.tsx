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
import { useNavigate } from "react-router-dom";
import GetAvatar from "./GetAvatar";
import GetProfile from "./GetProfile";
import { User } from "../types/User";

export default function HomeHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  // Open/Close the menu
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  // Logout logic
  const handleLogout = () => {
    // Close the menu first
    setAnchorEl(null);

    // Clear JWT tokens
    localStorage.setItem("authToken", "");
    localStorage.setItem("refreshToken", "");
    localStorage.setItem("userID", "");

    // Redirect to login page
    navigate("/login");
  };

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await GetProfile();
        setUser(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
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

        {/* Spacer to push the avatar and menu button to the right */}
        <Box sx={{ flexGrow: 1 }} />

        {loading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <GetAvatar user={user} />
        )}

        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </>
  );
}
