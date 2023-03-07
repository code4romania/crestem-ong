import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <div className="bg-white pt-4 pr-8 pb-4 pl-8">
    <div className="w-full">
      <div className="flex w-full justify-end max-w-screen-2xl md:flex-row mt-auto mr-auto mb-auto ml-auto">
        <div className="flex justify-center items-center md:justify-start hidden md:flex">
          <Link
            to={'/login'}
            className="h-9 px-4 py-2 text-gray-600 bg-white border-2 border-white flex items-center justify-center
            text-center rounded-lg text-lg font-normal mr-6"
          >
            Intră în cont
          </Link>
          <Link
            to={'/register'}
            className="h-9 px-4 py-2 text-white bg-teal-700 hover:bg-teal-900 hover:border-teal-900 border-2 flex
            items-center justify-center text-center border-teal-700 rounded-lg text-lg font-normal mr-auto"
          >
            Înregistrează-te
          </Link>
        </div>
        <div className="md:hidden flex items-center">
          <div className="outline-none mobile-menu-button">
            <svg
              fill="none"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-gray-500
              hover:text-green-500"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
        </div>
      </div>
      <div className="hidden md:hidden md:hidden mobile-menu">
        <div>
          <div className="active">
            <a
              href="#"
              className="text-gray-600 text-center mt-2 font-medium text-base"
            >
              Product
            </a>
            <a
              href="#"
              className="text-gray-600 text-center mt-2 font-medium text-base"
            >
              Features
            </a>
            <a
              href="#"
              className="text-gray-600 text-center mt-2 font-medium text-base"
            >
              Pricing
            </a>
            <button
              className="h-9 w-24 text-gray-600 bg-white border-2 border-white flex items-center justify-center
              text-center rounded-lg text-lg font-normal mt-2 mr-auto ml-auto"
            >
              Sign in
            </button>
            <button
              className="h-9 w-24 text-white bg-blue-700 hover:bg-blue-900 hover:border-blue-900 border-2 flex
              items-center justify-center text-center border-blue-700 rounded-lg text-lg font-normal mt-2 mr-auto
              ml-auto"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Navbar;
