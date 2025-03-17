interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, onPageChange}): React.JSX.Element => {
    const handlePrev = () => {
      if (currentPage > 1) onPageChange(currentPage - 1); //cant go below 1 (refactorable), setPage to new value
    };
    const handleNext = () => {
      if (currentPage < totalPages) onPageChange(currentPage+ 1); //cant go above last page
    };

  return (
      <div className="pagination flex justify-center my-[120px] text-center text-2xl">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`fas fa-chevron-left w-[50px] h-[50px] mr-5 
            ${currentPage === 1 ? 'text-[gray]' : ''}`}
        ></button>
        <div className="">
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`px-5 py-1
                  ${pageNumber === currentPage ? 'text-[black]' : 'text-[gray]'}`}
              >
                {pageNumber}
              </button>
            );
          })}
        </div>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`fas fa-chevron-right w-[50px] h-[50px] ml-5
            ${currentPage === totalPages ? 'text-[gray]' : ''}`}
        ></button>
      </div>
  );
}
export default Pagination