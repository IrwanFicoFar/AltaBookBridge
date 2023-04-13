import { FC, useEffect, useState, MouseEventHandler, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MdShoppingCart, MdLogout, MdModeNight, MdSunny } from "react-icons/md";
import { GiBookmark } from "react-icons/gi";
import { FaUserTie, FaUpload, FaChevronLeft, FaBook } from "react-icons/fa";
import Swal from "sweetalert2";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { handleAuth } from "../utils/redux/reducers/reducers";
import { ThemeContext } from "../utils/context";
import { FaSun, FaMoon } from "react-icons/fa";

export const Navbar: FC = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [cookie, , removeCookie] = useCookies(["token", "uname"]);
  const dispatch = useDispatch();
  const checkToken = cookie.token;
  const getUname = cookie.uname;
  const navigate = useNavigate();
  const handleTheme = (mode: string) => {
    setTheme(mode);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "If You Logout, all your data in cart will be removed",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie("token");
        removeCookie("uname");
        localStorage.clear();
        dispatch(handleAuth(false));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Success Log Out",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    });
  };

  const navAfterLogin = () => {
    return (
      <div className="flex justify-between items-center gap-4 sm:gap-8 md:gap-12 xl:gap-16 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
        <Link to="/cart/:username">
          <h3 className=" text-@EFF1F3 hover:text-2xl flex gap-1 items-center duration-200">
            <MdShoppingCart className="text-2xl " />
            Cart
          </h3>
        </Link>
        <div className="hs-dropdown relative inline-flex">
          <button
            id="hs-dropdown"
            type="button"
            className=" hs-dropdown-toggle [--placement:top-left] py-3 px-4 m-2 inline-flex justify-center items-center gap-2 rounded-md border text-sm bg-white text-gray-700 shadow-sm align-middle hover:scale-105 focus:outline-none   transition-all text-md dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
          >
            Actions
            <svg
              className="hs-dropdown-open:rotate-180 w-2.5 h-2.5 text-gray-600"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div
            className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 w-56 hidden z-10 mt-2 min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700 dark:divide-gray-700"
            aria-labelledby="hs-dropdown-basic"
          >
            <Link to="/users">
              <h3 className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                <FaUserTie />
                Profile
              </h3>
            </Link>

            <Link to="/upload-book/:username">
              <h3 className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                <FaUpload />
                Upload Book
              </h3>
            </Link>
            <div className="hs-dropdown relative [--strategy:static] sm:[--strategy:absolute] [--adaptive:none]">
              <button
                type="button"
                className="flex items-center w-full gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              >
                <FaChevronLeft />
                List Of Book
              </button>

              <div className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] sm:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 sm:w-48 hidden z-10 sm:mt-2 bg-white sm:drop-shadow-md drop-shadow-lg  rounded-lg p-2 dark:bg-gray-800 sm:dark:border dark:border-gray-700 dark:divide-gray-700 before:absolute sm:border before:-right-5 before:top-0 before:h-full before:w-5 top-0 right-full !mx-[10px]">
                <Link to="/books">
                  <h3 className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                    <GiBookmark />
                    My Books
                  </h3>
                </Link>

                <Link to="/borrow-books/:username">
                  <h3 className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                    <FaBook />
                    My Borrow Books
                  </h3>
                </Link>
              </div>
            </div>

            <button
              onClick={() => {
                handleTheme(theme === "light" ? "dark" : "light");
              }}
              id="btn-dark"
              className="flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            >
              {theme === "dark" ? <MdModeNight /> : <MdSunny />}
              {theme} Mode
            </button>
            <button
              className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
              onClick={() => handleLogout()}
            >
              <MdLogout className="text-lg" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <header className="relative flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-@2A9D8F text-xl py-5 ">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link to="/">
            <p className="flex w-56 text-2xl font-bold text-@EFF1F3 hover:text-white dark:text-white">
              Alta Book Bridge
            </p>
          </Link>

          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-@EFF1F3 text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
              data-hs-collapse="#navbar-with-mega-menu"
              aria-controls="navbar-with-mega-menu"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hs-collapse-open:block hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-with-mega-menu"
          className="hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
        >
          <div className="flex justify-between items-center gap-4 sm:gap-8 md:gap-12 xl:gap-16 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
            {checkToken ? (
              navAfterLogin()
            ) : (
              <Link to="/login">
                <h3 className=" text-@EFF1F3 hover:text-2xl flex gap-1 items-center duration-200">
                  Login / Register
                </h3>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
