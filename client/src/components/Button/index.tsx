import React from "react";
import { Link } from "react-router-dom";

interface IButton {
  children: React.Node;
  to?: string;
  onClick?: () => void;
  type?: 'submit' | 'button';
}

const Button = ({ children, to, onClick, type }: IButton) => {
  const className =
    "ml-3 inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2";
  return to ? (
    <Link to={to} className={className}>{children}</Link>
  ) : (
    <button className={className} onClick={onClick} type={type}>{children}</button>
  );
};

export default Button;
