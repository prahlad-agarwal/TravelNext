import React, { createContext } from "react";
import { useState } from "react";

export const authDataContext = createContext();

export const AuthContext = ({ children }) => {
  const serverUrl = "http://localhost:8080";

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
