import type { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer";
import Navbar from "../Navbar";

const LayoutApp = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-col h-screen">
    <Navbar />
    <div className="mb-auto">{children}</div>
    <Footer />
  </div>
);

export default LayoutApp;
