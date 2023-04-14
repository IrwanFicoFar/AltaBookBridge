import { FC, useEffect, useState, FormEvent, CSSProperties } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { RootState } from "../utils/types/redux";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Layout } from "../components/Layout";
import { CardLanding } from "../components/Card";
import { ButtonBorrow, ButtonUnavailable } from "../components/Button";
import { Loading } from "../components/Loading";
import { handleAuth } from "../utils/redux/reducers/reducers";
import { useCookies } from "react-cookie";

interface DataType {
  title: string;
  book_image: string;
  status: boolean;
  username: string;
}

const Home: FC = () => {
  const { isAvailabe } = useSelector((state: RootState) => state.data);
  const [datas, setDatas] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [status, setStatus] = useState<boolean>();
  const [cookie] = useCookies(["token"]);
  const dispatch = useDispatch();

  const checkToken = cookie.token;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [visibleItems, setVisibleItems] = useState<DataType[]>([]);

  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let newItemsPerPage = 8;

      switch (true) {
        case screenWidth <= 480:
          newItemsPerPage = 4;
          break;
        case screenWidth <= 768:
          newItemsPerPage = 6;
          break;
        case screenWidth <= 1024:
          newItemsPerPage = 8;
          break;
        default:
          newItemsPerPage = 12;
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
    fetchAllBook();
  }, []);

  // const fetchAllBook = () => {
  //   const keys = Object.keys(localStorage);
  //   const values = keys.map((key) => {
  //     const data = localStorage.getItem(key);

  //     if (data) {
  //       const parsedData = JSON.parse(data);
  //       if (parsedData) {
  //         return { ...parsedData, key };
  //       }
  //     }
  //     return null;
  //   });
  //   setDatas(values.filter((data) => data !== null));
  // };

  const fetchAllBook = () => {
    axios
      .get("/books")
      .then((response) => {
        const { data } = response.data;
        setDatas(data);
        setUsername(data[0].username);
        setStatus(data[0].status);
        dispatch(handleAuth({ isAvailabe: data[0].status }));
      })
      .catch((error) => {
        const { message } = error.message;
        alert(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveLocalStorage = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const userData = { datas };
    const uniqueKey = Date.now();
    localStorage.setItem(uniqueKey.toString(), JSON.stringify(userData));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "the book has been saved to Cart",
      showConfirmButton: false,
      timer: 1500,
    });
    dispatch(handleAuth({ isAvailabe: false }));
    setStatus(false);
  };

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div className="py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 xl:gap-10 p-4 sm:p-6 md:-8 xl:p-10">
          {visibleItems.map((data) => (
            <CardLanding
              key={data.username}
              BookImage={data.book_image}
              MyLink={`/detail-book/${data.username}`}
              Title={data.title}
              Owner={data.username}
              KindOfHandle={
                checkToken ? (
                  isAvailabe ? (
                    <ButtonBorrow
                      onClick={(event) => saveLocalStorage(event)}
                    />
                  ) : (
                    <ButtonUnavailable />
                  )
                ) : (
                  <></>
                )
              }
            />
          ))}
        </div>
      )}
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
          <div className="flex gap-2 items-center justify-end dark:text-gray-400">
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
    </Layout>
  );
};

export default Home;
