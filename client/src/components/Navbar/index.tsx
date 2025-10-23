import NavbarEvaluation from "@/components/NavbarEvaluation";
import UserMenu from "@/components/UserMenu";

import { useAuth } from "@/contexts/auth";

import { Bars3Icon } from "@heroicons/react/20/solid";
import { Link } from "@tanstack/react-router";
import { Fragment, useMemo } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
    {
      text: "Susținători",
      link: "https://crestem.ong/ro/sustinatori",
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
    { text: "Statistici ONG", link: "/" },
    { text: "Evaluare ONG", link: "/reports" },
    { text: "Bibliotecă", link: "https://crestem.ong/ro/biblioteca" },
    { text: "Persoane resursă", link: "/mentors" },
    {
      text: "Programele noastre",
      link: "https://crestem.ong/ro/programele-noastre",
    },
    {
      text: "Susținători",
      link: "https://crestem.ong/ro/sustinatori",
    },
    { text: "FAQ", link: "https://crestem.ong/ro/intrebari-frecvente" },
    { text: "Contact", link: "https://crestem.ong/ro/contact" },
  ],
  mentor: [
    { text: "Evaluare ONG", link: "/" },
    { text: "Jurnal de activitate", link: "/activities" },
    { text: "Organizații", link: "/users" },
    { text: "Persoane resursă", link: "/mentors" },
  ],
};

export const Menu = () => {
  const { userRole, user } = useAuth();
  const menu = useMemo(() => MENU[userRole], [userRole]);

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

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="lg:hidden !mt-0 relative flex items-center"
          >
            <Bars3Icon className="h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuGroup>
            {menu.map((menuItem) => (
              <DropdownMenuItem asChild key={menuItem.text}>
                {menuItem.link.startsWith("https://crestem.ong") ? (
                  <a
                    href={menuItem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    // className="flex flex-wrap border-b-2 px-3 py-2 font-medium items-center text-gray-900 hover:bg-gray-50"
                  >
                    {menuItem.text}
                  </a>
                ) : (
                  <Link
                    to={menuItem.link}
                    activeProps={{
                      className:
                        "bg-gray-100 border-2 border-teal-600 font-semibold",
                    }}
                    inactiveProps={{
                      className: "border-transparent hover:bg-gray-100",
                    }}
                  >
                    {menuItem.text}
                  </Link>
                )}
              </DropdownMenuItem>
            ))}

            {!user && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={"/login"}>Intră în cont</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to={"/register"}>Înregistrează-te</Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/">Acasă</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/profile">Profilul meu</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

const Navbar = () => {
  const { user } = useAuth();

  return (
    <NavbarEvaluation menu={<Menu />}>
      <div className="flex justify-end w-full">
        {user ? (
          <UserMenu />
        ) : (
          <div className="hidden lg:flex justify-center items-center md:justify-start gap-4">
            <div>
              <Button asChild variant="secondary">
                <Link to={"/login"}>Intră în cont</Link>
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
