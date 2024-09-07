import React, { useState } from 'react';
import Header from './Header';
import FilterBar from './FilterBar';
import BookCard from './BookCard';
import { Helmet } from 'react-helmet';
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
  const [books] = useState([
    // Easy books
    {
      title: 'The Three Little Pigs',
      author: 'Traditional',
      coverImage: littlePigs, 
      difficulty: 'Easy',
    },
    {
      title: 'Goldilocks and the Three Bears',
      author: 'Traditional',
      coverImage: goldi, 
      difficulty: 'Easy',
    },
    {
      title: 'The Cat in the Hat',
      author: 'Dr. Seuss',
      coverImage: catHat, 
      difficulty: 'Easy',
    },
    // Medium books
    {
      title: 'Charlotte\'s Web',
      author: 'E. B. White',
      coverImage: charlotteWeb, 
      difficulty: 'Medium',
    },
    {
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      coverImage: harryPotter, 
      difficulty: 'Medium',
    },
    {
      title: 'The Wizard of Oz',
      author: 'L. Frank Baum',
      coverImage: wizardOfOz, 
      difficulty: 'Medium',
    },
    // Hard books
    {
      title: 'Alice in Wonderland',
      author: 'Lewis Carroll',
      coverImage: aliceWonderland, 
      difficulty: 'Hard',
    },
    {
      title: 'Peter Pan',
      author: 'J.M. Barrie',
      coverImage: peterPan, 
      difficulty: 'Hard',
    },
    {
      title: 'The Chronicles of Narnia',
      author: 'C.S. Lewis',
      coverImage: lionWatch, 
      difficulty: 'Hard',
    },
  ]);

  const [filteredBooks, setFilteredBooks] = useState(books);

  const handleFilterChange = (filter) => {
    if (filter === 'All') {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter((book) => book.difficulty === filter));
    }
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
          <BookCard key={index} {...book} />
        ))}
      </div>

    </div>
  );
};

export default Library;
