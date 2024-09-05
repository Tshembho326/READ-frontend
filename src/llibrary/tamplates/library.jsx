import React, { useState } from 'react';
import Header from './Header';
import FilterBar from './FilterBar';
import BookCard from './BookCard';
import '../static/css/library.css';

// Import the images (assuming your images folder is at the same level as the library folder)
import littlePigs from '../static/images/littlePigs.png'; 
import goldi from '../static/images/goldi.png';

const Library = () => {
  const [books] = useState([
    {
      title: 'The Three Little Pigs',
      author: 'Traditional',
      coverImage: littlePigs, // Use the imported image
      difficulty: 'Easy',
    },
    {
      title: 'Goldilocks and the Three Bears',
      author: 'Traditional',
      coverImage: goldi, // Use the imported image 
      difficulty: 'Easy',
    },
    {
      title: 'The Three Little Pigs',
      author: 'Traditional',
      coverImage: littlePigs, // Use the imported image
      difficulty: 'Easy',
    },
    {
      title: 'Goldilocks and the Three Bears',
      author: 'Traditional',
      coverImage: goldi, // Use the imported image 
      difficulty: 'Easy',
    },
    {
      title: 'The Three Little Pigs',
      author: 'Traditional',
      coverImage: littlePigs, // Use the imported image
      difficulty: 'Easy',
    },
    {
      title: 'Goldilocks and the Three Bears',
      author: 'Traditional',
      coverImage: goldi, // Use the imported image 
      difficulty: 'Easy',
    },
    {
      title: 'The Three Little Pigs',
      author: 'Traditional',
      coverImage: littlePigs, // Use the imported image
      difficulty: 'Easy',
    },
    {
      title: 'Goldilocks and the Three Bears',
      author: 'Traditional',
      coverImage: goldi, // Use the imported image 
      difficulty: 'Easy',
    },
    {
      title: 'The Three Little Pigs',
      author: 'Traditional',
      coverImage: littlePigs, // Use the imported image
      difficulty: 'Easy',
    },
    {
      title: 'Goldilocks and the Three Bears',
      author: 'Traditional',
      coverImage: goldi, // Use the imported image 
      difficulty: 'Easy',
    },
    {
      title: 'The Three Little Pigs',
      author: 'Traditional',
      coverImage: littlePigs, // Use the imported image
      difficulty: 'Easy',
    },
    {
      title: 'Goldilocks and the Three Bears',
      author: 'Traditional',
      coverImage: goldi, // Use the imported image 
      difficulty: 'Easy',
    },
    {
      title: 'The Three Little Pigs',
      author: 'Traditional',
      coverImage: littlePigs, // Use the imported image
      difficulty: 'Easy',
    },
    {
      title: 'Goldilocks and the Three Bears',
      author: 'Traditional',
      coverImage: goldi, // Use the imported image 
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
