import React from "react";
import BookCard from "./BookCard";

const BookCards = ({ bookData, calculatePageCount, selectedGenre }) => {
  console.log(selectedGenre);
  const filteredBooks = selectedGenre.length
    ? bookData.filter((book) => {
        return selectedGenre.includes(book.genre._id);
      })
    : bookData;
  console.log(filteredBooks);
  const dataToDisplay = calculatePageCount(filteredBooks);
  console.log("data", dataToDisplay);
  return (
    <div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 min-h-screen justify-center">
        {dataToDisplay.map((book) => (
          <BookCard
            key={book?.id}
            title={book?.title}
            author={book?.author}
            description={book?.description}
            genre={book?.genre?.name}
            imageUrl={book?.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default BookCards;
