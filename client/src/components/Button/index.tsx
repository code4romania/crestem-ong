import React from "react";
import { Link } from "react-router-dom";

interface IButton {
  children: React.Node;
  to?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  color?: "teal" | "white";
}

const variation = {
  teal: "rounded bg-teal-600 py-2 px-4 font-medium text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600",
  white:
    "rounded bg-white py-2 px-4 font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
};

const Button = ({ children, to, onClick, type, color = "teal" }: IButton) => {
  const className = variation[color];

  return to ? (
    <Link to={to} className={className}>
      {children}
    </Link>
  ) : (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
