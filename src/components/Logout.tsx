import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear cookies (JWT tokens)
    document.cookie = "accessToken=; Max-Age=0; path=/"; // Clear accessToken
    document.cookie = "refreshToken=; Max-Age=0; path=/"; // Clear refreshToken

    // Optionally, you can log out from axios or any other state management
    // Redirect to login page
    navigate("/login");
  };

  return (
    <Button variant="outlined" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
