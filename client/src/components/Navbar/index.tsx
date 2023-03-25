import React from "react";
import { Link } from "react-router-dom";
import NavbarEvaluation from "@/components/NavbarEvaluation";
import { userApi } from "@/redux/api/userApi";
import Button from "@/components/Button";

const Menu = () => (
  <ul className="items-center hidden text-sm gap-x-3 lg:flex lg:flex-wrap">
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
      <a href="https://ong.website-factory.heroesof.tech/ro/acasa" className="">
        Acasă
      </a>
    </li>
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
      <a
        href="https://ong.website-factory.heroesof.tech/ro/despre-proiect"
        className=""
      >
        Despre
      </a>
    </li>
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-900 border-teal-600 bg-gray-100">
      <Link to="/" className="">
        Evaluare ONG
      </Link>
    </li>
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
      <a
        href="https://ong.website-factory.heroesof.tech/ro/biblioteca"
        className=""
      >
        Biblioteca
      </a>
    </li>
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
      <a
        href="https://ong.website-factory.heroesof.tech/ro/persoane-resursa"
        className=""
      >
        Persoane resursa
      </a>
    </li>
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
      <a
        href="https://ong.website-factory.heroesof.tech/ro/programele-noastre"
        className=""
      >
        Programele noastre
      </a>
    </li>
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
      <a
        href="https://ong.website-factory.heroesof.tech/ro/programele-noastre"
        className=""
      >
        Contact
      </a>
    </li>
  </ul>
);

const Example = () => {
  const user = userApi.endpoints.getMe.useQueryState(null, {
    selectFromResult: ({ data }) => {
      return data!;
    },
  });

  return (
    <NavbarEvaluation menu={<Menu />}>
      <div className={"flex justify-end w-full"}>
        {user ? (
          <div>Logout</div>
        ) : (
          <div className="flex justify-center items-center md:justify-start gap-4">
            <Button color="white" to={"/login"}>
              Intră în cont
            </Button>
            <Button
              to={"/register"}
              className="px-4 py-2 text-white bg-teal-700 hover:bg-teal-900 hover:border-teal-900 flex
            items-center justify-center text-center border-teal-700 rounded-lg text-sm font-normal mr-auto"
            >
              Înregistrează-te
            </Button>
          </div>
        )}
      </div>
    </NavbarEvaluation>
  );
};

export default Example;
