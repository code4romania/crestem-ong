import React from "react";
import { Outlet } from "react-router-dom";
import NavbarEvaluation from "../NavbarEvaluation";
import Footer from "../Footer";

const LayoutEvaluation = () => (
  <>
    <NavbarEvaluation />
    <div className="container mx-auto px-2.5">
      <Outlet />
    </div>
    <Footer />
  </>
);

export default LayoutEvaluation;
