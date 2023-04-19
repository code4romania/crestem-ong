import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const NavbarEvaluation = ({
  children,
  menu,
}: {
  children?: ReactNode;
  menu?: ReactNode;
}) => (
  <header className={"shadow"}>
    <nav className="container mx-auto py-6 px-2.5 space-y-4">
      <div className="relative flex items-center justify-between gap-3">
        <Link to="/">
          <img
            className="object-contain h-16 max-w-48 sm:max-w-64"
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
