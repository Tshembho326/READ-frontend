import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this for navigation
import Helmet from 'react-helmet';
import Header from './Header';
import FilterBar from './FilterBar';
import BookCard from './BookCard';
import bookData from '../../Books.json'; 
import '../static/css/library.css';


import littlePigs from '../static/images/littlePigs.png';
import goldi from '../static/images/goldi.png';
import catHat from '../static/images/catHat.png';
import charlotteWeb from '../static/images/charlotteWeb.png';
import harryPotter from '../static/images/harryPotter.png';
import wizardOfOz from '../static/images/wizardOfOz.png';
import aliceWonderland from '../static/images/aliceWonderland.png';
import peterPan from '../static/images/peterPan.png';
import lionWatch from '../static/images/lionWatch.png';

const Library = () => {
  const [filteredBooks, setFilteredBooks] = useState(bookData); 
  const navigate = useNavigate(); // This will allow BookCard to navigate

  // Map image names to actual imported images
  const imageMap = {
    littlePigs,
    goldi,
    catHat,
    charlotteWeb,
    harryPotter,
    wizardOfOz,
    aliceWonderland,
    peterPan,
    lionWatch
  };

  const handleFilterChange = (filter) => {
    const filtered = bookData.filter(book => { 
      if (!filter || filter === 'All') {
        return true; // Show all books if no filter or "All" is selected
      }
      return book.difficulty === filter; // Filter by difficulty
    });
    setFilteredBooks(filtered);
  };

  return (
    <div className="library">
      <Helmet>
        <title>Library | READ</title>
      </Helmet>
      <Header />
      <FilterBar onFilterChange={handleFilterChange} />

      <div className="book-list">
        {filteredBooks.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            coverImage={imageMap[book.coverImage]} // Map cover image to correct path
            difficulty={book.difficulty}
            navigate={navigate} // Pass navigate for use in BookCard
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
