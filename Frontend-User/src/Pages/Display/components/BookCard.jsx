import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";

function BookCard({ book }) {
  const [showDescription, setShowDescription] = useState(false);

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div className="card w-72 bg-gray-800 hover:shadow-lg hover:shadow-black my-5 px-2 py-5 transition duration-250 hover:-translate-y-2 mx-2">
      <figure>
        <img
          className="border-0 rounded-lg h-[285px]"
          src={book.imageUrl}
          alt="Book"
        />
      </figure>
      <div className="card-body p-4 text-white">
        <div className="font-bold text-2xl mb-2 text-center ">{book.title}</div>
        <div className="flex justify-evenly">
          <p>ID: {book.code}</p>
          <p>Author: {book.author}</p>
        </div>
        {showDescription ? (
          <p className="mx-5 max-w-[200px] text-gray-200 text-gray-200">
            {book.description}
          </p>
        ) : (
          <p className="mx-5 max-w-[200px] text-slate-700 text-base">
            {book.description.split(" ").slice(0, 25).join(" ")}
            {book.description.split(" ").length > 25 && "..."}
          </p>
        )}
        {book.description && (
          <span className="cursor-pointer" onClick={toggleDescription}>
            {showDescription ? "Less" : "More"}
          </span>
        )}
      </div>
      <div className="flex justify-center items-center">
        <Link
          to={`/detailpage/${book._id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-32"
        >
          View More
        </Link>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  book: {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  },
};

export default BookCard;
