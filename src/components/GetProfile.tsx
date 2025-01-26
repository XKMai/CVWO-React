import axios from "axios";
import { User } from "../types/User";
import axiosInstance from "./AxiosInstance";

export default async function GetProfile(): Promise<User | null> {
  const userID = localStorage.getItem("userID");

  // Handle case where userID is not found
  if (!userID) {
    console.error("No user ID found in localStorage");
    return null;
  }

  try {
    // Make an HTTP GET request to fetch the user profile
    const response = await axiosInstance.get<User>(
      `/api/protected/users/${userID}`
    );

    // Return the user profile
    const user: User = response.data;
    return user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
