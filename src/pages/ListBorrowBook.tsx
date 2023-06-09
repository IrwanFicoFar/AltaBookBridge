import { FC, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import { CardBorrowBook } from "../components/Card";
import { Loading } from "../components/Loading";
import { Layout } from "../components/Layout";
import { ListBorrowDataType } from "../utils/user";

const username = "users";

const ListBorrowBook: FC = () => {
  const [datas, setDatas] = useState<ListBorrowDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [visibleItems, setVisibleItems] = useState<ListBorrowDataType[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  document.title = `List Borrow Book | Book Management`;

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let newItemsPerPage = 8;

      switch (true) {
        case screenWidth <= 480:
          newItemsPerPage = 2;
          break;
        case screenWidth <= 768:
          newItemsPerPage = 4;
          break;
        case screenWidth <= 1024:
          newItemsPerPage = 6;
          break;
        default:
          newItemsPerPage = 8;
          break;
      }

      setItemsPerPage(newItemsPerPage);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= 2; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
          className={`w-10 h-10 p-4 inline-flex items-center text-sm font-medium rounded-full ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  useEffect(() => {
    // Calculate the total number of pages based on the number of items and items per page
    setTotalPages(Math.ceil(datas.length / itemsPerPage));
  }, [datas, itemsPerPage]);

  useEffect(() => {
    // Calculate the start and end indices of the items to be displayed on the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setVisibleItems(datas.slice(startIndex, endIndex));
  }, [datas, itemsPerPage, currentPage]);

  function handlePageChange(direction: "prev" | "next" | number) {
    if (direction === "prev") {
      // Move to the previous page
      setCurrentPage(currentPage - 1);
    } else if (direction === "next") {
      // Move to the next page
      setCurrentPage(currentPage + 1);
    } else {
      // Move to a specific page
      setCurrentPage(direction);
    }
  }

  useEffect(() => {
    fetchDataListBorrowBook();
  }, []);

  const fetchDataListBorrowBook = () => {
    axios
      .get(`${username}/rent`)
      .then((response) => {
        const { data } = response.data;
        setDatas(data);
      })
      .catch((error) => {
        const { message } = error.message;
        Swal.fire({
          icon: "error",
          title: message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center pt-4 sm:pt-6 md:pt-8 xl:mt-10 ">
            <h1 className="font-bold  text-md md:texl-lg xl:text-xl uppercase flex flex-col justify-center items-center dark:text-slate-100 ">
              List of books I borrowed
              <span className="border-b-4 w-[70%] "></span>
            </h1>
          </div>
          <div className="py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 xl:gap-10 p-4 sm:p-6 md:-8 xl:p-10">
            {visibleItems.map((data) => (
              <CardBorrowBook
                key={username}
                Title={data.title}
                Owner={data.owner_username}
                Time="7 days"
                BookImage={data.book_image}
                MyLink={`/detail-book/${username}`}
              />
            ))}
          </div>
          <div className="my-10 md:mx-5">
            {/* compnent pagination */}
            <nav className="flex justify-center items-center space-x-2">
              <button
                className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
                onClick={() => handlePageChange("prev")}
                disabled={currentPage === 1}
              >
                <span aria-hidden="true">«</span>
                <span>Previous</span>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page: number) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    disabled={currentPage === page}
                    className={`w-10 h-10 p-4 inline-flex items-center text-sm font-medium rounded-full ${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-500"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
                onClick={() => handlePageChange("next")}
                disabled={currentPage === totalPages}
              >
                <span>Next</span>
                <span aria-hidden="true">»</span>
              </button>
            </nav>
            {/* compnent pagination */}
            {/* klik pagination */}
            <div className="hidden md:block">
              <div className="flex gap-2 items-center justify-end">
                <label>Items per page:</label>
                <select
                  value={itemsPerPage}
                  onChange={(event) =>
                    setItemsPerPage(parseInt(event.target.value))
                  }
                  className="py-3 px-4 pr-9 block bg-teal-500 rounded-md text-sm text-white dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                >
                  <option value={5} className="py-5">
                    5
                  </option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
            {/* klik pagination */}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ListBorrowBook;
