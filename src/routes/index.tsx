import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FC } from "react";

import Home from "../pages";
import DetailBook from "../pages/DetailBook";
import ProfileUser from "../pages/ProfileUser";
import ListBorrowBook from "../pages/ListBorrowBook";
import CartBorrowBook from "../pages/CartBorrowBook";
import UploadBook from "../pages/UploadBook";
import ListMyBook from "../pages/ListMyBook";

const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
      path: "/upload-book",
      element: <UploadBook />,
    },
    {
      path: "/detail-book",
      element: <DetailBook />,
    },
    {
      path: "/borrow-book",
      element: <ListBorrowBook />,
    },

    {
      path: "/cart",
      element: <CartBorrowBook />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
