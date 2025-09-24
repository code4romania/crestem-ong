import NavbarEvaluation from "@/components/NavbarEvaluation";
import UserMenu from "@/components/UserMenu";
import getUserType from "@/lib/userType";
import { useGetMe } from "@/services/user.queries";

import {
  MenuButton,
  Menu as MenuHeadless,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

const MENU = {
  public: [
    { text: "Acasă", link: "https://crestem.ong/ro/acasa" },
    { text: "Despre", link: "https://crestem.ong/ro/despre-proiect" },
    { text: "Evaluare ONG", link: "/" },
    { text: "Bibliotecă", link: "https://crestem.ong/ro/biblioteca" },
    {
      text: "Programele noastre",
      link: "https://crestem.ong/ro/programele-noastre",
    },
    { text: "FAQ", link: "https://crestem.ong/ro/intrebari-frecvente" },
    { text: "Contact", link: "https://crestem.ong/ro/contact" },
  ],
  fdsc: [
    { text: "Panou de control", link: "/" },
    { text: "Evaluări", link: "/reports" },
    { text: "Organizații", link: "/users" },
    { text: "Persoane resursă", link: "/mentors" },
    { text: "Programe", link: "/programs" },
  ],
  authenticated: [
    { text: "Acasă", link: "https://crestem.ong/ro/acasa" },
    { text: "Despre", link: "https://crestem.ong/ro/despre-proiect" },
    { text: "Evaluare ONG", link: "/" },
    { text: "Bibliotecă", link: "https://crestem.ong/ro/biblioteca" },
    { text: "Persoane resursă", link: "/mentors" },
    {
      text: "Programele noastre",
      link: "https://crestem.ong/ro/programele-noastre",
    },
    { text: "FAQ", link: "https://crestem.ong/ro/intrebari-frecvente" },
    { text: "Contact", link: "https://crestem.ong/ro/contact" },
  ],
  mentor: [
    { text: "Evaluare ONG", link: "/" },
    { text: "Jurnal de activitate", link: "/activities" },
  ],
};

export const Menu = () => {
  const { data: user } = useGetMe();
  const userType = getUserType(user);
  const menu = MENU[userType];

  return (
    <>
      {/* Desktop Menu */}
      <ul className="items-center hidden text-sm gap-x-3 lg:flex lg:flex-wrap">
        {menu.map((menuItem) => (
          <li key={menuItem.link}>
            {menuItem.link.startsWith("https://crestem.ong") ? (
              <a
                href={menuItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-wrap border-b-2 border-transparent px-3 py-2 font-medium items-center text-gray-900 hover:bg-gray-50"
              >
                {menuItem.text}
              </a>
            ) : (
              <Link
                to={menuItem.link}
                activeProps={{
                  className: "bg-gray-100 border-teal-600",
                }}
                inactiveProps={{
                  className: "border-transparent",
                }}
                className="flex flex-wrap border-b-2 px-3 py-2 font-medium items-center text-gray-900"
              >
                {menuItem.text}
              </Link>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
      <MenuHeadless
        as="div"
        className="lg:hidden !mt-0 relative flex items-center"
      >
        <MenuButton>
          <Bars3Icon className="h-5" />
        </MenuButton>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute top-5 right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col">
            {menu.map((menuItem) => (
              <MenuItem key={menuItem.text}>
                {menuItem.link.startsWith("https://crestem.ong") ? (
                  <a
                    href={menuItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-wrap border-b-2 px-3 py-2 font-medium items-center text-gray-900 hover:bg-gray-50"
                  >
                    {menuItem.text}
                  </a>
                ) : (
                  <Link
                    to={menuItem.link}
                    activeProps={{
                      className: "bg-gray-100 border-teal-600",
                    }}
                    inactiveProps={{
                      className: "border-transparent",
                    }}
                    className="flex flex-wrap border-b-2 px-3 py-2 font-medium items-center text-gray-900"
                  >
                    {menuItem.text}
                  </Link>
                )}
              </MenuItem>
            ))}

            {!user && (
              <>
                <MenuItem as="div" className="px-2 flex mb-2">
                  {({ close }) => (
                    <Button asChild onClick={close} variant="secondary">
                      <Link to={"/login"}>Înregistrează-te</Link>
                    </Button>
                  )}
                </MenuItem>
                <MenuItem as="div" className="px-2 flex mb-1">
                  {({ close }) => (
                    <Button asChild onClick={close}>
                      <Link to={"/register"}>Înregistrează-te</Link>
                    </Button>
                  )}
                </MenuItem>
              </>
            )}
          </MenuItems>
        </Transition>
      </MenuHeadless>
    </>
  );
};

const Navbar = () => {
  const { data: user } = useGetMe();

  return (
    <NavbarEvaluation menu={<Menu />}>
      <div className="flex justify-end w-full">
        {user ? (
          <UserMenu />
        ) : (
          <div className="hidden lg:flex justify-center items-center md:justify-start gap-4">
            <div>
              <Button asChild variant="secondary">
                <Link to={"/login"}>Înregistrează-te</Link>
              </Button>
            </div>
            <div>
              <Button asChild onClick={close}>
                <Link to={"/register"}>Înregistrează-te</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </NavbarEvaluation>
  );
};

export default Navbar;
