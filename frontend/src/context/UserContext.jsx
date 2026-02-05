import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";

export const userDataContext = createContext();

const UserContext = ({ children }) => {
  const { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState(null);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get(serverUrl + "/api/user/currentuser", {
        withCredentials: true,
      });
      setUserData(res.data);
      localStorage.setItem("context userData", JSON.stringify(res.data));
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = { userData, setUserData, getCurrentUser };
  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
};
export default UserContext;
