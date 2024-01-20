import { useDispatch, useSelector } from "react-redux";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { AppDispatch, RootState } from "../state/store";
import { setCurrentPage } from "../state/slices/resultsSlice";

function PagesContainer() {
  const { currentPage, totalGames } = useSelector(
    (state: RootState) => state.results,
  );
  const dispatch = useDispatch<AppDispatch>();
  const totalPages = Math.max(Math.ceil(totalGames / 12), 1);

  const handlePageChange = (pageChange: number) => {
    const newPage = currentPage + pageChange;
    if (newPage < 1 || newPage > totalPages) return;
    dispatch(setCurrentPage(newPage));
  };

  const renderPageNumbers = () => {
    let startPage, endPage;

    if (currentPage <= 3) {
      startPage = 1;
      endPage = Math.min(5, totalPages);
    } else if (currentPage + 2 >= totalPages) {
      startPage = Math.max(totalPages - 4, 1);
      endPage = totalPages;
    } else {
      startPage = currentPage - 2;
      endPage = currentPage + 2;
    }

    const pageLinks = [];
    for (let i = startPage; i <= endPage; i++) {
      pageLinks.push(
        <a
          key={i}
          href="#"
          onClick={() => handlePageChange(i - currentPage)}
          className={`${
            i === currentPage
              ? "pointer-events-none z-30 bg-indigo-600 text-white ring-indigo-600"
              : "text-gray-900 ring-gray-300 hover:bg-gray-100"
          } relative hidden w-10 items-center justify-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 focus-visible:outline-indigo-600 sm:inline-flex`}
        >
          {i}
        </a>,
      );
    }

    return pageLinks;
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">
            {totalGames === 0 ? 0 : (currentPage - 1) * 12 + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {totalGames === 0 ? 0 : Math.min(currentPage * 12, totalGames)}
          </span>{" "}
          of <span className="font-medium">{totalGames.toLocaleString()}</span>{" "}
          results
        </p>
      </div>

      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <a
            href="#"
            onClick={() => handlePageChange(-1)}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 focus-visible:outline-indigo-600"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </a>

          {renderPageNumbers()}

          <a
            href="#"
            onClick={() => handlePageChange(+1)}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 focus-visible:outline-indigo-600"
          >
            <span className="sr-only">Next</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </div>
  );
}

export default PagesContainer;
