import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GetAvatar from "./GetAvatar";
import { useState } from "react";
import Logout from "./Logout";

export default function HomeHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    Logout();
  };
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
          color: "white",
          position: "fixed",
          zIndex: "1",
        }}
      >
        <img
          src="public/MaiSpace.png"
          style={{ width: "Auto", height: "Auto" }}
        />
        <IconButton onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
        {/* <GetAvatar user={GetUser} /> Need to get info of User */}
      </Box>
    </>
  );
}
