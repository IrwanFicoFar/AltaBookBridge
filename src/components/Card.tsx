import { FC, ReactNode } from "react";

interface PropsHandling {
  KindOfHandle: ReactNode;
  Title: string;
  Owner: string;
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

export const CardLanding: FC<PropsHandling> = (props) => {
  const { KindOfHandle, Title, Owner } = props;
  return (
    //   {/* card start*/}
    <div className="flex flex-col rounded-yes bg-@2A9D8F border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      <img
        className="w-full h-auto rounded-yes"
        src="./download.jpeg"
        alt="Image Description"
      />
      <div className="p-4 md:p-5">
        <h3 className="text-md font-bold text-@EFF1F3 hover:text-white dark:text-white">
          {Title}
        </h3>
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