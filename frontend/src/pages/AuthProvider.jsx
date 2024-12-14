import React, { createContext, useContext, useState, useEffect } from "react";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem(ACCESS_TOKEN));

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setUser(token);
  }, []);

  const logIn = (res) => {
    localStorage.setItem(ACCESS_TOKEN, res.access);
    localStorage.setItem(REFRESH_TOKEN, res.refresh);

    setUser(res.access);
  };

  const logOut = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
