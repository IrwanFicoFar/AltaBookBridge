import { FC, useEffect, useState, FormEvent, CSSProperties } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import PropagateLoader from "react-spinners/PropagateLoader";

import { Layout } from "../components/Layout";
import { CardLanding } from "../components/Card";
import { ButtonBorrow, ButtonUnavailable } from "../components/Button";

interface DataType {
  title: string;
  book_image: string;
  status: boolean;
  username: string;
}

const override: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "middle",
  margin: "0 auto",
  backgroundColor: "",
};

const Home: FC = () => {
  const [datas, setDatas] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [status, setStatus] = useState<boolean>();
  let [color, setColor] = useState("#ffffff");

  useEffect(() => {
    fetchAllBook();
  }, []);

  const fetchAllBook = () => {
    axios
      .get("/books")
      .then((response) => {
        const { data } = response.data;
        setDatas(data);

        setUsername(data[0].username);
        setStatus(data[0].status);
      })
      .catch((error) => {
        const { message } = error.message;
        alert(message);
      })
      .finally(() => {
        setLoading(true);
      });
  };

  console.log(status);

  // console.log(datas);

  const saveLocalStorage = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const userData = { datas };
    const uniqueKey = Date.now();
    console.log(userData, uniqueKey);
    localStorage.setItem(uniqueKey.toString(), JSON.stringify(userData));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "the book has been saved to Cart",
      showConfirmButton: false,
      timer: 1500,
    });
    setStatus(false);
  };

  return (
    <Layout>
      <div className="py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 xl:gap-10 p-4 sm:p-6 md:-8 xl:p-10"></div>
      {loading ? (
        <div>
          <PropagateLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          {datas.map((data) => (
            <CardLanding
              key={data.username}
              BookImage={data.book_image}
              MyLink={`/detail-book/${data.username}`}
              Title={data.title}
              Owner={data.username}
              KindOfHandle={
                status ? (
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
