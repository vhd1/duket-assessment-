// FilterButton.jsx
import React from 'react';

const FilterButton = ({ isDropdownOpen, onToggleDropdown }) => {
  return (
    <button
      id="hs-dropdown-filter"
      type="button"
      onClick={onToggleDropdown}
      className="h-8 py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
    >
      Filter
      <svg
        className={`hs-dropdown-open:rotate-180 ${isDropdownOpen ? 'rotate-180' : ''}`}
        width="10"
        height="10"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  );
};

export default FilterButton;
