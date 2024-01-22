import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../state/store';
import { setCurrentPage } from '../../state/slices/resultsSlice';

function PageNumbers() {
  const { currentPage, totalGames } = useSelector(
    (state: RootState) => state.results,
  );
  const dispatch = useDispatch<AppDispatch>();

  const handlePageChange = (pageChange: number) => {
    const newPage = currentPage + pageChange;
    if (newPage < 1 || newPage > totalPages) return;
    dispatch(setCurrentPage(newPage));
  };

  const totalPages = Math.max(Math.ceil(totalGames / 12), 1);

  let startPage: number;
  let endPage: number;

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

  return (
    <>
      {Array.from(
        { length: endPage - startPage + 1 },
        (_, index) => startPage + index,
      ).map(page => (
        <a
          key={page}
          href="#"
          onClick={e => {
            e.preventDefault();
            handlePageChange(page - currentPage);
          }}
          className={`${
            page === currentPage
              ? 'pointer-events-none z-30 bg-indigo-600 text-white ring-indigo-600'
              : 'text-gray-900 ring-gray-300 hover:bg-gray-100'
          } relative hidden w-10 items-center justify-center px-4 py-2 text-sm font-semibold ring-1 ring-inset focus:z-20 focus:outline-offset-0 focus-visible:outline-indigo-600 sm:inline-flex`}
          tabIndex={page === currentPage ? -1 : 0}
        >
          {page}
        </a>
      ))}
    </>
  );
}

export default PageNumbers;
