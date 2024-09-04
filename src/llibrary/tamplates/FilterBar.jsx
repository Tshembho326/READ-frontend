import React, { useState } from 'react';
import '../static/css/FilterBar.css';

const FilterBar = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All'); // Start with "All"

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="filter-bar">
      <button 
        className={activeFilter === 'All' ? 'active' : ''}
        onClick={() => handleFilterClick('All')}
      >
        All
      </button>
      <button
        className={activeFilter === 'Easy' ? 'active' : ''}
        onClick={() => handleFilterClick('Easy')}
      >
        Easy Reads
      </button>
      <button
        className={activeFilter === 'Medium' ? 'active' : ''}
        onClick={() => handleFilterClick('Medium')}
      >
        Medium Reads
      </button>
      <button
        className={activeFilter === 'Hard' ? 'active' : ''}
        onClick={() => handleFilterClick('Hard')}
      >
        Hard Reads
      </button>
    </div>
  );
};

export default FilterBar;
