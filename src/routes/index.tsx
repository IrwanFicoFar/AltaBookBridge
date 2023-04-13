import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FC } from "react";
import axios from "axios";

import Home from "../pages";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import DetailBook from "../pages/DetailBook";
import ProfileUser from "../pages/ProfileUser";
import ListBorrowBook from "../pages/ListBorrowBook";
import CartBorrowBook from "../pages/CartBorrowBook";
import UploadBook from "../pages/UploadBook";
import ListMyBook from "../pages/ListMyBook";

axios.defaults.baseURL =
  "https://virtserver.swaggerhub.com/MUJAHID170997/BookBridgeAPI/1.0.0";

const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
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

  return <RouterProvider router={router} />;
};

export default Router;
