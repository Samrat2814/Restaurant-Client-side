import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/SharedComponents/Navbar";
import Footer from "../Components/SharedComponents/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto min-h-screen px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
