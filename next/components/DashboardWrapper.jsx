// components/Layout.js
import React from "react";
// Optional: Create a CSS module for styling
import Navbar from "./Navbar";
import DashboardNavbar from "./DashboardNavbar";
const LayoutWrapper = ({ children }) => {
  return (
    <div className="h-screen w-screen flex-col flex">
      <Navbar />

      <div className="w-full h-full bg-white flex flex-row">
        <DashboardNavbar></DashboardNavbar>
        {children}
      </div>
    </div>
  );
};

export default LayoutWrapper;
