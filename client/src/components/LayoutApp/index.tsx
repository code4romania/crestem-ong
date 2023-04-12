import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const LayoutApp = () => (
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="mb-auto">
      <Outlet />
    </div>
    <Footer />
  </div>
);

export default LayoutApp;
