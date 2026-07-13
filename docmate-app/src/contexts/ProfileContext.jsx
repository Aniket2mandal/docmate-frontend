import { createContext, useContext, useState, useEffect } from "react";
import { getUserProfile } from "../api/BackendApi";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const loadProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const response = await getUserProfile();

      if (response.data.status) {
        setProfile(response.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        loadProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);