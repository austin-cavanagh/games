import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { setCurrentPage } from '../../state/slices/resultsSlice';
import PageNumbers from './PageNumbers';

function PagesDisplayRight() {
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

  return (
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
      <a
        href="#"
        data-testid="pages-left-a-tag"
        onClick={e => {
          e.preventDefault();
          handlePageChange(-1);
        }}
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 focus-visible:outline-indigo-600"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="h-5 w-5" data-testid="pages-left-chevron" />
      </a>

      <PageNumbers />

      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          handlePageChange(+1);
        }}
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 focus-visible:outline-indigo-600"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon
          className="h-5 w-5"
          data-testid="pages-right-chevron"
        />
      </a>
    </nav>
  );
}

export default PagesDisplayRight;
