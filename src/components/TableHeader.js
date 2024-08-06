import React from 'react';

const SortIcon = ({ direction }) => {

  const activeColor = 'text-blue-500 dark:text-blue-400';
  const defaultColor = 'text-gray-400 dark:text-neutral-500';

  const ascColorClass = direction === 'asc' ? activeColor : defaultColor;
  const descColorClass = direction === 'desc' ? activeColor : defaultColor;

  return (
    <svg
      className="w-4 h-4 ms-1 -me-0.5"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        className={ascColorClass}
        d="m7 15 5 5 5-5" // Ascending arrow path
      />
      <path
        className={descColorClass}
        d="m7 9 5-5 5 5" // Descending arrow path
      />
    </svg>
  );
};

const TableHeaderCell = ({ column, onSort, sortConfig, children }) => {
  const isSorted = sortConfig?.column === column;
  const direction = isSorted ? sortConfig.direction : null;

  return (
    <th
      scope="col"
      className="px-0	py-1 group text-start font-normal focus:outline-none cursor-pointer"
      onClick={() => onSort(column)}
    >
      <div className="py-1 px-2.5 inline-flex items-center border border-transparent text-sm text-gray-500 rounded-md hover:border-gray-200 dark:text-neutral-500 dark:hover:border-neutral-700">
        {children}
        <SortIcon direction={direction} />
      </div>
    </th>
  );
};

const TableHeader = ({ columns, onSort, sortConfig, onSelectAll, onDeselectAll }) => (
  <thead className="bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
    <tr>
      <th className="py-1">
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              onSelectAll();
            } else {
              onDeselectAll();
            }
          }}
        />
      </th>
      {columns.map((column) => (
        <TableHeaderCell
          key={column.key}
          column={column.key}
          onSort={onSort}
          sortConfig={sortConfig}
        >
          {column.label}
        </TableHeaderCell>
      ))}
      <th className="py-1 text-end font-normal text-sm text-gray-500 dark:text-neutral-500">
        Action
      </th>
    </tr>
  </thead>
);

export default TableHeader;
