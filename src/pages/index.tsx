import { FC, useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { CardLanding } from "../components/Card";
import { ButtonBorrow, ButtonUnavailable } from "../components/Button";

const Home: FC = () => {
  const [state1, setState] = useState<boolean>(true);
  const [state2, set2State] = useState<boolean>(false);

  return (
    <Layout>
      <div className="py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 xl:gap-10 p-4 sm:p-6 md:-8 xl:p-10">
        <CardLanding
          Title="Learn Code with JavaScricpt"
          Owner="Irwan"
          KindOfHandle={
            state1 ? (
              <ButtonBorrow navigator="/borrow-books" />
            ) : (
              <ButtonUnavailable />
            )
          }
        />
        <CardLanding
          Title="Learn Code with JavaScricpt"
          Owner="Irwan"
          KindOfHandle={
            state2 ? (
              <ButtonBorrow navigator="/borrow-books" />
            ) : (
              <ButtonUnavailable />
            )
          }
        />
        <CardLanding
          Title="Learn Code with JavaScricpt"
          Owner="Irwan"
          KindOfHandle={
            state1 ? (
              <ButtonBorrow navigator="/borrow-books" />
            ) : (
              <ButtonUnavailable />
            )
          }
        />
        <CardLanding
          Title="Learn Code with JavaScricpt"
          Owner="Irwan"
          KindOfHandle={
            state1 ? (
              <ButtonBorrow navigator="/borrow-books" />
            ) : (
              <ButtonUnavailable />
            )
          }
        />
        <CardLanding
          Title="Learn Code with JavaScricpt"
          Owner="Irwan"
          KindOfHandle={
            state2 ? (
              <ButtonBorrow navigator="/borrow-books" />
            ) : (
              <ButtonUnavailable />
            )
          }
        />

        <CardLanding
          Title="Learn Code with JavaScricpt"
          Owner="Irwan"
          KindOfHandle={
            state2 ? (
              <ButtonBorrow navigator="/borrow-books" />
            ) : (
              <ButtonUnavailable />
            )
          }
        />
      </div>
    </Layout>
  );
};

export default Home;
