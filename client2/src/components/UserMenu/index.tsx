import { useAuth } from "@/contexts/auth";
import {
  MenuItem as HUMenuItem,
  Menu,
  MenuButton,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Link, useRouter } from "@tanstack/react-router";
import { Fragment, type ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const MenuItem = ({
  children,
  to,
  onClick,
}: {
  children: ReactNode;
  to?: string;
  onClick?: () => void;
}) => {
  const className =
    "block px-4 py-2 text-sm text-gray-700 cursor-pointer text-right";
  return (
    <HUMenuItem>
      {({ focus }) =>
        to ? (
          <Link
            to={to}
            className={classNames(focus ? "bg-gray-100" : "", className)}
          >
            {children}
          </Link>
        ) : (
          <a
            onClick={onClick}
            className={classNames(focus ? "bg-gray-100" : "", className)}
          >
            {children}
          </a>
        )
      }
    </HUMenuItem>
  );
};

const UserMenu = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    logout();
    await router.invalidate();
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div className="flex space-x-4">
        <span>{user?.ongName}</span>
        <MenuButton className="flex rounded-full bg-gray-800 text-sm">
          <span className="sr-only">Open user menu</span>

          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.avatar?.formats?.thumbnail?.url}
              alt={user?.ongName || user?.firstName || "FDSC"}
            />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem to="/">Acasă</MenuItem>
          <MenuItem to="/profile">Profilul meu</MenuItem>
          <MenuItem onClick={handleLogout}> Log out</MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
