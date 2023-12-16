import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import NavbarEvaluation from "@/components/NavbarEvaluation";
import Button from "@/components/Button";
import UserMenu from "@/components/UserMenu";
import { useAppSelector } from "@/redux/store";
import logo from "@/assets/platforma_FDSC_Kaufland.svg";
import getUserType from "@/lib/userType";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Menu as MenuHeadless, Transition } from "@headlessui/react";

const MENU = {
  public: [
    {
      text: "Acasă",
      link: "https://crestem.ong/ro/acasa",
    },
    {
      text: "Despre",
      link: "https://crestem.ong/ro/despre-proiect",
    },
    {
      text: "Evaluare ONG",
      link: "/",
    },
    {
      text: "Bibliotecă",
      link: "https://crestem.ong/ro/biblioteca",
    },
    {
      text: "Programele noastre",
      link: "https://crestem.ong/ro/programele-noastre",
    },
    {
      text: "FAQ",
      link: "https://crestem.ong/ro/intrebari-frecvente",
    },
    {
      text: "Contact",
      link: "https://crestem.ong/ro/contact",
    },
  ],
  fdsc: [
    {
      text: "Panou de control",
      link: "/",
    },
    {
      text: "Evaluări",
      link: "/reports",
    },
    {
      text: "Organizații",
      link: "/users",
    },
    {
      text: "Persoane resursă",
      link: "/mentors",
    },
    {
      text: "Programe",
      link: "/programs",
    },
  ],
  authenticated: [
    {
      text: "Acasă",
      link: "https://crestem.ong/ro/acasa",
    },
    {
      text: "Despre",
      link: "https://crestem.ong/ro/despre-proiect",
    },
    {
      text: "Evaluare ONG",
      link: "/",
    },
    {
      text: "Bibliotecă",
      link: "https://crestem.ong/ro/biblioteca",
    },
    { text: "Persoane resursă", link: "/mentors" },
    {
      text: "Programele noastre",
      link: "https://crestem.ong/ro/programele-noastre",
    },
    {
      text: "FAQ",
      link: "https://crestem.ong/ro/intrebari-frecvente",
    },
    {
      text: "Contact",
      link: "https://crestem.ong/ro/contact",
    },
  ],
  mentor: [
    // {
    //   text: "Acasă",
    //   link: "https://crestem.ong/ro/acasa",
    // },
    // {
    //   text: "Despre",
    //   link: "https://crestem.ong/ro/despre-proiect",
    // },
    {
      text: "Evaluare ONG",
      link: "/",
    },
    // {
    //   text: "Bibliotecă",
    //   link: "https://crestem.ong/ro/biblioteca",
    // },
    { text: "Jurnal de activitate", link: "/activities" },
    // {
    //   text: "FAQ",
    //   link: "https://crestem.ong/ro/intrebari-frecvente",
    // },
    // {
    //   text: "Contact",
    //   link: "https://crestem.ong/ro/contact",
    // },
  ],
};

export const Menu = () => {
  const user = useAppSelector((state) => state.userState.user);
  const userType = getUserType(user);
  const menu = MENU[userType];

  return (
    <>
      <ul className="items-center hidden text-sm gap-x-3 lg:flex lg:flex-wrap">
        {menu.map((menuItem) => (
          <li key={menuItem.link}>
            <NavLink
              target={
                menuItem.link.startsWith("https://crestem.ong")
                  ? "_blank"
                  : undefined
              }
              to={menuItem.link}
              className={({ isActive, isPending }) =>
                `flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-900 border-teal-600 ${
                  isPending ? "bg-gray-50" : isActive ? "bg-gray-100" : ""
                }`
              }
            >
              {menuItem.text}
            </NavLink>
          </li>
        ))}
      </ul>
      <MenuHeadless
        as="div"
        className="lg:hidden !mt-0 relative flex items-center"
      >
        <MenuHeadless.Button>
          <Bars3Icon className="h-5" />
        </MenuHeadless.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuHeadless.Items className="absolute top-5 right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col">
            {menu.map((menuItem) => (
              <MenuHeadless.Item key={menuItem.text}>
                <NavLink
                  target={
                    menuItem.link.startsWith("https://crestem.ong")
                      ? "_blank"
                      : undefined
                  }
                  to={menuItem.link}
                  className={({ isActive, isPending }) =>
                    `flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-900 border-teal-600 ${
                      isPending ? "bg-gray-50" : isActive ? "bg-gray-100" : ""
                    }`
                  }
                >
                  {menuItem.text}
                </NavLink>
              </MenuHeadless.Item>
            ))}
            {!user && (
              <>
                <MenuHeadless.Item as="div" className="px-2 flex mb-2">
                  {({ close }) => (
                    <Button color="white" to={"/login"} onClick={close}>
                      Intră în cont
                    </Button>
                  )}
                </MenuHeadless.Item>
                <MenuHeadless.Item as="div" className="px-2 flex mb-1">
                  {({ close }) => (
                    <Button to={"/register"} onClick={close}>
                      Înregistrează-te
                    </Button>
                  )}
                </MenuHeadless.Item>
              </>
            )}
          </MenuHeadless.Items>
        </Transition>
      </MenuHeadless>
    </>
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
            <div className="hidden lg:flex justify-center items-center md:justify-start gap-4">
              <div>
                <Button color="white" to={"/login"}>
                  Intră în cont
                </Button>
              </div>
              <div>
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
