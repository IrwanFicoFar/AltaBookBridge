import { FC } from "react";
import { Layout } from "../components/Layout";
import { CardCartBorrowBook } from "../components/Card";
import { ButtonCart } from "../components/Button";

const CardBorrowBook: FC = () => {
  return (
    <Layout>
      <div className=" px-20 py-20 gap-16">
        <h1 className=" font-bold text-md  md:texl-lg xl:text-xl  uppercase flex flex-col ">
          Bucket of borrowed books
        </h1>
        <div className="flex justify-between">
          <div className="w-[70%]">
            <CardCartBorrowBook
              Title="JS Code learning"
              Owner="Kristain"
              Time="7 Days"
            />
            <CardCartBorrowBook
              Title="JS Code learning"
              Owner="Kristain"
              Time="7 Days"
            />
            <CardCartBorrowBook
              Title="JS Code learning"
              Owner="Kristain"
              Time="7 Days"
            />
          </div>
          <div className=" flex justify-center h-[50%]">
            <div className=" bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
              <div className="p-4 md:p-7 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  Card title
                </h3>
                <p className="mt-2 text-gray-800 dark:text-gray-400">
                  Check each items, to make sure all you borrow in bucket. if
                  you done, then click below to proccess
                </p>
                <div>
                  <ButtonCart navigator="" />
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
