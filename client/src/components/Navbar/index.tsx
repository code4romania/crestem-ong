import React from "react";
import { NavLink } from "react-router-dom";
import NavbarEvaluation from "@/components/NavbarEvaluation";
import Button from "@/components/Button";
import UserMenu from "@/components/UserMenu";
import { useAppSelector } from "@/redux/store";
import logo from "@/assets/platforma_FDSC_Kaufland.svg";

const Menu = () => {
  const user = useAppSelector((state) => state.userState.user);
  const isFDSC = user?.role?.type === "fdsc";

  const linkClassName =
    "flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-900 border-teal-600";

  return (
    <ul className="items-center hidden text-sm gap-x-3 lg:flex lg:flex-wrap">
      {isFDSC ? (
        <>
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                `flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-900 border-teal-600 ${
                  isPending ? "bg-gray-50" : isActive ? "bg-gray-100" : ""
                }`
              }
            >
              Panou de control
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className={({ isActive, isPending }) =>
                `flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-900 border-teal-600 ${
                  isPending ? "bg-gray-50" : isActive ? "bg-gray-100" : ""
                }`
              }
            >
              Evaluări
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive, isPending }) =>
                `flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-900 border-teal-600 ${
                  isPending ? "bg-gray-50" : isActive ? "bg-gray-100" : ""
                }`
              }
            >
              Utilizatori
            </NavLink>
          </li>
          <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
            <a
              href="https://crestem.ong/ro/biblioteca"
              className=""
              target="_blank"
            >
              Bibliotecă
            </a>
          </li>
          <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
            <a
              href="https://crestem.ong/ro/persoane-resursa"
              className=""
              target="_blank"
            >
              Persoane resursă
            </a>
          </li>
          <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
            <a
              href="https://crestem.ong/ro/programele-noastre"
              className=""
              target="_blank"
            >
              Programe
            </a>
          </li>
        </>
      ) : (
        <>
          <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
            <a href="https://crestem.ong/ro/acasa" className="">
              Acasă
            </a>
          </li>
          <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
            <a href="https://crestem.ong/ro/despre-proiect" className="">
              Despre
            </a>
          </li>
          <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-900 border-teal-600 bg-gray-100">
            <NavLink to="/" className="">
              Evaluare ONG
            </NavLink>
          </li>
          <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
            <a href="https://crestem.ong/ro/biblioteca" className="">
              Biblioteca
            </a>
          </li>
          <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
            <a href="https://crestem.ong/ro/persoane-resursa" className="">
              Persoane resursa
            </a>
          </li>
          <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
            <a href="https://crestem.ong/ro/programele-noastre" className="">
              Programele noastre
            </a>
          </li>
          <li className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-700 hover:bg-gray-100">
            <a href="https://crestem.ong/ro/contact" className="">
              Contact
            </a>
          </li>
        </>
      )}
    </ul>
  );
};

const Example = () => {
  const user = useAppSelector((state) => state.userState.user);

  return (
    <>
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
      <aside className="border-b">
        <div className="container mx-auto flex items-center gap-4 sm:justify-end md:gap-x-8">
          <div className="flex flex-wrap items-center justify-end flex-1 gap-4 lg:gap-x-6 sm:flex-initial px-2.5">
            <span className="inline-flex shrink-0">
              <img
                className="object-contain h-28 max-w-full"
                src={logo}
                alt="partners"
              />
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Example;
