import { FC, useEffect, useState, FormEvent } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Layout } from "../components/Layout";
import { CardLanding } from "../components/Card";
import { ButtonBorrow, ButtonUnavailable } from "../components/Button";

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
  const [username, setUsername] = useState<string>("");

  // const params = useParams();

  useEffect(() => {
    fetchAllBook();
  }, []);

  // const { username } = params;

  // console.log(username);

  const fetchAllBook = () => {
    axios
      .get("books")
      .then((response) => {
        const { data } = response.data;
        // console.log(data);
        setDatas(data);
        setUsername(data[0].username);
        // console.log(data[0].username);
      })
      .catch((error) => {
        const { message } = error.message;
        alert(message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const saveLocalStorage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = { datas };
    const uniqueKey = Date.now();
    console.log(userData, uniqueKey);
    localStorage.setItem(uniqueKey.toString(), JSON.stringify(userData));
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
              MyLink={`/detail-book/${data.username}`}
              Title={data.title}
              Owner={data.username}
              KindOfHandle={
                data.status ? (
                  <ButtonBorrow onClick={(event) => saveLocalStorage(event)} />
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
