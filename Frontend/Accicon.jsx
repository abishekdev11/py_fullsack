import React, { useState } from "react";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  KeyIcon,
  LockOpenIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/24/solid";

// Profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    link: "/Profile",
  },
  {
    label: "My Orders",
    icon: ArchiveBoxArrowDownIcon,
    link: "/Orders",
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

const logoutItems = [
  {
    label: "Sign In",
    icon: KeyIcon,
    link: "/Signin",
  },
  {
    label: "Sign Up",
    icon: LockOpenIcon,
    link: "/Signup",
  },
];

export default function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const logClick = () => {
    setLogin(!login);
  };

  return (
    <>
      <Menu open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Button
            variant="text"
            color="gray"
            className="flex items-center gap-2 rounded-full hover:bg-blue-300 p-2 lg:ml-auto"
          >
            <Avatar
              variant="circular"
              size="sm"
              alt="User"
              className="border border-green-900 p-0.5"
              src="user.png"
            />
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`h-7 w-6 transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </Button>
        </MenuHandler>
        <MenuList className="p-1">
          {login
            ? logoutItems.map(({ label, icon, link }) => (
                <a key={label} href={link}>
                  <MenuItem
                    onClick={closeMenu}
                    className="flex items-center gap-2 rounded hover:bg-gray-300"
                  >
                    {React.createElement(icon, {
                      className: "h-5 w-5",
                      strokeWidth: 2,
                    })}
                    <Typography as="span" variant="small" className="font-normal">
                      {label}
                    </Typography>
                  </MenuItem>
                </a>
              ))
            : profileMenuItems.map(({ label, icon, link }, key) => {
                const isLastItem = key === profileMenuItems.length - 1;
                return (
                  <a key={label} href={link}>
                    <MenuItem
                      onClick={isLastItem ? logClick : closeMenu}
                      className={`flex items-center gap-2 rounded ${
                        isLastItem
                          ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                          : "hover:bg-gray-300"
                      }`}
                    >
                      {React.createElement(icon, {
                        className: `h-5 w-5 ${
                          isLastItem ? "text-red-500" : ""
                        }`,
                        strokeWidth: 2,
                      })}
                      <Typography
                        as="span"
                        variant="small"
                        className="font-normal"
                        color={isLastItem ? "red" : "inherit"}
                      >
                        {label}
                      </Typography>
                    </MenuItem>
                  </a>
                );
              })}
        </MenuList>
      </Menu>
    </>
  );
}
