import { FC } from "react";
import { Layout } from "../components/Layout";
import { CardMyListBook } from "../components/Card";

const ListMyBook: FC = () => {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center pt-4 sm:pt-6 md:pt-8 xl:mt-10 ">
        <h1 className="font-bold text-md md:texl-lg xl:text-xl  uppercase flex flex-col justify-center items-center">
          my list book
          <span className="border-b-4 w-[70%] "></span>
        </h1>
      </div>
      <div className=" py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 xl:gap-10 p-4 sm:p-6 md:-8 xl:p-10">
        <CardMyListBook
          Title="Learn Code with JavaScricpt"
          BorrowBy="Zakaria"
        />
        <CardMyListBook
          Title="Learn Code with JavaScricpt"
          BorrowBy="Zakaria"
        />
        <CardMyListBook
          Title="Learn Code with JavaScricpt"
          BorrowBy="Zakaria"
        />
        <CardMyListBook
          Title="Learn Code with JavaScricpt"
          BorrowBy="Zakaria"
        />
        <CardMyListBook
          Title="Learn Code with JavaScricpt"
          BorrowBy="Zakaria"
        />
        <CardMyListBook
          Title="Learn Code with JavaScricpt"
          BorrowBy="Zakaria"
        />
      </div>
    </Layout>
  );
};

export default ListMyBook;
