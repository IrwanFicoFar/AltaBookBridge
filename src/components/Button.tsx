import { FC } from "react";

interface Props {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const ButtonBorrow: FC<Props> = (props) => {
  const { navigator, onClick } = props;
  return (
    <button
      className="mt-3 py-3 px-4 inline-flex justify-center items-center rounded-md text-md font-semibold bg-@EFF1F3 text-@2A9D8F hover:bg-white focus:outline-none transition-all drop-shadow-lg hover:drop-shadow-xl dark:focus:ring-offset-gray-800"
      onClick={onClick}
    >
      Borrow
    </button>
  );
};

export const ButtonUnavailable: FC = () => {
  return (
    <button className="mt-3 py-3 px-4 inline-flex justify-center items-center rounded-md text-md font-semibold bg-@E76F51 text-@EFF1F3 hover:text-white focus:outline-none transition-all drop-shadow-lg hover:drop-shadow-xl dark:focus:ring-offset-gray-800">
      Unavailable
    </button>
  );
};

export const ButtonCart: FC<Props> = (props) => {
  const { navigator } = props;
  return (
    <button
      className="w-full py-4 inline-flex justify-center items-center rounded-yes text-md font-semibold bg-@2A9D8F text-@EFF1F3 hover:bg-@E76F51 focus:outline-none transition-all drop-shadow-lg hover:drop-shadow-xl dark:focus:ring-offset-gray-800"
      onClick={() => {
        navigator;
      }}
    >
      Proccess
    </button>
  );
};

export const ButtonEdit: FC = () => {
  return <div>Button</div>;
};

export const ButtonAdd: FC = () => {
  return <div>Button</div>;
};
