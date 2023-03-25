import React from "react";
import { Link } from "react-router-dom";

interface IButton {
  children: React.Node;
  to?: string;
  onClick?: () => void;
  type?: "submit" | "button";
  color?: "teal" | "white";
}

const textColor = {
  white: "teal-600",
  teal: "white",
};

const hoverColor = {
  white: "gray-100",
  teal: "teal-700",
};

const bgColor = {
  white: "bg-white",
  teal: "bg-teal-600",
};

const Button = ({ children, to, onClick, type, color = "teal" }: IButton) => {
  const buttonClassName =
    "inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2";
  const className = `${buttonClassName} ${
    color
      ? `${bgColor[color]} text-${textColor[color]} hover:bg-${hoverColor[color]}`
      : ""
  }`;
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
