import { FC, FormEvent, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { CardCartBorrowBook } from "../components/Card";
import { ButtonCart } from "../components/Button";
import Swal from "sweetalert2";
import axios from "axios";
import { Loading } from "../components/Loading";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
// import { Pagination } from "../components/Pagination";

interface TypeData {
  key: string;
  datas: [
    {
      title: string;
      book_image: string;
      status: boolean;
      username: string;
    }
  ];
}

const CardBorrowBook: FC = () => {
  const [datas, setDatas] = useState<TypeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [visibleItems, setVisibleItems] = useState<TypeData[]>([]);

  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  const [cookie] = useCookies(["token"]);
  const getToken = cookie.token;

  const navigate = useNavigate();

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

    // Show first few pages
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

    // Show ellipsis if there are more than 5 pages
    if (totalPages > 5) {
      pageNumbers.push(<span key="ellipsis">...</span>);
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
    fetchFromLocal();
    setLoading(false);
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchFromLocal = () => {
    const keys = Object.keys(localStorage);
    const values = keys.map((key) => {
      const data = localStorage.getItem(key);

      if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData) {
          return { ...parsedData, key };
        }
      }
      return null;
    });
    setDatas(values.filter((data) => data !== null));
  };

  const handleStorageChange = (event: StorageEvent) => {
    if (
      event.storageArea === localStorage &&
      event.key !== null &&
      event.oldValue !== event.newValue
    ) {
      fetchFromLocal();
    }
  };

  const username = "kristain09";

  const Headers = {
    headers: {
      Authorization: `Bearer ${getToken}`,
      "Content-Type": "application/json",
    },
  };

  const handleBorrow = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios.post(`users/checkout`, datas, Headers).then((response) => {
      Swal.fire({
        icon: "success",
        title: "Successfully",
        showCancelButton: false,
        showConfirmButton: true,
      })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            navigate("/");
          }
        })
        .catch((error) => {
          const { message } = error.message;
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        });
    });
  };

  const handleDelete = (key: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem(key);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      })
      .finally(() => fetchFromLocal());
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className=" px-6 py-6 md-to-lg:pb-10 md:pb-16 md:pt-8 md:px-10 lg:pb-20 lg:pt-10 lg:px-20 gap-1 ">
          <h1 className=" font-bold text-md  md:texl-lg xl:text-xl  uppercase flex flex-col ">
            Bucket of borrowed books
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-1 md-to-lg:grid-cols-2  md:flex-row ">
            <div className="w-full">
              {visibleItems.map((data) => (
                <CardCartBorrowBook
                  key={data.key}
                  BookImage={data.datas[0].book_image}
                  Title={data.datas[0].title}
                  Owner={data.datas[0].username}
                  Time="7 Days"
                  onClick={() => handleDelete(data.key)}
                />
              ))}
            </div>
            <div className=" grid grid-cols-1 justify-center">
              <div className="p-6 px-8 py-10 sm:py-14 md:py-18 sm:px-20 md:px-40 md-to-lg:px-14 lg:px-15 xl:px-5 2xl:px-20  flex flex-col">
                <div className=" bg-@EFF1F3 p-10 xl:mx-32 rounded-yes drop-shadow-md flex flex-col justify-between">
                  <h3 className="text-lg font-bold text-@264653 dark:text-white">
                    Final Proccess to Borrow
                  </h3>
                  <p className="mt-2 text-@264653">
                    Check each items, to make sure all you borrow in bucket. if
                    you done, then click below to proccess
                  </p>
                  <div className="mt-4 hover:scale-105 duration-300">
                    <ButtonCart
                      onClick={(event) => {
                        handleBorrow(event);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10">
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

export default CardBorrowBook;
