import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const LayoutApp = () => (
  <>
    <Navbar />
    <div className="container mx-auto px-2.5">
      <Outlet />
    </div>
    <Footer />
  </>
);

export default LayoutApp;
