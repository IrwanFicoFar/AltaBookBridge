import { FC, ReactNode } from "react";

interface Props {
  // onClick: React.MouseEventHandler<HTMLButtonElement>;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setItemsPerPage: React.ChangeEventHandler<HTMLSelectElement>;
  handlePageChangePrev: React.MouseEventHandler<HTMLButtonElement>;
  handlePageChangePage: React.MouseEventHandler<HTMLButtonElement>;
  handlePageChangeNext: React.MouseEventHandler<HTMLButtonElement>;
  ChangeEvent: React.ChangeEvent<HTMLSelectElement>;
}

export const Pagination: FC<Props> = (props) => {
  const {
    currentPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    handlePageChangePrev,
    handlePageChangePage,
    handlePageChangeNext,
    ChangeEvent,
  } = props;

  return (
    <div className="mt-10">
      {/* compnent pagination */}
      <nav className="flex justify-center items-center space-x-2">
        <button
          className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
          onClick={handlePageChangePrev}
          disabled={currentPage === 1}
        >
          <span aria-hidden="true">«</span>
          <span>Previous</span>
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (page: number) => (
            <button
              key={page}
              onClick={handlePageChangePage}
              disabled={currentPage === page}
              className={`w-10 h-10 p-4 inline-flex items-center text-sm font-medium rounded-full ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-500"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          className="text-gray-500 hover:text-blue-600 p-4 inline-flex items-center gap-2 rounded-md"
          onClick={handlePageChangeNext}
          disabled={currentPage === totalPages}
        >
          <span>Next</span>
          <span aria-hidden="true">»</span>
        </button>
      </nav>
      {/* compnent pagination */}
      {/* klik pagination */}
      <div>
        <div className="flex gap-2 items-center justify-end">
          <label>Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={(event) => setItemsPerPage(parseInt(ChangeEvent))}
            className="py-3 px-4 pr-9 block bg-teal-500 rounded-md text-sm text-white dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
          >
            <option value={5} className="py-5">
              5
            </option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
      {/* klik pagination */}
    </div>
  );
};
