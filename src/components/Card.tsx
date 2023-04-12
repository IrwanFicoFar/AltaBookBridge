import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ButtonCart, ButtonDelete } from "./Button";

interface PropsHandling {
  KindOfHandle: ReactNode;
  Title: string;
  BookImage: string;
  Owner: string;
  MyLink: string;
}

interface PropsMyListBook {
  Title: string;
  BorrowBy: string;
}

interface PropsBorrowBook {
  Title: string;
  Owner: string;
  Time: string;
}

interface CardCartBorrowBook {
  Title: string;
  BookImage: string;
  Owner: string;
  Time: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const CardLanding: FC<PropsHandling> = (props) => {
  const { KindOfHandle, Title, Owner, MyLink, BookImage } = props;
  return (
    //   {/* card start*/}
    <div className="flex flex-col rounded-yes bg-@2A9D8F border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <img
        className="w-full h-auto rounded-yes"
        src="./download.jpeg"
        alt="Image Description"
      />

      <div className="p-4 md:p-5">
        <Link to={MyLink}>
          <h3 className={BookImage}>{Title}</h3>
        </Link>

        <h3 className="mt-1 text-@EFF1F3 hover:text-white dark:text-gray-400">
          Owner : {Owner}
        </h3>
        <div className="grid grid-cols-1 justify-center items-center px-4 py-4">
          {KindOfHandle}
        </div>
      </div>
    </div>
    //   {/* card end*/}
  );
};

export const CardMyListBook: FC<PropsMyListBook> = (props) => {
  const { BorrowBy, Title } = props;
  return (
    //   {/* card start*/}
    <div className="flex flex-col rounded-yes bg-@2A9D8F border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <img
        className="w-full h-auto rounded-yes"
        src="./download.jpeg"
        alt="Image Description"
      />
      <div className="pb-4 md:pb-5">
        <h3 className="text-md font-bold text-@EFF1F3 hover:text-white dark:text-white p-2 md:p-3">
          {Title}
        </h3>
        <div className="grid grid-cols-1 justify-center items-center py-3 mb-2 px-4 md:px-5 bg-@264653">
          <h3 className="text-@E76F51 text-md ">Borrow By :</h3>
          <h3 className="text-@EFF1F3 hover:text-white text-md font-bold">
            {BorrowBy}
          </h3>
        </div>
      </div>
    </div>
    //   {/* card end*/}
  );
};

export const CardBorrowBook: FC<PropsBorrowBook> = (props) => {
  const { Title, Owner, Time } = props;
  return (
    //   {/* card start*/}
    <div className="flex flex-col rounded-yes bg-@2A9D8F border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <img
        className="w-full h-auto rounded-yes"
        src="./download.jpeg"
        alt="Image Description"
      />
      <div className="pb-4 md:pb-5">
        <h3 className="text-md font-bold text-@EFF1F3 hover:text-white dark:text-white p-2 md:p-3">
          {Title}
        </h3>
        <div className="grid grid-cols-1 justify-center items-center py-3 mb-2 px-4 md:px-5 bg-@264653">
          <h3 className="text-@EFF1F3 text-md ">Owner : {Owner}</h3>
          <h3 className="text-@EFF1F3 text-md ">
            Duration : <span className="text-@E76F51">{Time}</span>
          </h3>
        </div>
      </div>
    </div>
    //   {/* card end*/}
  );
};

export const CardCartBorrowBook: FC<Partial<CardCartBorrowBook>> = (props) => {
  const { Title, Owner, Time, onClick, BookImage } = props;
  return (
    <div className="border-b-4">
      <div className="flex px-2 py-5 md:py-10 items-center">
        <img
          className="w-auto h-24 sm:h-36 md:h-44 rounded-lg"
          src={BookImage}
          alt="Image Description"
        />
        <div className="pb-1 ml-2 sm:ml-5 md:ml-7">
          <table className="">
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td className="px-2 whitespace-nowrap text-md md:text-lg font-semibold text-@264653 dark:text-gray-200">
                  Title
                </td>
                <td className=" text-@264653 text-md md:text-lg dark:text-gray-200">
                  {Title}
                </td>
              </tr>
              <tr>
                <td className=" px-2 whitespace-nowrap text-md md:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Owner
                </td>
                <td className="whitespace-nowrap text-md md:text-lg text-@264653 dark:text-gray-200">
                  {Owner}
                </td>
              </tr>
              <tr>
                <td className=" px-2 whitespace-nowrap text-md md:text-lg font-semibold text-@264653 dark:text-gray-200">
                  Durations
                </td>
                <td className=" whitespace-nowrap text-md md:text-lg text-@264653 dark:text-gray-200">
                  <span className="text-@E76F51">{Time}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="mb-6 flex justify-end">
          <ButtonDelete onClick={onClick} />
        </div>
      </div>
    </div>
  );
};
