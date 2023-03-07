import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../src/assets/logo.svg";
import logoFDSC from "../../../src/assets/logo-fdsc.jpg";
import logoInStareDeBine from "../../../src/assets/logo-in-stare-de-bine.jpg";

const NavbarEvaluation = () => (
  <nav className="divide-y divide-gray-300 shadow">
    <div className="container mx-auto py-6">
      <Link to="/">
        <img src={logo} />
      </Link>
    </div>
    <div className="container mx-auto flex justify-end py-4">
      <Link to="/">
        <img src={logoFDSC} width={197} height={70} />
      </Link>
      <Link to="/">
        <img src={logoInStareDeBine} width={100} height={70} />
      </Link>
    </div>
  </nav>
);

export default NavbarEvaluation;
