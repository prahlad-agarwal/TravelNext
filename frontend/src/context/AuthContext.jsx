import React, { createContext } from "react";
import { useState } from "react";

export const authDataContext = createContext();

export const AuthContext = ({ children }) => {
  const serverUrl = "https://travelnext-backend-y1fz.onrender.com";

  const [loading, setLoading] = useState(false);

  const value = { serverUrl, loading, setLoading };
  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
};
