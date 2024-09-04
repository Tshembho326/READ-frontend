import React, { useState } from 'react';
import Header from './Header';
import FilterBar from './FilterBar';
import BookCard from './BookCard';
import NavigationBar from './NavigationBar';
import '../static/css/library.css';

const Library = () => {
  const [books] = useState([
    {
      title: 'The Three Little Pigs',
      author: 'Traditional',
      coverImage: '...', // Replace with actual image URL
      difficulty: 'Easy',
    },
    {
      title: 'Goldilocks and the Three Bears',
      author: 'Traditional',
      coverImage: '...', // Replace with actual image URL
      difficulty: 'Easy',
    },
    // ... more books
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
