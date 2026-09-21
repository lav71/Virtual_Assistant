import { useState, useEffect, createContext } from "react";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = import.meta.env.VITE_API_URL;

  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCurrentUser = async () => {
  try {
    const result = await axios.get(
      `${serverUrl}/api/user/current`,
      {
        withCredentials: true,
      }
    );

    setUserData(result.data);
    console.log("Current user data:", result.data);

  } catch (error) {
    console.log(
      "Current user error:",
      error.response?.data || error.message
    );
    setUserData(null);

  } finally {
    setLoading(false);
  }
};

  const getGeminiResponse = async (command) => {
    try {
      console.log("Sending command:", command);

      const result = await axios.post(
        `${serverUrl}/api/user/askToAssistant`,
        {
          command,
          assistantName: userData?.assistantName,
          userName: userData?.name,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Gemini Response:", result.data);

      return result.data;
    } catch (error) {
      console.log(
        "Ask to assistant error:",
        error.response?.data || error.message
      );

      return null;
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    loading,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserContext;