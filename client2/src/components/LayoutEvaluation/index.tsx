import { Outlet } from "@tanstack/react-router";
import Footer from "../Footer";
import { Menu } from "../Navbar";
import NavbarEvaluation from "../NavbarEvaluation";

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
