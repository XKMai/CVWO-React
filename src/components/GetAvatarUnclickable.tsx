//Returns the small avatar of the user

import { Avatar } from "@mui/material";
import { User } from "../types/User";

interface Props {
  user: User;
}

export default function GetAvatarUnclickable({ user }: Props) {
  return (
    <>
      <Avatar
        alt={user.name || "Anonymous"}
        sx={{
          bgcolor: "blue",
          cursor: "pointer",
        }}
      >
        {user.name ? user.name.slice(0, 2).toUpperCase() : ""}
      </Avatar>
    </>
  );
}
