import React, { useEffect, useState } from 'react';
import '../static/css/FilterBar.css';

const FilterBar = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [scrolled, setScrolled] = useState(false);

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  const handleScroll = () => {
    setScrolled(window.scrollY > 100); // Adjust scroll position as needed
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`filter-bar ${scrolled ? 'scrolled' : ''}`}>
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
