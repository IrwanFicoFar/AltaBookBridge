import { FC, FormEvent, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { CardCartBorrowBook } from "../components/Card";
import { ButtonCart } from "../components/Button";
import Swal from "sweetalert2";
import axios from "axios";

interface TypeData {
  key: string;
  datas: [
    {
      title: string;
      bookImage: string;
      status: boolean;
      username: string;
    }
  ];
}

const CardBorrowBook: FC = () => {
  const [datas, setDatas] = useState<TypeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
      console.log(data);
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

  console.log(datas);

  const handleBorrow = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // axios.post();
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
      <div className=" px-6 py-6 md-to-lg:pb-10 md:pb-16 md:pt-8 md:px-10 lg:pb-20 lg:pt-10 lg:px-20 gap-1 ">
        <h1 className=" font-bold text-md  md:texl-lg xl:text-xl  uppercase flex flex-col ">
          Bucket of borrowed books
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-1 md-to-lg:grid-cols-2  md:flex-row ">
          <div className="w-full">
            {datas.map((data) => (
              <CardCartBorrowBook
                key={data.key}
                BookImage={data.datas[0].bookImage}
                Title={data.datas[0].title}
                Owner={data.datas[0].username}
                Time="7 Days"
                onClick={() => handleDelete(data.key)}
              />
            ))}
          </div>
          <div className=" grid grid-cols-1 justify-center">
            <div className="p-6 px-8 py-10 sm:py-14 md:py-18 sm:px-20 md:px-40 md-to-lg:px-14 lg:px-15 xl:px-5 2xl:px-20  flex flex-col">
              <div className="bg-@EFF1F3 p-10 xl:mx-32 rounded-yes drop-shadow-md">
                <h3 className="text-lg font-bold text-@264653 dark:text-white">
                  Final Proccess to Borrow
                </h3>
                <p className="mt-2 text-@264653">
                  Check each items, to make sure all you borrow in bucket. if
                  you done, then click below to proccess
                </p>
                <div className="mt-4 ">
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
      </div>
    </Layout>
  );
};

export default CardBorrowBook;
