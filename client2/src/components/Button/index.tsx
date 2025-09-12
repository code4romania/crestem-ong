import React, { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

interface IButton {
  children: ReactNode;
  to?: string;
  openInNewTab?: boolean;
  onClick?: () => void;
  type?: "submit" | "button";
  color?: "teal" | "white";
  disabled?: boolean;
}

const variation = {
  teal: "whitespace-nowrap rounded bg-teal-600 py-2 px-4 font-medium text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600",
  white:
    "whitespace-nowrap rounded bg-white py-2 px-4 font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
};

const Button = ({
  children,
  to,
  openInNewTab,
  onClick,
  type,
  color = "teal",
  disabled,
}: IButton) => {
  const className = variation[color];
  const linkProps = openInNewTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : { onClick };

  return to ? (
    <Link to={to} className={className} {...linkProps}>
      {children}
    </Link>
  ) : (
    <button
      className={className}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
