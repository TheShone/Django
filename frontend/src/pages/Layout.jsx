import React from "react";
import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.jsx";

const Layout = () => {
  return (
    <div className="flex-col justify-between font-familija">
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;