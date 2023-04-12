import { FC, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { CardLanding } from "../components/Card";
import { ButtonBorrow, ButtonUnavailable } from "../components/Button";
import axios from "axios";

interface DataType {
  title: string;
  status: boolean;
  username: string;
}

const Home: FC = () => {
  const [datas, setDatas] = useState<DataType[]>([]);
  const [state1, setState] = useState<boolean>(true);
  const [state2, set2State] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAllBook();
  }, []);

  const fetchAllBook = () => {
    axios
      .get("books")
      .then((response) => {
        const { data } = response.data;
        // console.log(data);
        setDatas(data);
      })
      .catch((error) => {
        const { message } = error.message;
        alert(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // console.log(datas);
  return (
    <Layout>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 xl:gap-10 p-4 sm:p-6 md:-8 xl:p-10">
          {datas.map((data) => (
            <CardLanding
              Title={data.title}
              Owner={data.username}
              KindOfHandle={
                data.status ? (
                  <ButtonBorrow navigator="/borrow-books" />
                ) : (
                  <ButtonUnavailable />
                )
              }
            />
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Home;
