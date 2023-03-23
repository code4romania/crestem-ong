import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "../Navbar";
import Footer from "../Footer";

const LayoutApp = () => (
  <>
    <ToastContainer />
    <Navbar />
    <div>
      <Outlet />
    </div>
    <Footer />
  </>
);

export default LayoutApp;
