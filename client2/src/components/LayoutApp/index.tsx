import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Footer";
import Navbar from "../Navbar";

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
