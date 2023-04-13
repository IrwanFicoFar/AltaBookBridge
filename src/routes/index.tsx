import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { FC, useState, useEffect, useMemo } from "react";
import axios from "axios";
import { ThemeContext } from "../utils/context";
import { useCookies } from "react-cookie";
import Home from "../pages";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DetailBook from "../pages/DetailBook";
import ProfileUser from "../pages/ProfileUser";
import ListBorrowBook from "../pages/ListBorrowBook";
import CartBorrowBook from "../pages/CartBorrowBook";
import UploadBook from "../pages/UploadBook";
import ListMyBook from "../pages/ListMyBook";
import axios from "axios";

axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/MUJAHID170997/BookBridgeAPI/1.0.0";

axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/MUJAHID170997/BookBridgeAPI/1.0.0";

const Router = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const background = useMemo(() => ({ theme, setTheme }), [theme]);
  const [cookie] = useCookies(["token", "uname"]);
  const checkToken = cookie.token;

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: checkToken ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: checkToken ? <Navigate to="/login" /> : <Register />,
    },
    {
      path: "/users",
      element: <ProfileUser />,
    },
    {
      path: "/books",
      element: <ListMyBook />,
    },
    {
      path: "/upload-book/:username",
      element: <UploadBook />,
    },
    {
      path: "/detail-book/:username",
      element: <DetailBook />,
    },
    {
      path: "/borrow-books/:username",
      element: <ListBorrowBook />,
    },

    {
      path: "/cart/:username",
      element: <CartBorrowBook />,
    },
  ]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={background}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
};

export default Router;
