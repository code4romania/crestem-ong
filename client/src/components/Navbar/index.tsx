import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import NavbarEvaluation from "../NavbarEvaluation";
import { userApi } from "../../redux/api/userApi";

function classNames({ ...classes }) {
  return classes.filter(Boolean).join(" ");
}

const Example = () => {
  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => {
      return data!;
    },
  });
  console.log("user", user);

  return (
    <NavbarEvaluation>
      <div className={"flex justify-between w-full"}>
        <div className={"sm:space-x-4"}>
          <Link
            to="/"
            className="inline-flex items-center border-tealpx-2 py-2 pt-1 text-sm font-medium text-gray-900"
          >
            Despre
          </Link>
          <Link
            to="/"
            className="inline-flex items-center border-transparent px-2 py-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Evaluare ONG
          </Link>
          <Link
            to="/"
            className="inline-flex items-center border-transparent px-2 py-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Bibliotecă
          </Link>
          <Link
            to="/"
            className="inline-flex items-center border-transparent px-2 py-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Persoane resursă
          </Link>
          <Link
            to="/"
            className="inline-flex items-center border-transparent px-2 py-2 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Contact
          </Link>
        </div>
        {user ? (
          <div>Logout</div>
        ) : (
          <div className="flex justify-center items-center md:justify-start hidden md:flex">
            <Link
              to={"/login"}
              className="px-4 py-2 text-gray-600 bg-white flex items-center justify-center text-center rounded-lg text-sm font-normal mr-6"
            >
              Intră în cont
            </Link>
            <Link
              to={"/register"}
              className="px-4 py-2 text-white bg-teal-700 hover:bg-teal-900 hover:border-teal-900 flex
            items-center justify-center text-center border-teal-700 rounded-lg text-sm font-normal mr-auto"
            >
              Înregistrează-te
            </Link>
          </div>
        )}
      </div>
    </NavbarEvaluation>
  );
};

export default Example;
