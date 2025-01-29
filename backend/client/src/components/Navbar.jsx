import React, { useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import { useUser } from "../contexts/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();
  const [MenuToggle, setMenuToggle] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 md:mx-8 lg:mx-14 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center">
            <img src={logo} alt="CoachOn Logo" className="md:h-8 h-5" />
          </div>
        </Link>
        {/*Small Screen Navbar Items */}
        <div className="lg:hidden block">
          {MenuToggle ? (
            <div className="scale-up-hor-right fixed top-0 right-0 h-full bg-white shadow-lg">
              <div className="flex items-center justify-between px-4 md:py-3 py-2 border-b">
                <span className="text-lg font-bold">Menu</span>
                <IoMdClose
                  className="size-[1.5rem]"
                  onClick={() => setMenuToggle(false)}
                />
              </div>
              {/* Navbar Items */}
              <ul className="p-4 space-y-8">
                {/* Search Bar */}
                <li>
                  <input
                    type="text"
                    placeholder="Search by institute"
                    className="border border-gray-300 rounded-md w-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </li>
                {/* Premium */}
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-black  text-sm flex flex-col items-center"
                  >
                    <span className="font-medium">Premium</span>
                    <span className="text-xs text-gray-400">
                      Contact us to list
                    </span>
                  </Link>
                </li>
                {/* List Your institute */}
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-black text-sm  flex flex-col items-center"
                  >
                    <span className="font-medium">List your institute</span>
                    <span className="text-xs text-gray-400">
                      Contact us to list
                    </span>
                  </Link>
                </li>

                {/* Login / Signup */}
                <li>
                  {user ? (
                    //make a user profile

                    <Link
                      to="/profile"
                      className="text-gray-600 hover:text-black text-base font-medium"
                    >
                      My Profile
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="text-white text-sm flex bg-primary hover:bg-secondary px-6 py-3 rounded-lg items-center"
                    >
                      <span className="font-medium">Login/Signup</span>
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          ) : (
            <CiMenuBurger
              className="size-[1.35rem]"
              onClick={() => setMenuToggle(true)}
            />
          )}
        </div>
        {/* Navbar Items */}
        <div className="space-x-8 lg:flex hidden items-center">
          {/* Search Bar */}

          <input
            type="text"
            placeholder="Search by institute"
            className="border border-gray-300 xl:w-96 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Premium */}
          <div>
            <Link
              to="/"
              className="text-gray-600 hover:text-black  text-sm flex flex-col items-center"
            >
              <span className="font-medium">Premium</span>
              <span className="text-xs text-gray-400">Contact us to list</span>
            </Link>
          </div>

          {/* List Your institute */}

          <Link
            to="/"
            className="text-gray-600 hover:text-black text-sm  flex flex-col items-center"
          >
            <span className="font-medium">List your institute</span>
            <span className="text-xs text-gray-400">Contact us to list</span>
          </Link>

          {/* Login / Signup */}
          {user ? (
            //make a user profile
            <div className="flex items-center">
              <span className="text-gray-600 hover:text-black text-base font-medium">
                {user.name}
              </span>
              <img
                src={user.avatar.url}
                alt="profilePic"
                className="rounded-full h-10 w-10 ml-2 object-cover"
                onClick={handleLogout}
              />
            </div>
          ) : (
            <Link
              to="/login"
              className="text-white text-sm flex bg-primary hover:bg-secondary px-6 py-3 rounded-lg items-center"
            >
              <span className="font-medium">Login/Signup</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
