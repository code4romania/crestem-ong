import React from "react";
import { Link } from "react-router-dom";
import NavbarEvaluation from "@/components/NavbarEvaluation";
import Button from "@/components/Button";
import UserMenu from "@/components/UserMenu";
import { useAppSelector } from "@/redux/store";

const Menu = () => (
  <ul className="items-center hidden text-sm gap-x-3 lg:flex lg:flex-wrap">
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
      <a href="https://crestem.ong/ro/acasa" className="">
        Acasă
      </a>
    </li>
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
      <a
        href="https://crestem.ong/ro/despre-proiect"
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
        href="https://crestem.ong/ro/biblioteca"
        className=""
      >
        Biblioteca
      </a>
    </li>
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
      <a
        href="https://crestem.ong/ro/persoane-resursa"
        className=""
      >
        Persoane resursa
      </a>
    </li>
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
      <a
        href="https://crestem.ong/ro/programele-noastre"
        className=""
      >
        Programele noastre
      </a>
    </li>
    <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
      <a
        href="https://crestem.ong/ro/programele-noastre"
        className=""
      >
        Contact
      </a>
    </li>
  </ul>
);

const Example = () => {
  const user = useAppSelector((state) => state.userState.user);

  return (
    <NavbarEvaluation menu={<Menu />}>
      <div className={"flex justify-end w-full"}>
        {user ? (
          <UserMenu />
        ) : (
          <div className="flex justify-center items-center md:justify-start gap-4">
            <div>
              <Button color="white" to={"/login"}>
                Intră în cont
              </Button>
            </div>
            <div className="hidden md:block">
              <Button to={"/register"}>Înregistrează-te</Button>
            </div>
          </div>
        )}
      </div>
    </NavbarEvaluation>
  );
};

export default Example;
