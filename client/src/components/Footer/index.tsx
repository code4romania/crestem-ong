import React from "react";
import { Link } from "react-router-dom";
import logoCode4Ro from "../../assets/logo-code4ro.svg";

const Footer = () => (
  <div>
    <div className="bg-gray-200">
      <div className="container mx-auto text-sm py-1.5 flex gap-x-2">
        <img src={logoCode4Ro} width={14} />
        <span>O soluție Code for Romania.</span>
        <div className={"text-teal-600 underline hover:no-underline"}>
          <Link to={"/"}>Află mai multe</Link>
        </div>
      </div>
    </div>
    <div className="container mx-auto py-12 text-gray-400">
      © 2023 Creștem ONG
    </div>
  </div>
);

export default Footer;
