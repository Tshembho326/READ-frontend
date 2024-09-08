import React from 'react';
import BigCard from './BigCard'; // Adjust the import path as needed

import littlePigs from '../../llibrary/static/images/littlePigs.png';
import goldi from '../../llibrary/static/images/goldi.png';
import catHat from '../../llibrary/static/images/catHat.png';
import charlotteWeb from '../../llibrary/static/images/charlotteWeb.png';
import harryPotter from '../../llibrary/static/images/harryPotter.png';
import wizardOfOz from '../../llibrary/static/images/wizardOfOz.png';
import aliceWonderland from '../../llibrary/static/images/aliceWonderland.png';
import peterPan from '../../llibrary/static/images/peterPan.png';
import lionWatch from '../../llibrary/static/images/lionWatch.png';

// Importing book data from Books.json
import bookData from '../../Books.json'; 
import '../Static/css/previouslyReadStories.css';

const PreviouslyReadStories = () => {
  // Retrieve all previously read story titles from localStorage
  const titles = JSON.parse(localStorage.getItem('TitlesList')) || []; // Fallback to empty array if no titles found

  // Map of images associated with story titles
  const imageMap = {
    littlePigs,
    goldi,
    catHat,
    charlotteWeb,
    harryPotter,
    wizardOfOz,
    aliceWonderland,
    peterPan,
    lionWatch,
  };

  // Filter the book data based on the titles stored in localStorage
  const previouslyReadStories = titles.map(title => {
    // Find the matching book data (using title matching)
    const book = bookData.find(book => book.title === title);
    if (book) {
      return {
        ...book,
        coverImage: imageMap[book.coverImage] || '', // Map coverImage from book data to the correct image
        content: `This is the content for ${book.title}.`, // Placeholder for content
      };
    }
    return null;
  }).filter(Boolean); // Filter out any null values (i.e., stories without matching data)

  return (
    <div className="previously-read-stories">
      {previouslyReadStories.length > 0 ? (
        previouslyReadStories.map((story, index) => (
          <BigCard
            key={index}
            title={story.title}
            coverImage={story.coverImage}
            difficulty={story.difficulty}
            content={story.content} // You can replace this with actual content from the server if available
          />
        ))
      ) : (
        <p>No previously read stories found.</p>
      )}
    </div>
  );
};

export default PreviouslyReadStories;
