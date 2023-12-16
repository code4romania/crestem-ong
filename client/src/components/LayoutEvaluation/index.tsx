import React from "react";
import { Outlet } from "react-router-dom";
import NavbarEvaluation from "../NavbarEvaluation";
import Footer from "../Footer";
import { Menu } from "../Navbar";

const LayoutEvaluation = () => (
  <>
    <NavbarEvaluation menu={<Menu />} />
    <div className="container mx-auto px-2.5">
      <Outlet />
    </div>
    <Footer />
  </>
);

export default LayoutEvaluation;
