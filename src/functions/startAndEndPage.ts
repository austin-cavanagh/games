function startAndEndPage(currentPage: number, totalPages: number) {
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

  return { startPage, endPage };
}

export default startAndEndPage;
