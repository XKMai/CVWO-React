import axios from "axios";
import React, { useEffect, useState } from "react";

interface ProfileData {
  message: string;
}

export default function GetProfile() {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile");
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchProfile();
  }, []);

  return profileData;
}
