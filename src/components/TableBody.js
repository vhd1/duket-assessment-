import React from 'react';

const TableBody = ({ data, columns, selectedRows, onRowSelect, onDelete }) => (
  <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
    {data.map((item) => (
      <tr
        key={item.id}
        className={`hover:bg-gray-100 dark:hover:bg-neutral-700 ${selectedRows.has(item.id) ? 'bg-gray-200 dark:bg-neutral-600' : ''}`}
      >
        <td className="p-3 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
          <input
            type="checkbox"
            checked={selectedRows.has(item.id)}
            onChange={() => onRowSelect(item.id)}
            className="form-checkbox"
          />
        </td>
        {columns.map((column) => (
          <td
            key={column.key}
            className="p-3 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200"
          >
            {item[column.key] || 'N/A'} 
          </td>
        ))}
        <td className="p-3 whitespace-nowrap text-end text-sm font-medium">
          <button
            type="button"
            onClick={() => onDelete(item.id)} 
            className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-700 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none dark:text-red-500 dark:hover:text-red-400 dark:focus:text-red-400"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
);

export default TableBody;
