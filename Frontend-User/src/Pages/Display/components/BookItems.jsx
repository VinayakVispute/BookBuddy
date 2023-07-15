import BookCard from "./BookCard";
import { useEffect, useState } from "react";

const BookItems = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch the books from the API
    fetch("http://localhost:3000/books")
      .then((response) => response.json())
      .then((data) => setBooks(data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = books.filter((book) => {
    const searchTermWithoutSpaces = searchTerm.replace(/\s+/g, "").toLowerCase();
    const bookTitleWithoutSpaces = book.title.replace(/\s+/g, "").toLowerCase();
    const bookCodeWithoutSpaces = book.code.replace(/\s+/g, "").toLowerCase();
    
    return (
      bookTitleWithoutSpaces.includes(searchTermWithoutSpaces) ||
      bookCodeWithoutSpaces.includes(searchTermWithoutSpaces)
    );
  });

  return (
    <div className="bg-gray-900 text-base-900 py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="form-control mx-auto">
          <input
            type="text"
            placeholder="🔎 Search for Book"
            className="input input-bordered md:w-96 bg-white placeholder:text-black"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="flex justify-around  items-stretch flex-wrap max-w-6xl mx-auto">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookItems;
