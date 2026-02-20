import logo from "@/assets/logo.png";
import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

const NavbarEvaluation = ({
  children,
  menu,
}: {
  children?: ReactNode;
  menu?: ReactNode;
}) => (
  <header className={"shadow"}>
    <nav className="container mx-auto py-6 px-2.5 space-y-4 flex items-center justify-between gap-3 lg:block">
      <div className="relative flex items-center justify-between gap-3 w-full">
        <Link to="/">
          <img
            className="object-contain max-w-[144px]"
            alt={"Crestem ONG-uri Incredere De Bine"}
            src={logo}
          />
        </Link>
        {children}
      </div>
      {menu}
    </nav>
  </header>
);

export default NavbarEvaluation;
