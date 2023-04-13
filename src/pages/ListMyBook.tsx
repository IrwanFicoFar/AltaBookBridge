import { FC, useState, useEffect } from "react";
import { Layout } from "../components/Layout";
import { CardMyListBook } from "../components/Card";
import axios from "axios";
import { Loading } from "../components/Loading";

interface DataType {
  title: string;
  book_image: string;
  rent_username: string;
}
const username = "users";

const ListMyBook: FC = () => {
  const [datas, setDatas] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchDataListMyBook();
  }, []);

  const fetchDataListMyBook = () => {
    axios
      .get(`${username}/books`)
      .then((response) => {
        const { data } = response.data;
        // console.log(data);
        setDatas(data);
      })
      .catch((error) => {
        const { message } = error.message;
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  console.log(datas[0]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex flex-col justify-center items-center pt-4 sm:pt-6 md:pt-8 xl:mt-10 ">
            <h1 className="font-bold text-md md:texl-lg xl:text-xl  uppercase flex flex-col justify-center items-center dark:text-slate-100">
              my list book
              <span className="border-b-4 w-[70%] "></span>
            </h1>
          </div>
          <div className=" py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 xl:gap-10 p-4 sm:p-6 md:-8 xl:p-10">
            {datas.map((data) => (
              <CardMyListBook
                key={username}
                Title={data.title}
                BookImage={data.book_image}
                BorrowBy={data.rent_username}
                MyLink={`/detail-book/${username}`}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ListMyBook;
