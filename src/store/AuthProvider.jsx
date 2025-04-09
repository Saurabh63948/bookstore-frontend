import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    // Check for user in localStorage (if saved)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setAuthUser(storedUser);
    }
  }, []);

  const login = (userData) => {
    setAuthUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setAuthUser(null);
    localStorage.removeItem("user");
  };

  // ✅ Host Check
  const isHost = authUser?.email === "host12345@gmail.com";

  return (
    <AuthContext.Provider value={{ authUser, login, logout, isHost }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
