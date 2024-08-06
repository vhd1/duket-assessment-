"use client"
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TablePagination from './TablePagination';
import { exportToCSV, exportToExcel, exportToPDF, printTable } from '../utils/exportUtils'
import FilterButton from './FilterDropdown';

const Table = ({ columns, data }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHideColumnsDropdownOpen, setIsHideColumnsDropdownOpen] = useState(false);
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false);
  const [pageSize, setPageSize] = useState(13);
  const [visibleColumns, setVisibleColumns] = useState(columns.map(col => col.key));
  const [tableData, setTableData] = useState(data);

  const filteredData = useMemo(() => {
    if (!searchQuery && minAge === '' && maxAge === '') return tableData;

    return tableData.filter(item => {
      const searchMatch = columns.some(column => {
        const value = item[column.key];
        return value != null && value.toString().toLowerCase().includes(searchQuery.toLowerCase());
      });

      const age = item.age;
      const ageMatch = (minAge === '' || age >= parseInt(minAge, 10)) &&
        (maxAge === '' || age <= parseInt(maxAge, 10));

      return searchMatch && ageMatch;
    });
  }, [searchQuery, minAge, maxAge, tableData, columns]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.column] < b[sortConfig.column]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.column] > b[sortConfig.column]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.column === column && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ column, direction });
  };

  const handlePageChange = useCallback((page) => setCurrentPage(page), []);

  const handleRowSelect = (rowId) => {
    setSelectedRows(prevSelected => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(rowId)) {
        newSelected.delete(rowId);
      } else {
        newSelected.add(rowId);
      }
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    setSelectedRows(new Set(paginatedData.map(item => item.id)));
  };

  const handleDeselectAll = useCallback(() => setSelectedRows(new Set()), []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMinAgeChange = useCallback((e) => setMinAge(e.target.value), []);
  const handleMaxAgeChange = useCallback((e) => setMaxAge(e.target.value), []);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleToggleHideColumnsDropdown = () => {
    setIsHideColumnsDropdownOpen(prev => !prev);
  };

  const handleToggleExportDropdown = () => {
    setIsExportDropdownOpen(prev => !prev);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleColumnVisibilityChange = (key) => {
    setVisibleColumns(prev =>
      prev.includes(key) ? prev.filter(col => col !== key) : [...prev, key]
    );
  };
  const handleDelete = (rowId) => {
    setTableData(prevData => prevData.filter(item => item.id !== rowId));
  };
  const handleExport = (type) => {
    const tableElement = document.querySelector('table');
    switch (type) {
      case 'csv':
        exportToCSV(tableElement, columns);
        break;
      case 'excel':
        exportToExcel(tableElement, columns);
        break;
      case 'pdf':
        exportToPDF(tableElement, columns);
        break;
      case 'print':
        printTable(tableElement);
        break;
      default:
        break;
    }
    setIsExportDropdownOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById('dropdown-menu');
      const hideColumnsDropdown = document.getElementById('hide-columns-dropdown');
      const exportDropdown = document.getElementById('export-dropdown');
      if (dropdown && !dropdown.contains(event.target) && hideColumnsDropdown && !hideColumnsDropdown.contains(event.target) && exportDropdown && !exportDropdown.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsHideColumnsDropdownOpen(false);
        setIsExportDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, currentPage, pageSize]);

  return (
    <div className="table-container overflow-x-auto">
      <div className="relative overflow-x-auto">
        <div className="p-4">
          <div className="h-8 mb-4 flex justify-between items-center gap-4">

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="border border-gray-300 p-2 rounded-md"
              />

            </div>


            <div className="flex gap-4">
              <div className="relative">
                <FilterButton isDropdownOpen={isDropdownOpen} onToggleDropdown={handleToggleDropdown} />
                {isDropdownOpen && (
                  <div
                    id="dropdown-menu"
                    className="absolute bg-white border border-gray-200 shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-900 dark:border-neutral-700"
                  >
                    <div className="max-w-sm flex gap-x-2">
                      <input
                        id="hs-input-number-min-age"
                        type="number"
                        placeholder="Min age"
                        value={minAge}
                        onChange={handleMinAgeChange}
                        className="py-1 px-2.5 block w-20 border-gray-200 rounded-md text-[13px] focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"
                        style={{ MozAppearance: 'textfield' }}
                      />
                      <input
                        id="hs-input-number-max-age"
                        type="number"
                        placeholder="Max age"
                        value={maxAge}
                        onChange={handleMaxAgeChange}
                        className="py-1 px-2.5 block w-20 border-gray-200 rounded-md text-[13px] focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500"
                        style={{ MozAppearance: 'textfield' }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  id="hide-columns-btn"
                  type="button"
                  onClick={handleToggleHideColumnsDropdown}
                  className="h-8 py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                  Hide Columns
                  <svg className={`hs-dropdown-open:rotate-180 ${isHideColumnsDropdownOpen ? 'rotate-180' : ''}`} width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                </button>

                {isHideColumnsDropdownOpen && (
                  <div
                    id="hide-columns-dropdown"
                    className="absolute bg-white border border-gray-200 shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-900 dark:border-neutral-700"
                  >
                    {columns.map(column => (
                      <label key={column.key} className="block">
                        <input
                          type="checkbox"
                          checked={visibleColumns.includes(column.key)}
                          onChange={() => handleColumnVisibilityChange(column.key)}
                          className="mr-2"
                        />
                        {column.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  id="export-btn"
                  type="button"
                  onClick={handleToggleExportDropdown}
                  className="h-8 py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                ><i class="fa-solid fa-download"></i>
                  Export
                  <svg className={`hs-dropdown-open:rotate-180 ${isExportDropdownOpen ? 'rotate-180' : ''}`} width="10" height="10" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
                  </svg>
                </button>

                {isExportDropdownOpen && (
                  <div
                    id="export-dropdown"
                    className="absolute bg-white border border-gray-200 shadow-md rounded-lg p-2 mt-2 dark:bg-neutral-900 dark:border-neutral-700"
                  >
                    <button onClick={() => handleExport('csv')} className="block px-4 py-2  inline-flex items-center gap-x-2 text-sm text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800">
                    <i className="fas fa-file-csv mr-2"></i> CSV
                    </button>
                    <button onClick={() => handleExport('excel')} className="block px-4 py-2  inline-flex items-center gap-x-2 text-sm text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800">
                    <i className="fas fa-file-excel mr-2"></i> Excel
                    </button>
                    <button onClick={() => handleExport('pdf')} className="block px-4 py-2  inline-flex items-center gap-x-2 text-sm text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800">
                    <i className="fas fa-file-pdf mr-2"></i> PDF
                    </button>
                    <button onClick={() => handleExport('print')} className="block px-4 py-2  inline-flex items-center gap-x-2 text-sm text-gray-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-800">
                    <i class="fa-solid fa-print"></i>
                      Print
                    </button>
                  </div>
                )}
              </div>

              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="h-8 text-xs border border-gray-300 p-2 rounded-md"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={40}>40</option>
              </select>
            </div>
          </div>

        </div>
        <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
          <TableHeader
            columns={columns.filter(col => visibleColumns.includes(col.key))}
            onSort={handleSort}
            sortConfig={sortConfig}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
          />
          <TableBody
            data={paginatedData}
            columns={columns.filter(col => visibleColumns.includes(col.key))}
            selectedRows={selectedRows}
            onRowSelect={handleRowSelect}
            onDelete={handleDelete}
          />
        </table>
      </div>
      <TablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={filteredData.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
