//Returns the small avatar of the user

import { Avatar } from "@mui/material";
import { User } from "../types/User";
import DisplayUser from "./DisplayUser";
import { useState } from "react";

interface Props {
  user: User;
}

export default function GetAvatar({ user }: Props) {
  const [showDialog, setShowDialog] = useState(false);

  const handleAvatarClick = () => {
    setShowDialog(true);
  };

  return (
    <>
      <Avatar
        alt={user.name || "Anonymous"}
        sx={{
          bgcolor: "blue",
          cursor: "pointer",
        }}
        src={user.picture || undefined}
        onClick={handleAvatarClick}
      >
        {!user.picture && user.name ? user.name.slice(0, 2).toUpperCase() : ""}
      </Avatar>
      {showDialog && (
        <DisplayUser user={user} onClose={() => setShowDialog(false)} />
      )}
    </>
  );
}
