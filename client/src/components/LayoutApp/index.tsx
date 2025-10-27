import type { ReactNode } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import { Outlet } from "@tanstack/react-router";

const LayoutApp = ({ children }: { children?: ReactNode }) => (
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="mb-auto">{children ?? <Outlet />}</div>
    <Footer />
  </div>
);

export default LayoutApp;
