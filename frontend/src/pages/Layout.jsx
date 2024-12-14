import React from "react";
import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex-col justify-between font-familija">
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;