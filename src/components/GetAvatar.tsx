import { Avatar } from "@mui/material";
import { User } from "../types/User";
import DisplayUser from "./DisplayUser";
import { useState } from "react";

interface Props {
  user: User | null; // Allow null as a valid type for user
}

export default function GetAvatar({ user }: Props) {
  const [showDialog, setShowDialog] = useState(false);

  const handleAvatarClick = () => {
    if (user) {
      setShowDialog(true); // Only open the dialog if user exists
    }
  };

  return (
    <>
      <Avatar
        alt={user?.name || "Anonymous"} // Use optional chaining and a fallback
        sx={{
          bgcolor: user ? "blue" : "gray", // Gray background if user is null
          cursor: user ? "pointer" : "not-allowed", // Disable click if user is null
        }}
        onClick={handleAvatarClick}
      >
        {user?.name ? user.name.slice(0, 2).toUpperCase() : "?"}{" "}
        {/* Fallback to "?" */}
      </Avatar>
      {showDialog && user && (
        <DisplayUser user={user} onClose={() => setShowDialog(false)} />
      )}
    </>
  );
}
