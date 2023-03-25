import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import NavbarAside from "@/components/NavbarAside";
import logo from "@/assets/logo.png";
import logoFDSC from "@/assets/logo-fdsc.jpg";
import logoInStareDeBine from "@/assets/logo-in-stare-de-bine.jpg";

const NavbarEvaluation = ({
  children,
  menu,
}: {
  children?: ReactNode;
  menu?: ReactNode;
}) => (
  <>
    <NavbarAside />
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
    <aside className="border-b">
      <div className="container mx-auto flex justify-end py-4 items-center gap-4">
        <span className="text-sm font-medium text-gray-600">Un proiect</span>
        <Link to="/">
          <img src={logoFDSC} className="object-contain h-12" />
        </Link>
        <Link to="/">
          <img src={logoInStareDeBine} className="object-contain h-12" />
        </Link>
      </div>
    </aside>
  </>
);

export default NavbarEvaluation;
