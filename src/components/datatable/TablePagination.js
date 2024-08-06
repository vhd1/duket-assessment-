import React from 'react';

const TablePagination = ({ currentPage, pageSize, totalItems, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  return (
    <div className="flex items-center space-x-1 mt-4">
      <button
        type="button"
        className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span aria-hidden="true">«</span>
        <span className="sr-only">Previous</span>
      </button>
      <div className="flex items-center space-x-1 [&>.active]:bg-gray-100 dark:[&>.active]:bg-neutral-700">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full ${currentPage === i + 1 ? 'bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-white' : 'text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700'}`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="p-2.5 min-w-[40px] inline-flex justify-center items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="sr-only">Next</span>
        <span aria-hidden="true">»</span>
      </button>
    </div>
  );
};

export default TablePagination;
