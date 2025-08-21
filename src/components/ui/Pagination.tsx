type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <div className="join">
        <button
          onClick={handlePrevious}
          className="join-item btn"
          disabled={currentPage === 1}
        >
          «
        </button>
        <button className="join-item btn">
          Page {currentPage} of {totalPages}
        </button>
        <button
          onClick={handleNext}
          className="join-item btn"
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}