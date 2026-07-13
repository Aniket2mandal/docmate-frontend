import { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "../api/BackendApi";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const response = await getUserProfile();

        if (response.data?.status) {
          setProfile(response.data.data);
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);